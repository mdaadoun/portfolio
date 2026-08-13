# MCP Apps: The Dawn of the Agentic Web and the End of Tab-Based Browsing

For years, interacting with Large Language Models (LLMs) was confined to a text box. For an AI product engineer, this format represents a glass ceiling: **text is the most inefficient interface for conveying complex data structures**. Reducing a service to a plain block of text strips companies of their brand identity, destroys their carefully designed UX/UI, and degrades the overall user experience.

**MCP Apps** (extensions of the *Model Context Protocol*) solve this problem. Rather than returning raw text, MCP servers can now send **interactive, custom graphical interface components (Micro-UIs / UI Chunks)** directly inside chat clients (Claude, ChatGPT, VS Code, Cursor).

---

## 1. High-Level Summary: From the Chat Window to the Agentic OS

### The "Wall of Text" Problem

When an agent queries a third-party tool (e.g., PostHog, Spotify, Google Calendar), the raw payload returned to the LLM and subsequently rendered in Markdown is often unreadable or difficult to analyze at a glance.

### The MCP Apps Solution

Through the standardization of **MCP UI** (developed in partnership with Anthropic and OpenAI), the server returns a sandboxed UI fragment (e.g., HTML/React).

* **Preserved Visual Identity:** A Shopify or PostHog block looks like actual Shopify or PostHog within the chat interface.
* **Bidirectional Interactivity:** The user can click a visual element (e.g., a "Favorite" button or a conversion funnel step), triggering an event that is dispatched back to the host to continue the agentic loop.

---

## 2. Chronological Timeline & Protocol Evolution

```
     May 2024                Late 2024 / Early 2025             2026
--------|------------------------------|-------------------------|-------->
   Creation of                Creation of MCP Apps         Global Standard
  MCPUI (Ido Salomon)         (Anthropic / OpenAI)         "Agentic Web"

```

1. **May 2024 — Birth of MCPUI:** Ido Salomon creates MCPUI, an open-source protocol enabling interactive UI transmission over MCP. Tools like Block's *Goose* and *Postman* are among its earliest adopters.
2. **Major Partnership (Anthropic & OpenAI):** Standardization of the official extension under the name **MCP Apps** (built on top of the MCP UI SDK). Rapid integration followed across Claude, ChatGPT, VS Code, and Cursor.
3. **2026 — The Era of the Agentic Web:** MCP Apps matures into the global distribution standard for agent interfaces.

---

## 3. Technical Analysis: Architecture Under the Hood

The interaction flow relies on a strict event-driven architecture that preserves full control for the host environment:

```
[User] ---> (Prompt) ---> [Host / Chat (e.g., Claude)]
                                    |
                               (Tool Call)
                                    v
                           [MCP Server (e.g., PostHog)]
                                    |
                         (Return HTML Resource)
                                    v
[Sandboxed UI Component] <--- (UI Render) <--- [Host]
       |
 (Click / Event)
       +-------------------> (Callback Event) ---> [Host] ---> (Action/Tool)

```

1. **Resource & Tool Invocations:** The LLM triggers a tool call. The MCP Server returns an HTML/JS resource encapsulated under a dedicated URI.
2. **Sandboxed Rendering:** The client (e.g., Claude) consumes the resource and renders it inside an isolated environment (a sandboxed iframe or React component).
3. **Events & Callbacks:** When the user clicks an element in the UI, the application does not communicate directly with its own backend. Instead, it emits a callback event to the host.
4. **Agentic Loop:** The host orchestrates the event: it can interpret the click as intent, generate a new prompt, or execute a follow-up tool call.

---

## 4. Nuances, Trade-offs, and Challenges for AI Product Engineers

While revolutionary, adopting MCP Apps forces AI product teams to navigate several technical and strategic design trade-offs:

### 1. Loss of Control Over the User Journey

* **Analysis:** On the traditional web, a company (e.g., Amazon or Shopify) controls 100% of the conversion funnel. With MCP Apps, the interface is atomized into "UI atoms" composed on the fly by the user's AI assistant.
* **Critique:** Brands risk becoming mere component suppliers. The AI assistant becomes the primary conductor of the user experience, fundamentally altering engagement and conversion metrics.

### 2. The Spectrum of Generative vs. Declarative UI

The protocol currently operates across a three-tier spectrum:

* **Predefined UI (Classic MCP Apps):** Scoped rendering (e.g., fixed iframe/HTML). Highly robust, secure, and brand-faithful, but less flexible.
* **Declarative UI (e.g., A2UI, JSON Render):** The server returns a structural schema (JSON), and the host renders the UI. Ideal for maintaining chat-wide visual consistency, but trades off granular design control.
* **Generative UI:** The host generates the visual component entirely from scratch via streaming.

### 3. Performance & State Management (Reusable Views & View Tools)

* **Costly Re-rendering:** Loading heavy interfaces (e.g., an Autodesk 3D view engine) on every prompt is inefficient. The MCP working group is developing *Reusable Views* to update an existing component in-place without re-instantiating it.
* **View Tools / App Tools (Bidirectionality):** Enabling the agent itself to manipulate the interface (e.g., *"fill out this form for me"*) using the emerging *WebMC* standard.

---

## 5. Comparative Summary of AI UI Approaches

| Criterion | Plain Text / Markdown | MCP Apps (Predefined UI) | Declarative UI (A2UI / JSON) |
| --- | --- | --- | --- |
| **Brand Identity** | None (reduced to raw data) | **Excellent** (Dedicated UI) | Moderate (depends on host theme) |
| **Interactivity** | Low (links only) | **High** (callbacks, stateful events) | High (standardized forms) |
| **Host Control** | Total | **Total** (Host orchestrates the flow) | Total |
| **Client Portability** | Universal | **High** (Write once, run in ChatGPT/Claude) | Medium (depends on host implementation) |

---

> **Key Takeaway for AI Product Teams:**
> The web will no longer be consumed by toggling across 20 browser tabs. Future product value will be built on creating **UI Atoms and MCP Tools** that seamlessly integrate into the user's personal AI assistant.

---

## Sources & References

* **Presentation Title:** *MCP Apps: Extending the Frontier*
* **Speakers:** Ido Salomon (Creator of MCPUI, co-creator of MCP Apps) & Liad Yosef (Co-founder of Aura, co-creator of MCP Apps)
* **Official SDK & Spec Repository:** `modelcontextprotocol/xapps` (`XTA app`)
* **Referenced Initiatives & Protocols:** Model Context Protocol (MCP), MCPUI, A2UI, WebMC, Open Agentic Web