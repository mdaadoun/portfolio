# The New AI Agent Paradigm: Stop Building Ad-Hoc Agents, Build Skills Instead

## Executive Summary: The End of Custom Agent Loops

For a long time, the natural reaction when tackling a new agentic AI use case was to build a custom dedicated agent: writing a custom orchestration loop (*agent loop*), engineering ad-hoc tool wrappers, and tweaking prompt engineering.

The ecosystem is now converging on a fundamentally different paradigm:

1. **The underlying agent runtime is universal**: A code-based execution environment (e.g. a Bash shell and file system) forms the universal interface for interacting with the digital world.
2. **Value lies in domain expertise**: The core challenge is no longer raw model reasoning capacity, but the agent's ability to execute specific domain procedures deterministically, reliably, and context-efficiently.
3. **"Skills" represent the application layer**: Analogous to traditional computing (CPU / OS / Applications), the language model acts as the CPU, the agentic runtime as the OS, and **Skills** as domain application software.

---

## 1. Core Concept: Understanding "Skills"

### What Is a Skill?

Architecturally, a **Skill** is simply a structured directory of files:

* **A primary instruction file (`skill.md`)**: Contains expected behavior, domain rules, and table of contents.
* **Executable scripts (Tools)**: Python, Bash, or utility scripts saved to prevent the agent from reinventing the wheel on every run.
* **Assets & Binaries**: Templates, reference files, data, or compiled binaries.

```
┌────────────────────────────────────────────────────────┐
│                      SKILL FOLDER                      │
│                                                        │
│  ├── skill.md          (Instructions & Metadata)      │
│  ├── scripts/          (Executable Tools / Python)     │
│  └── assets/           (Templates, Binaries, Data)     │
└────────────────────────────────────────────────────────┘
```

### The Problem Solved: The "Genius vs. Expert" Dilemma

A frontier LLM resembles a math genius with zero field experience: it can derive complex physics laws from first principles, but lacks domain procedural context.

When filing taxes or generating compliant corporate financial reports, you don't hire a genius who re-derives the tax code every morning; you hire a domain expert who strictly follows standard operating procedures. Skills provide this composable, reusable procedural knowledge.

---

## 2. Detailed Presentation Trajectory

```
[Phase 1] Emergence of Universal Runtime (Code = Interface)
   │
[Phase 2] Identifying Limits: The Lack of Procedural Expertise
   │
[Phase 3] Introducing "Skills" & Progressive Disclosure
   │
[Phase 4] Usage Typology & Convergence (MCP + Skills)
   │
[Phase 5] Engineering Roadmap & Continuous Learning Vision
```

### Phase 1: Convergence Toward "Code as the Universal Interface"

* **Ecosystem Evolution**: Generalization of MCP (*Model Context Protocol*) for connectivity and maturity of agentic runtimes (*Claude Code SDK*).
* **Key Finding**: It is no longer necessary to build custom agents per domain. Code execution (Bash + file system + Python) suffices to query info, manipulate files, and call APIs.

### Phase 2: Limits of Traditional Tools and Context

* **Mindset Shift**: Agents possess raw cognitive power but lack procedural context.
* **Critique of Standard Tools**:
  * Classic tools suffer from ambiguous, static instructions.
  * If a tool fails, the agent cannot rewrite its underlying source code.
  * Tools constantly consume memory by staying permanently in the context window.

### Phase 3: Technical Architecture of Skills

* **Minimalist Format**: Deliberate choice of directories and text files to guarantee universal compatibility (Git, ZIP, Cloud Drives).
* **Progressive Disclosure Paradigm**:
  1. At rest, only lightweight **metadata** of installed Skills are loaded into the prompt context window.
  2. When a task requires it, the agent reads `skill.md`.
  3. It then loads only the necessary scripts and assets required for the specific task.

### Phase 4: Ecosystem & MCP Complementarity

* **Skill Categories**:
  * **Foundational**: Advanced document parsing (PDF/Office) or biomedical data analysis.
  * **Software Vendors**: Web navigation (*Stagehand/Browserbase*) or workspace search (*Notion*).
  * **Enterprise / Domain**: Internal SOPs, software engineering standards, or banking compliance rules.

* **Separation of Concerns (MCP vs Skills)**:
  * **MCP** = Data connectivity and external API access (the plumbing).
  * **Skills** = Business expertise and procedural workflow orchestration (the know-how).

### Phase 5: Toward Full Software Lifecycle Integration

* **Product Roadmap**:
  * Treat Skills like code: unit testing, performance evals, versioning, and inter-skill dependency management.
  * Automated Creation: Agents generate their own Skills (*Skill Creator*) based on user interactions and execution logs.

---

## 3. Critical Analysis & Impact for AI Product Engineers

### Major Benefits

| Classic Agentic Issue | Solution Brought by Skills | Product Impact |
| --- | --- | --- |
| **Context Window Saturation** | Progressive Disclosure (*Metadata-first*) | Massive cost reduction per query and scaling to thousands of skills. |
| **Tool Hallucination / Instability** | Saved Python scripts modifiable by LLM | Deterministic code execution and self-correction. |
| **Software Engineer Lock-in** | Markdown / Directory format | Direct ingestion of domain expertise formulated by business teams (HR, Legal, Finance). |

### Unresolved Technical Challenges

1. **Security & Arbitrary Code Execution**: Allowing non-technical users to inject Skills containing executable scripts into the agent runtime exposes systems to prompt injection and malicious code execution inside containers.
2. **Orchestration Conflicts & Metadata Overlap**: With hundreds of installed Skills having similar metadata, initial routing (deciding which Skill to load) becomes a bottleneck.
3. **Versioning & Evals Complexity (CI/CD)**: Isolating regressions when updating natural language instructions in a `skill.md` requires automated evaluation frameworks (*Evals*) to prevent behavioral drift.

---

## Conclusion & Implementation Checklist

For AI product teams, Anthropic's message marks a strategic pivot: **Stop modifying custom agent loops, stabilize the OS runtime, and focus efforts on codifying procedural domain knowledge into Skills**.

### Implementation Checklist:

* [ ] **Standardize Runtime**: Adopt a code-execution and file-manipulation runtime environment.
* [ ] **Implement MCP**: Decouple data integration (MCP) from business logic (Skills).
* [ ] **Adopt Progressive Disclosure**: Load metadata at start, fetch full instructions on demand.
* [ ] **Empower Domain Experts**: Provide tools for non-dev business experts to author and version Markdown Skills.

---

## Sources & References

* **Presentation Title**: *Don't Build Agents, Build Skills Instead*.
* **Speakers**: Barry Zhang & Mahesh Murag (Anthropic).
* **Key Tech & Concepts**: *Model Context Protocol (MCP)*, *Claude Code SDK*, *Progressive Disclosure*, *Skill Creator*.
