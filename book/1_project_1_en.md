Project 0: The Perfect Kit

⚡ Impact Statement & Scope Note
This document formalizes the absolute functional and technical specifications for creating the standardized software factory that will serve as the foundation for all engineering projects in this manual. In accordance with Part 0 requirements, this deliverable defines what to build and why, excluding any immediate implementation. The goal is to structure the environment of the AI Product Engineer: a hybrid profile born from the convergence of web development, data engineering, and product vision.

-----
1. Context & Strategic Objectives
1.1 The Problem

80% of AI projects fail or remain at the demonstration stage due to a poorly configured environment. Dependency conflicts ("*it works on my machine*"), the lack of strict typing on unstructured data, and the absence of environment isolation destroy team velocity and make industrialization impossible.

1.2 The Solution: "The Perfect Kit"

This project consists of designing a highly professional, modular, and 100% reproducible code template (*boilerplate*). It must allow any developer (from junior to senior engineer) to clone the repository and obtain a local infrastructure ready for production in under 5 minutes.

1.3 Alignment with the Manifesto Pillars

Velocity: Reduce the time between idea and prototype. The environment must automate all redundant tasks (*boilerplate code*) to free up design time.
User-in-the-Loop: Prepare the groundwork for capturing user feedback and tracing probabilistic flows.
Ethics & Security by Default: Natively prohibit secret leakage (API keys) and isolate execution environments.

-----

2. Functional Scope (The "What")

The kit must cover five fundamental needs:

1.  Total environment isolation: Guarantee identical execution regardless of the host operating system (macOS, Linux, Windows).
2.  Deterministic dependency management: Declare, resolve, and lock library versions strictly, separating the production environment from the development environment (tests, linters).
3.  **AI-First code assistance and editing:** Integrate shared configuration files to align the editor with team standards (completion and engineering rules).
4.  **Automated quality control (Gatekeeping):** Block the introduction of poorly formatted, untyped, or insecure code at the source before each Git commit.
5.  **Minimum proof of concept:** A bootstrap script (`main.py` or a `/health` endpoint) capable of validating network connectivity and the import structure without loading business logic.

-----

3. Required Folder Architecture (Modular Structure)

The repository must strictly conform to the following structure to guarantee separation of privileges and prevent experimental code leaks into production:

``` bash
ai-product-engineer-kit/
├── .github/                  # Continuous Integration/Deployment workflows (CI/CD)
│   └── workflows/
│       └── ci.yml
├── .vscode/                  # Shared IDE configuration (Cursor / VS Code)
│   ├── extensions.json       # Recommended team extensions
│   └── settings.json         # Formatting rules and Python paths
├── src/                      # Single application source code for deployment
│   ├── __init__.py
│   ├── api/                  # Endpoints and routers (e.g., FastAPI)
│   ├── core/                 # Core logic, configuration, and security
│   │   ├── llm/              # Model client abstraction
│   │   └── prompts/          # System prompt managers
│   ├── models/               # Data schemas and interface contracts (Pydantic)
│   └── main.py               # Application entry point
├── tests/                    # Automated tests (Unit, Integration, LLM-as-a-Judge)
│   ├── __init__.py
│   ├── conftest.py           # Test fixtures and configurations
│   └── test_main.py          # Environment validation
├── notebooks/                # Free exploration, prompt prototyping (Excluded from prod)
├── scripts/                  # Utility tools (ingestion, hooks, maintenance)
├── docs/                     # Technical documentation and architecture diagrams
├── .dockerignore             # Exclusion of large or sensitive local files
├── .gitignore                # Strict exclusion of runtimes and secret files
├── .pre-commit-config.yaml   # Automated hook execution chain
├── Makefile                  # Unified command interface for the project lifecycle
├── pyproject.toml            # Central configuration and dependency manifest
└── Dockerfile                # Multi-stage containerization recipe

```

-----

4. Technical Specifications & Tool Selection

| Component             | Chosen Solution       | Version Constraint | Technical Justification                                                                                                                             |
| :-------------------- | :--------------------- | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Language**          | Python                 | `3.11+`            | Native support for advanced typing features (`typing.Self`), asynchronous optimization, and extensive compatibility with the AI ecosystem.          |
| **Package Manager**   | Poetry                 | `1.7+`             | Strict isolation via a lock file (`poetry.lock`) eliminating non-determinism of third-party packages in production.                                 |
| **Containerization**  | Docker & Docker Compose | `24+`              | Execution environment isolation from the host OS. Multi-stage builds required for lightweight images.                                                |
| **Quality & Linting** | Ruff                   | `0.3+`             | Advantageously replaces Flake8 and Black with ultra-fast C++ execution, preserving velocity during commits.                                          |
| **Static Typing**     | Mypy                   | `1.8+`             | Rigorous static analysis without exception. Essential for validating the structure of highly variable JSON payloads returned by LLMs.              |
| **Formatting**        | Black                  | `24+`              | Absolute code style standardization to avoid review noise on Git.                                                                                   |
| **Test Framework**    | Pytest                 | `8+`               | Proven flexibility and native management of async tests via `pytest-asyncio`.                                                                        |
| **Security**          | Detect-Secrets         | N/A                | Mandatory pre-commit hook blocking the commit process if a string resembling a private key or API key is detected.                                   |

-----

5. Success Criteria & Project Limits

5.1 Definition of Done (DoD) — Acceptance Criteria

For Project 0 to be validated, it must meet the following measurable criteria:

- [ ] **Zero Complex Manual Configuration:** The complete installation runs via a single command (`make install` or `poetry install`).
- [ ] **Hermetic Quality Control:** A `make lint` command or a `git commit` attempt with a poorly formatted file or one containing a type error must raise an explicit error and interrupt the workflow.
- [ ] **Git Sanitization:** The `.env` file containing access tokens must never be indexable. Only an anonymized `.env.example` file is accepted on the remote repository.
- [ ] **Validated Isolation:** The Docker container must compile and run via `docker-compose up --build` on a clean third-party machine in under 5 minutes.

5.2 Out of Scope

To preserve the purity of the initial software infrastructure, the following are explicitly excluded:

  * Any network calls or direct integration of language model (LLM) features.
  * Business data persistence or complex agent configuration.
  * Deployment to cloud providers in production.