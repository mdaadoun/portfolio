# The Era of Harness Engineering: Building the Agentic Software Factory

---

## Executive Summary: The Paradigm Shift

For decades, software development optimization focused on typing speed and point assistance for developers. The emergence of autonomous coding agents (like Claude Code, Codex, or Gemini) shifts the bottleneck from code writing to code review, verification, and architecture.

This transition from an interactive model (chat) to an asynchronous rule-governed model gives rise to the **Software Factory**. In this vision, the final product is no longer manually written by humans, but generated and maintained by an agentic system. AI Product Engineers evolve into system designers and internal tooling architects.

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │                         META LOOP                                      │
  │     (Continuous learning, pattern detection, system adjustments)       │
  │                                                                        │
  │     ┌────────────────────────────────────────────────────────────┐     │
  │     │                 OUTER LOOP                                 │     │
  │     │           (PR Review, CI/CD, Agent QA, Verifiers)          │     │
  │     │                                                            │     │
  │     │     ┌────────────────────────────────────────────────┐     │     │
  │     │     │             INNER LOOP                         │     │     │
  │     │     │      (Agent Execution & Code Generation)       │     │     │
  │     │     └────────────────────────────────────────────────┘     │     │
  │     └────────────────────────────────────────────────────────────┘     │
  └────────────────────────────────────────────────────────────────────────┘
```

---

## Part I. In-Depth Analysis: Components of a Software Factory

To orchestrate agents without falling into the trap of massive code degradation, practice relies on a new discipline: **Harness Engineering** (or *Loop Engineering*). It is divided into three strategic pillars and three iteration loops.

### 1. The Three Evaluation Pillars

* **Autonomy**: An agent's capability to execute a task over an extended duration (30 to 40 minutes) without human intervention or correction.
* **Automation**: The degree of independence granted to agents to modify the system without direct oversight. A team can possess highly autonomous agents yet apply low automation due to lack of trust in results.
* **Quality**: Measurement of robustness, accessibility, security, and maintainability of generated code. Contrary to popular belief, the goal of a mature Software Factory is not accepting quality drops for volume, but elevating overall quality through continuous inspection impossible for humans.

---

### 2. Iteration Loop Architecture

| Loop Level | Frequency & Speed | Cost | Primary Objective | Associated Mechanisms |
| --- | --- | --- | --- | --- |
| **Inner Loop** | Continuous, ultra-fast | Low | Immediate self-correction before PR. | Repo-level skills, plugins, fast linters, unit test suites. |
| **Outer Loop** | Executed at PR / CI boundaries | High (time & tokens) | Trust validation & eliminating exhaustive human review. | Change Review agents, targeted LLM verifiers, QA Agent. |
| **Meta Loop** | Background (asynchronous) | Variable | Continuous system learning. Codifying repeated errors. | Backlog/PR analysis, automatic rule & skill updates. |

---

### 3. Governance Tools: Change Review vs. Verifiers

A major challenge with agents is respecting enterprise architectural constraints. Two complementary approaches are used in the outer loop:

```
PR Diff ───► [ Change Review (LLM Multi-Lenses) ] ───► Contextual / Architecture Analysis
        ───► [ Verifiers (Targeted Micro-LLM) ]    ───► Invariant / Binary Validation (100% Deterministic)
