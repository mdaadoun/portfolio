# Why Are AI Agents (Still) Ignoring Async MCP Tasks? Analysis & Protocol Reverse-Engineering

Architectures based on the **Model Context Protocol (MCP)** are evolving rapidly. However, a gap persists between the need to execute long-running operations and the actual ability of AI agents to manage them in production.

Although the **MCP Tasks** specification promises to move beyond the simple "Request-Response" model (traditional HTTP) to introduce asynchronous processes (e.g., ERP validation, Human-in-the-Loop workflows), client-side adoption remains stalled.

Here is a full analysis of the technical challenges, the protocol evolution from V1 to V2, and practical architectural patterns to integrate these mechanisms into your product pipeline.

---

## Part 1. High-Level Summary: The Challenge of Long-Running Tasks in MCP

For a product engineer, a standard MCP tool functions synchronously: the agent sends a request via `tools/call`, blocks its execution loop for a few milliseconds (or seconds), and receives a direct result.

```
[AI Agent] ----(tools/call)----> [MCP Server] ---> [Execution] ---> [Direct Result]

```

However, real-world enterprise use cases (such as processing a purchase order requiring inventory checks, payment processing, and human approval) take minutes, hours, or even days. Maintaining an open TCP/HTTP connection over these durations is unviable due to:

* **Network interruptions** and unexpected socket drops.
* **Component crashes** (failures on either the MCP server or the AI client/workflow runner).
* **Unrealistic human delays** (*Human-in-the-Loop*) for synchronous sessions.

The **MCP Tasks** specification was introduced to convert a synchronous tool invocation into a **task-handle** model:

1. The agent initiates a task.
2. It immediately receives a token/handle (*Task Handle*).
3. It interacts with this task over time until resolution.

The primary bottleneck lies in the **durability requirement** set by the specification: a created task must not disappear simply because a server restarts or a network flickers.

---

## Part 2. Timeline & Comparative Analysis: MCP Tasks V1 vs. V2

To understand why client and agent developers have hesitated to adopt this pattern, it is necessary to examine the technical trajectory of the protocol since late 2024.

### Protocol Evolution Timeline

```
 [November 2024] -------------> [May 2025] -------------------> [July 2025+]
  MCP Tasks V1 (Experimental)    V2 Redesign Announcement        V2 Release
  Stateful Protocol / Complex    Stateless Core + Extensions     Adoption & Standardization

```

* **November 2024**: Release of the MCP Tasks V1 specification (flagged as experimental).
* **March–May 2025**: Community feedback (notably via the *Agentic AI Foundation*) highlighting extreme client-side complexity and scalability bottlenecks.
* **May 2025**: Official announcement shifting the specification toward a *stateless* architecture (V2).
* **Subscriptions/Notifications**: Transition toward event-driven architectures to eliminate passive polling at scale.

---

### Detailed Comparison: Tasks V1 vs. Tasks V2

The table below outlines the core differences between the initial iteration and the V2 revision:

| Feature / Metric | MCP Tasks V1 (November 2024) | MCP Tasks V2 (July 2025+) |
| --- | --- | --- |
| **Protocol Architecture** | Stateful | Stateless Core |
| **Extension Management** | Monolithic Protocol | Decoupled Core / Extension Model |
| **Discovery (`task/list`)** | Global endpoint returning all tasks | Removed (Client must persist task IDs) |
| **Interaction / Human-in-the-Loop** | Complex state tunneling via open sessions (`task/result`) | Direct async signalling (`task/update`) |
| **Client Implementation Complexity** | Very High (FIFO queues, connection tunnels) | Moderate to Low (REST-style / Explicit Signals) |

---

### Deep Technical Critique of Both Versions

#### 1. The V1 `task/list` Trap (Scalability Bottleneck)

In V1, the specification placed state tracking responsibilities on the server via a global `task/list` endpoint.

* **Critique**: This endpoint lacked server-side filtering capabilities. In a production system executing millions of background jobs, the client had to fetch the full task list to identify its own tasks—creating a major performance bottleneck for high-volume distributed systems.

#### 2. Subscriptions and `task/result` Tunneling in V1

Collecting user input (*input required*) in V1 required establishing long-running sessions where the server solicited feedback from the client through the result channel.

* **Critique**: If the connection dropped while waiting for input, the re-handshake logic required complex client-side code. Furthermore, reference implementations processed requests sequentially (strict FIFO), blocking parallel execution of other pending tasks.

#### 3. The V2 Fix: Stateless Core & Signal Pattern

V2 removed `task/list` and replaced the result tunnel with a explicit `task/update` endpoint.

* **Critique**:
* **Advantage**: The client dispatches signals directly to the underlying workflow engine (similar to *Signals* in distributed orchestration engines like Temporal), making the transport layer predictable and stateless.
* **Hidden Constraint**: Removing `task/list` forces the client to **persist task IDs locally**. If a client crashes before persisting a `task_id`, the task becomes orphaned and unrecoverable from the client's perspective.



#### 4. The Passive Polling Bottleneck (Even in V2)

Even with V2's simplified primitives, issuing repeated `task/get` calls across thousands of active jobs does not scale efficiently.

* **Critique**: V2 depends heavily on the **Notifications Protocol**. Instead of polling individual task handles, clients subscribe to an event stream to receive asynchronous state updates.

---

## Part 3. Recommendations & Architecture for AI Product Engineers

For architectures requiring long-running AI agent tasks, the following implementation pattern is recommended:

```
                               ┌──────────────────────────────────────────────┐
                               │               WORKFLOW ENGINE                │
                               │  (e.g., Temporal / State Orchestrator)      │
                               └──────┬───────────────────────────────▲───────┘
                                      │                               │
                               1. Invoke Task                   3. Signal Update
                                      │                               │
┌──────────────┐   tools/call         ▼                               │
│   AI AGENT   ├───────────────►┌─────────────┐                       │
│   (Client)   │                │ MCP SERVER  │                       │
│              │◄───────────────┤             │                       │
└──────┬───────┘  Task Handle   └─────────────┘                       │
       │                                                              │
       │ 2. Persist Task ID                                           │
       ▼                                                              │
┌──────────────┐                                                      │
│ PERSISTENCE  │──────────────────────────────────────────────────────┘
│  (Client DB) │                   4. Input Required/Approve
└──────────────┘

```

1. **Pair MCP with a Declarative Workflow Engine**:
Avoid implementing state durability directly inside the agent layer. The MCP server should act as an interface layer (using tools like *FastMCP*) that delegates state execution to a dedicated orchestration engine.
2. **Do Not Rely on the Server for Task History**:
Implement client-side persistence for task metadata (`task_id`, execution state, domain identifiers) before processing tool responses.
3. **Map Task States Directly to Business Logic**:
Align the MCP protocol state machine (`working` -> `input_required` -> `completed`/`failed`) directly with application-level domain states (e.g., *ERP Validation* -> *Approval Required* -> *Payment Executed*).

---

## Part 4. Sources & References

This analysis is based on technical case studies and architectural discussions within the MCP ecosystem:

* **Cornelia Davis (Temporal)** – *MCP Tasks (async): Why Aren't Any Agents Supporting Them?* (Technical presentation covering async task architectures, durability models, and the V1/V2 migration).
* **Cornelia Davis** – *Server-side MCP Tasks Durability* (Keynote at the MCP DevSummit).
* **Angie Jones (Agentic AI Foundation)** – *Announcing the Stateless Core Architecture for MCP V2* (Official publication on the protocol shift to a stateless, modular core).
* **FastMCP Framework** – Official documentation and reference implementations for client/server MCP protocol handlers.