```

* **Change Review (Agentic General Review)**: Analyzes all modifications through specific "lenses" (security, readability, internal module reuse). It catches global anti-patterns but can miss ultra-specific instructions.
* **Verifiers (Micro-LLM Verifiers)**: Replaces human review of repetitive details. Targeted light LLM checks enforcing strict rules (e.g., *"Does every JSX tag have an ARIA attribute?"* or *"Do all logs use the internal logger?"*). Their narrow scope guarantees ~100% reliability.

---

## Part II. Chronological Case Study: Tessl Implementation

Here is the analytical transcription of building a Software Factory as experienced and documented by Tessl's engineering team.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Cultural Shift & Environment Lock-Down                                       │
│ ├─ Ban hand-written code                                                               │
│ └─ Eliminate interactive chat sessions (Claude Code, Codex)                            │
└───────────────────────────────────────┬────────────────────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 2: Control Plane Construction                                                   │
│ ├─ Define flow: Linear (Issue) ──► Agent Sandbox ──► GitHub (PR)                       │
│ └─ Identity issue: Decouple GitHub/Linear accounts (Avoid "Maria" effect)              │
└───────────────────────────────────────┬────────────────────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 3: Asynchronous Execution Infrastructure                                         │
│ ├─ Finding: GitHub Actions lacks persistence for long tasks (>30 min)                 │
│ └─ Deploy Launch Skill (Isolated cloud containers with auth sidecars)                   │
└───────────────────────────────────────┬────────────────────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 4: Outer Loop Deployment                                                         │
│ ├─ Implement Change Review (Readability/Security lenses)                              │
│ └─ Deploy Verifiers to automate strict compliance                                      │
└───────────────────────────────────────┬────────────────────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 5: Closing the Meta Loop                                                         │
│ └─ Capture human PR review comments ──► Continuously update Skills                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Step 1: The Radical Choice (No-Interactive-Code)

The team enforces two simple yet disruptive rules: **ban hand-written code** and **forbid local interactive chat sessions**.

> **Rationale**: As long as a developer interacts locally with an agent via terminal, self-correction history, failure prompts, and tweaks stay confined on their local machine. The global system learns nothing.

---

### Step 2: Control Plane & The "Maria Problem"

Every task must originate from an issue (e.g., Linear) and end in a Pull Request.
Early on, an engineer named Maria configured the first agent orchestrator using her personal GitHub credentials. Within days, "Maria" became the top code contributor by volume, flooding her notification inbox and skewing team metrics.

* **Solution**: Create dedicated applications (Tessl Linear App & Tessl GitHub App) to ensure identity traceability between agents and humans.

---

### Step 3: Failure of Traditional CI/CD Infrastructure

The team initially tried running agents inside standard GitHub Actions workflows.

* **Identified Bottlenecks**:
  1. **Cost & Timeouts**: High-autonomy agents require 30–60 minutes of continuous compute, ill-suited and costly on classic CI runners.
  2. **Token Expiration**: Long-running workflows lost access permissions mid-iteration.
  3. **Cascading Permissions**: Security constraints prevented agents from triggering secondary test workflows.

* **Solution**: Deploy an isolated agent runtime running agents inside ephemeral cloud containers managing secret rotation.

---

### Step 4: Eliminating the Code Review Bottleneck

Once automated PR generation was active, the bottleneck shifted to human review. Developers initially rejected exhaustive automated reviews on human PRs as "pedantic." However, when applied directly to agent PRs, this rigor proved ideal: agents feel no cognitive fatigue and apply 100% of corrections instantly.

---

## Part III. Critical Analysis: Weaknesses & Risks

While the Software Factory concept provides a powerful theoretical model, practical implementation reveals structural weaknesses:

```
               ┌─────────────────────────────────────────┐
               │        KEY FACTORY CHALLENGES           │
               └────────────────────┬────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│  Unplanned   │             │ Vendor Lock- │             │ Agent Debt   │
│  Work Trap   │             │ in Risk      │             │ (Slop Code)  │
└──────────────┘             └──────────────┘             └──────────────┘
```

### 1. The Unplanned Work Trap

Harness engineering suffers from a psychological flaw: continuous loop improvement is unpredictable work.
When an agent fails on an issue, developers face a choice:

* **Manually fix the PR** (fast short-term, but traps team in local maxima).
* **Improve the Harness / Skill** (long, unplanned, delaying immediate delivery).

Under deadline pressure, harness engineering is often abandoned for quick manual fixes, breaking the meta loop.

### 2. High-Speed Technical Debt Amplification

Without strict deterministic rules (Verifiers) in the Inner and Outer Loops, the Software Factory turns into a "slop factory." As LLMs take path of least resistance, they risk injecting micro architectural debt at scale before classic metrics (test coverage) trigger alarms.

---

## Methodological Summary for AI Teams

To transition successfully to an agentic Software Factory without stalling production:

```
       [ Phase 1: Legibility ]
       - Centralize workflows on ticket trackers (Linear/Jira).
       - Run agents headless without local developer configs.
                               │
                               ▼
       [ Phase 2: Inner Loop Optimization ]
       - Ensure 100% of architectural standards live in repo (.prompt / skills).
       - Ban local developer-specific configurations.
                               │
                               ▼
       [ Phase 3: Outer Loop Automation ]
       - Deploy automated Change Review on CI.
       - Isolate critical deterministic checks as targeted micro LLM Verifiers.
                               │
                               ▼
       [ Phase 4: Meta Loop Ratcheting ]
       - Turn every human code review comment into a Verifier or Skill update.
```
