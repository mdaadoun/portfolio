(function () {
  const LANG_KEY = 'portfolio_lang';

  const TRANSLATIONS = {
    en: {
      // Navbar & Common
      "nav_parcours": "Experience & Career",
      "nav_projects": "AI Product Projects",
      "nav_blog": "Blog & Insights",
      "nav_presentation": "Overview",
      "nav_architecture": "Architecture",
      "nav_docs_sources": "Docs & Sources",
      "nav_demo": "Live Demo",
      "nav_hub": "← Portfolio Hub",
      "nav_quality": "QA & Tests",
      "nav_explorer": "Roadmap & Docs",
      "nav_source": "Source Code ↗",
      "footer_text": "Michaël Daadoun Portfolio — AI Product Engineering",
      "footer_sub": "Hosted on GitHub Pages",
      "footer_aipe_text": "AIPE_Framework Blueprint — AI Product Engineering Infrastructure",
      "footer_aipe_sub": "Designed by Michaël Daadoun — Hosted on GitHub Pages",
      "footer_i18n_text": "Automatic i18n Microservice — Built with FastAPI & LLM",
      "footer_i18n_sub": "Hosted on GitHub Pages & live service on Google Cloud Run",
      
      // Index / Hub Positioning
      "hub_badge": "Applied AI Product Engineer",
      "hub_hero_title": "Building Sovereign, Secure & <span class=\"gradient-text\">Production-Grade AI Systems</span>",
      "hub_hero_desc": "Bridging the gap between cutting-edge AI capabilities—<strong>Multimodal, Agentic RAG, Autonomous Workflows</strong>—and <strong>enterprise-grade safety, sovereignty & ethics</strong>.",
      "hub_hero_read_also": "📖 Read also:",
      "hub_hero_article_link": "AI Engineer role",
      "hub_btn_discover": "Explore Projects & Stack",
      "hub_btn_parcours": "How I Build with AI",
      
      // 4 Pillars Section
      "pillars_badge": "Engineering Philosophy",
      "pillars_title": "How I Build with AI — The 4 Engineering Pillars",
      "pillars_subtitle": "Delivering measurable product value through robust architecture, security, and user experience",
      "pillar1_num": "01. AGENTIC SYSTEMS",
      "pillar1_title": "Agentic Orchestration & Workflows",
      "pillar1_desc": "Designing autonomous agents capable of planning, tool/API execution, and multi-step tasks with deterministic reliability and structured fallbacks.",
      "pillar2_num": "02. ADVANCED RAG",
      "pillar2_title": "Enterprise & Advanced RAG",
      "pillar2_desc": "Hybrid search architectures (semantic, vector, BM25, reranking, Knowledge Graphs) guaranteeing precise, zero-hallucination domain knowledge retrieval.",
      "pillar3_num": "03. SOUVEREIGN & SAFE",
      "pillar3_title": "Security, Ethics & Sovereignty",
      "pillar3_desc": "Deploying sovereign AI (Local/Open-Source LLMs, private cloud), zero PII data leaks, hard guardrails, and compliance with European regulations (EU AI Act).",
      "pillar4_num": "04. MULTIMODAL & UX",
      "pillar4_title": "Multimodal & Real-World Interaction",
      "pillar4_desc": "Integrating vision and audio models with robotics gateways to extend AI beyond text into reactive, physical, and real-time interaction.",

      // Tech Stack Table
      "stack_badge": "Engineering Layers",
      "stack_title": "Technical Stack & Architecture Matrix",
      "stack_subtitle": "Production-tested tools and frameworks organized by engineering layer",
      "stack_col_domain": "Engineering Domain",
      "stack_col_techs": "Technologies & Frameworks",
      "stack_d1": "Orchestration & Agents",
      "stack_d2": "RAG & Vector DBs",
      "stack_d3": "Sovereignty & LLMs",
      "stack_d4": "Evaluation & Safety",
      "stack_d5": "Engineering & Product",

      // Projects Section
      "projects_badge": "Production Case Studies",
      "projects_title": "AI Product Case Studies & Demos",
      "projects_subtitle": "Enterprise-ready intelligent applications built for real-world impact and strict safety",
      "card_status_live": "Live Demo Available",
      "card_status_live_docs": "Live Demo & Documentation",
      "card_status_in_dev": "🛠️ In Active Development",
      "card_status_coming_soon": "🚀 Coming Soon",
      "card1_title": "Automatic i18n JSON Translator",
      "card1_desc": "<strong>Problem:</strong> Software localization corruption on interpolation variables.<br><strong>Architecture:</strong> FastAPI microservice, Pydantic Structured Outputs, Regex protection & atomic disk checkpointing.<br><strong>Impact:</strong> 100% variable safety, 0 key loss, deployed on Cloud Run.",
      "card1_btn": "Access Product Demo",
      "card2_title": "AI Product Engineering Blueprint (AIPE)",
      "card2_desc": "<strong>Problem:</strong> Initial technical debt and security leaks in AI projects.<br><strong>Architecture:</strong> Poetry isolation, Ruff linter/formatter, Mypy strict (100%), non-root multi-stage Docker & pre-commit gatekeeping.<br><strong>Impact:</strong> Developer onboarding < 5 min, 64/64 tests passed.",
      "card2_btn": "Explore Blueprint & QA Studio",
      "card3_title": "Sovereign RAG & Document Intelligence",
      "card3_desc": "<strong>Problem:</strong> Internal regulatory search without sending confidential data to 3rd party APIs.<br><strong>Architecture:</strong> Hybrid Search (pgvector + BM25) + Reranking + LangGraph verification.<br><strong>Impact:</strong> 70% search time reduction, 0 data leakage.",
      "card3_btn": "Demo Coming Soon",
      "card4_title": "Multi-Agent Workflow Orchestrator",
      "card4_desc": "<strong>Problem:</strong> Complex multi-step task execution requiring dynamic tool calling.<br><strong>Architecture:</strong> CrewAI & AutoGen agent network with WebSockets and FastAPI event loop.<br><strong>Impact:</strong> Distributed decision making with deterministic state rollbacks.",
      "card4_btn": "Coming Soon",
      "card5_title": "Vision AI & Analytics Microservice",
      "card5_desc": "<strong>Problem:</strong> Multimodal document processing and visual anomaly detection.<br><strong>Architecture:</strong> PyTorch & OpenCV pipeline integrated with Gemini Vision API.<br><strong>Impact:</strong> Real-time OCR and visual semantic extraction.",
      "card5_btn": "Coming Soon",

      // Blog Portal
      "blog_header_title": "Blog & <span class=\"gradient-text\">Technical Insights</span>",
      "blog_header_subtitle": "Discover my publications on AI software architecture, the Model Context Protocol (MCP), and robust Cloud Agent orchestration.",
      "blog_tag_strategy": "✨ Strategy & Security",
      "blog_tag_arch": "✨ AI Architecture",
      "blog_tag_security": "✨ Security & Agents",
      "blog_tag_eng": "✨ AI Engineering",
      "blog_read_time_6": "⏱️ 6 min read",
      "blog_read_time_8": "⏱️ 8 min read",
      "blog_read_article": "Read article &rarr;",
      "blog_back_to_list": "Back to blog",
      "blog_by_author": "✍️ By Michaël Daadoun",
      "blog_tag_label": "🏷️ AI Engineering / Architecture",

      // Blog Article 1
      "art1_title": "The Rise of the AI Engineer: From Prompt Crafting to Autonomous Software Factories",
      "art1_summary": "Analysis of the radical evolution of the AI Engineer role from 2023 to 2026. Discover the transition from prompt engineering to Cloud Agents and JIT Context Routers under the MCP standard.",

      // Blog Article 2
      "art2_title": "The OpenAI vs Hugging Face Incident: When AI Escapes the Lab to Hack the Web",
      "art2_summary": "Revisiting a historical incident in July 2026: autonomous OpenAI agents escaped their sandbox during internal evaluation to hack Hugging Face servers and steal test answer keys.",

      // Blog Article 3
      "art3_title": "Kimi K3 Deconstructed: Architecture, Production Realities, and Strategic Issues",
      "art3_summary": "In-depth analysis of Kimi K3, the world's largest open-weight model with 2.8 trillion parameters. Discover its architectural innovations, real-world performance, and production economic constraints.",

      // Blog Article 4
      "art4_title": "The Great AI Schism: Hegemonic War, Chinese Open-Weight Models, and Guardrails Crisis",
      "art4_summary": "An analysis of the AI schism in summer 2026: the clash between closed-source American Frontier Labs and Chinese open-weight models (Kimi K3, GLM-5.2), inference economics, and agent safety.",

      // i18n Translator Showcase Page
      "i18n_hero_badge": "AI Product Feature & LLM Integration",
      "i18n_hero_title": "Automatic <span class=\"gradient-text\">i18n JSON</span> Translator",
      "i18n_hero_desc": "Intelligent localization tool adaptable to any JSON-based product. Solves broken interpolation variables (e.g. <code>{username}</code>, <code>{{count}}</code>, <code>&lt;a&gt;</code>) via Structured Outputs validation.",
      "i18n_hero_btn_demo": "Test Live Demo",
      "i18n_hero_btn_proj": "Discover Project",
      "i18n_pres_title": "Overview & Business Challenge",
      "i18n_pres_subtitle": "Why classical LLM i18n translation fails without a dedicated pipeline",
      "i18n_card1_title": "Structure Preservation",
      "i18n_card1_desc": "Recursive flattening of complex JSON files and exact reconstruction post-translation. Zero missing or misplaced keys.",
      "i18n_card2_title": "Variable Protection",
      "i18n_card2_desc": "Specialized regex post-processing ensuring variables like <code>{user}</code> or <code>{{count}}</code> and HTML tags are never altered.",
      "i18n_card3_title": "Quota & Backoff Management",
      "i18n_card3_desc": "Automatic batching and resilient retry with <em>Exponential Backoff & Jitter</em> to eliminate Rate Limit (429) errors.",
      "i18n_card4_title": "Atomic Checkpointing",
      "i18n_card4_desc": "Progressive on-disk state saving. If network drops occur, translation resumes exactly where it stopped.",
      "i18n_arch_title": "Pipeline Architecture",
      "i18n_arch_subtitle": "High-availability serverless microservice deployed on Google Cloud Run",
      "i18n_step1_title": "Flattening",
      "i18n_step1_desc": "Converting nested JSON into flat key-value pairs.",
      "i18n_step2_title": "Batching",
      "i18n_step2_desc": "Optimized segmentation matching context window limits.",
      "i18n_step3_title": "Gemini LLM",
      "i18n_step3_desc": "Inference with strict Pydantic Structured Outputs schema.",
      "i18n_step4_title": "Regex & Repair",
      "i18n_step4_desc": "Automatic cleanup of spacing and variable artifacts.",
      "i18n_step5_title": "Reconstruction",
      "i18n_step5_desc": "Restoring translated JSON dictionary identical to original structure.",
      "i18n_docs_title": "Design Documents & Sources",
      "i18n_docs_subtitle": "Direct access to raw Markdown resources or source code repository.",
      "i18n_doc1_title": "Development Journals",
      "i18n_doc1_desc": "Complete history and logbook of all translator development sessions.",
      "i18n_doc1_link": "Browse journals ↗",
      "i18n_doc2_title": "Technical Glossary",
      "i18n_doc2_desc": "Detailed definitions of key pipeline concepts (Structured Outputs, Checkpointing, Retry Backoff).",
      "i18n_doc2_link": "Read raw glossary ↗",
      "i18n_doc3_title": "Interview Questions",
      "i18n_doc3_desc": "Preparatory FAQ and typical questions regarding agent architecture and design choices.",
      "i18n_doc3_link": "Read raw FAQ ↗",
      "i18n_doc4_title": "Complete Source Code",
      "i18n_doc4_desc": "Full repository containing all code (CLI, FastAPI API, Dockerfile, and orchestration).",
      "i18n_doc4_link": "Browse source code ↗",
      "i18n_demo_title": "Live Translation Demo",
      "i18n_demo_subtitle": "Test the translator in real-time on raw text or an i18n JSON dictionary",
      "i18n_btn_mode_json": "📦 i18n JSON Dictionary",
      "i18n_btn_mode_text": "📝 Raw Text with Variables",
      "i18n_label_source": "Source:",
      "i18n_label_target": "Target:",
      "i18n_label_batch": "Batch size:",
      "i18n_presets_label": "Preset Examples:",
      "i18n_preset1": "Example 1: Navigation & Auth",
      "i18n_preset2": "Example 2: Variables & HTML",
      "i18n_preset3": "Example 3: Nested Object",
      "i18n_input_title": "Input",
      "i18n_btn_clear": "Clear",
      "i18n_btn_translate": "Translate",
      "i18n_output_title": "Translated Output",
      "i18n_btn_copy": "📋 Copy",
      "i18n_metric_status": "Status:",
      "i18n_status_ready": "Ready",
      "i18n_metric_vars": "Preserved Variables:",
      "i18n_metric_time": "Execution Time:",

      // AIPE Framework Showcase Page
      "aipe_hero_badge": "Industrial Blueprint & Product Infrastructure",
      "aipe_hero_title": "Blueprint <span class=\"gradient-text\">AI Product Engineering</span>",
      "aipe_hero_desc": "Standardized industrial and technical foundation designed to accelerate and secure AI product development (LLMs, RAG, Agents). Eliminates initial tech debt by enforcing strict best practices from day one.",
      "aipe_hero_btn_qa": "Explore Test Suite (64 PASSED)",
      "aipe_hero_btn_docs": "Read Roadmap & FAQ",
      "aipe_pres_badge": "Technical Debt Elimination",
      "aipe_pres_title": "The 4 Pillars of AIPE Engineering",
      "aipe_pres_subtitle": "How to transform a spaghetti AI prototype into a production-ready microservice",
      "aipe_card1_title": "Zero-Setup Friction",
      "aipe_card1_desc": "Developer onboarding in under 5 minutes flat (`git clone` → `make install` → `make dev`). Deterministic in-project local `.venv` environment.",
      "aipe_card2_title": "Gatekeeping & Passive Security",
      "aipe_card2_desc": "Automatic local Git blocking of any secret leak (OpenAI, Gemini API keys) via `detect-secrets` and pre-commit YAML validation.",
      "aipe_card3_title": "Quality & Strict Typing",
      "aipe_card3_desc": "Ultra-fast Rust linter/formatter `Ruff` (< 2s) paired with `Mypy` static checker in strict mode (100% of code in `src/` annotated).",
      "aipe_card4_title": "Hardened Containerization",
      "aipe_card4_desc": "Ultra-lightweight multi-stage Dockerfile (< 250 MB), run under non-privileged system user (`appuser` UID 1000) with native HTTP `HEALTHCHECK` probe.",
      "aipe_arch_title": "Phased Architecture & Lifecycle",
      "aipe_arch_subtitle": "A linear 6-phase roadmap from initialization to deployment",
      "aipe_step1_title": "Poetry & Setup",
      "aipe_step1_desc": "Local `.venv` isolation & deterministic resolution.",
      "aipe_step2_title": "Quality & Hooks",
      "aipe_step2_desc": "Ruff, strict Mypy & detect-secrets pre-commit.",
      "aipe_step3_title": "Makefile CLI",
      "aipe_step3_desc": "Unified Zero-Friction command interface.",
      "aipe_step4_title": "FastAPI API",
      "aipe_step4_desc": "ASGI microservice & standardized /health route.",
      "aipe_step5_title": "Hardened Docker",
      "aipe_step5_desc": "Multi-stage, non-root appuser & HEALTHCHECK.",
      "aipe_step6_title": "IDE & Onboarding",
      "aipe_step6_desc": "VSCode format-on-save Ruff & onboarding KPI < 5 min.",
      "aipe_qa_title": "Quality Indicators & Test Terminal",
      "aipe_qa_subtitle": "Run automated test suite or simulate onboarding scenario in real-time",
      "aipe_metric1": "Tests Passing (100% Pass)",
      "aipe_metric2": "Code Coverage (src/)",
      "aipe_metric3": "Strict Mypy Errors",
      "aipe_metric4": "Runtime Docker Image Size",
      "aipe_metric5": "Onboarding KPI (< 5 min)",
      "aipe_btn_suite_all": "🧪 Full Suite (64 tests)",
      "aipe_btn_suite_onboarding": "🚀 Onboarding Tests (21 tests)",
      "aipe_btn_suite_vscode": "🖥️ VSCode Config (13 tests)",
      "aipe_btn_suite_docker": "🐳 Docker & Hardening (15 tests)",
      "aipe_btn_suite_sim": "⏱️ Onboarding Simulation (< 5 min)",
      "aipe_explorer_title": "Interactive Project Explorer",
      "aipe_explorer_subtitle": "Browse the roadmap, glossary, recruiter FAQ, and learning log",
      "aipe_tab1": "🗺️ Roadmap (100% Validated)",
      "aipe_tab2": "📖 Technical Glossary",
      "aipe_tab3": "❓ Interview FAQ (34 questions)",
      "aipe_tab4": "📝 Journal (17 Sessions)"
    },
    fr: {
      // Navbar & Common
      "nav_parcours": "Parcours & Expériences",
      "nav_projects": "Projets Produit IA",
      "nav_blog": "Blog & Analyses",
      "nav_presentation": "Présentation",
      "nav_architecture": "Architecture",
      "nav_docs_sources": "Documents & Sources",
      "nav_demo": "Démo Live",
      "nav_hub": "← Hub Portfolio",
      "nav_quality": "Qualité & Tests",
      "nav_explorer": "Roadmap & Documentation",
      "nav_source": "Code Source ↗",
      "footer_text": "Portfolio Michaël Daadoun — AI Product Engineering",
      "footer_sub": "Hébergé via GitHub Pages",
      "footer_aipe_text": "Blueprint AIPE_Framework — AI Product Engineering Infrastructure",
      "footer_aipe_sub": "Conçu par Michaël Daadoun — Hébergé via GitHub Pages",
      "footer_i18n_text": "Microservice Traducteur Automatique i18n — Conçu avec FastAPI & LLM",
      "footer_i18n_sub": "Hébergé via GitHub Pages & service en ligne sur Google Cloud Run",

      // Index / Hub Positioning
      "hub_badge": "Applied AI Product Engineer",
      "hub_hero_title": "Conception de Systèmes IA <span class=\"gradient-text\">Souverains, Sécurisés & Prêts pour la Production</span>",
      "hub_hero_desc": "Faire la jonction entre les capacités IA de pointe—<strong>Multimodal, Agentic RAG, Workflows Autonomes</strong>—et les exigences industrielles de <strong>sécurité, souveraineté et éthique des données</strong>.",
      "hub_hero_read_also": "📖 Lire aussi :",
      "hub_hero_article_link": "Le métier d'AI Engineer",
      "hub_btn_discover": "Explorer Projets & Stack",
      "hub_btn_parcours": "Comment je conçois avec l'IA",
      
      // 4 Pillars Section
      "pillars_badge": "Philosophie d'Ingénierie",
      "pillars_title": "Comment je conçois avec l'IA — Les 4 Piliers Métier",
      "pillars_subtitle": "Créer de la valeur produit mesurable grâce à des architectures robustes, sécurisées et orientées utilisateur",
      "pillar1_num": "01. SYSTEMES AGENTIQUES",
      "pillar1_title": "Orchestration d'Agents & Workflows",
      "pillar1_desc": "Conception d'agents autonomes capables de planifier, d'utiliser des outils/API et d'exécuter des tâches complexes de manière déterministe et résiliente.",
      "pillar2_num": "02. ADVANCED RAG",
      "pillar2_title": "Enterprise & Advanced RAG",
      "pillar2_desc": "Architectures de recherche hybrides (sémantique, vectorielle, BM25, ré-ordonnancement/reranking, Knowledge Graphs) garantissant des réponses exactes sans hallucination.",
      "pillar3_num": "03. SOUVERAIN & SUR",
      "pillar3_title": "Sécurité, Éthique & Souveraineté",
      "pillar3_desc": "Déploiement souverain (LLM locaux/Open Source, VPCE), maîtrise des fuites de données (PII), garde-fous stricts et conformité réglementaire (EU AI Act).",
      "pillar4_num": "04. MULTIMODAL & UX",
      "pillar4_title": "Multimodal & Interaction Réelle",
      "pillar4_desc": "Intégration de modèles vision/audio et passerelles robotiques pour étendre l'IA au-delà du texte vers des interactions physiques et temps réel.",

      // Tech Stack Table
      "stack_badge": "Couches d'Ingénierie",
      "stack_title": "Stack Technique & Matrice d'Architecture",
      "stack_subtitle": "Outils et frameworks éprouvés en production organisés par couche logicielle",
      "stack_col_domain": "Domaine d'Ingénierie",
      "stack_col_techs": "Technologies & Frameworks",
      "stack_d1": "Orchestration & Agents",
      "stack_d2": "RAG & Vector DBs",
      "stack_d3": "Souveraineté & Modèles",
      "stack_d4": "Évaluation & Sécurité",
      "stack_d5": "Engineering & Product",

      // Projects Section
      "projects_badge": "Études de Cas Produit",
      "projects_title": "Projets IA & Études de Cas",
      "projects_subtitle": "Applications intelligentes prêtes pour la production, centrées sur l'impact métier et la sécurité",
      "card_status_live": "Démo Live Disponible",
      "card_status_live_docs": "Démo & Documentation Live",
      "card_status_in_dev": "🛠️ En cours de développement",
      "card_status_coming_soon": "🚀 Prochainement",
      "card1_title": "Traducteur Automatique i18n JSON",
      "card1_desc": "<strong>Problème :</strong> Altération des variables d'interpolation lors des traductions par LLM.<br><strong>Architecture :</strong> Microservice FastAPI, Structured Outputs Pydantic, protection Regex & checkpointing atomique.<br><strong>Impact :</strong> 100% de variables préservées, 0 clé perdue, déployé sur Cloud Run.",
      "card1_btn": "Accéder à la Démo Produit",
      "card2_title": "Blueprint AI Product Engineering (AIPE)",
      "card2_desc": "<strong>Problème :</strong> Dette technique initiale et fuites de clés API sur les projets IA.<br><strong>Architecture :</strong> Isolation Poetry, linter Ruff, Mypy strict (100%), Docker multi-stage non-root & gatekeeping pre-commit.<br><strong>Impact :</strong> Onboarding < 5 min, 64/64 tests validés.",
      "card2_btn": "Explorer le Blueprint & QA Studio",
      "card3_title": "RAG Souverain & Intelligence Documentaire",
      "card3_desc": "<strong>Problème :</strong> Recherche réglementaire interne sans envoi de données vers des API tierces.<br><strong>Architecture :</strong> Hybrid Search (pgvector + BM25) + Reranking (BGE) + vérification LangGraph.<br><strong>Impact :</strong> -70% de temps de recherche, 0 fuite de données.",
      "card3_btn": "Démo Bientôt Disponible",
      "card4_title": "Orchestrateur Multi-Agents",
      "card4_desc": "<strong>Problème :</strong> Exécution autonome de workflows complexes multi-outils.<br><strong>Architecture :</strong> Réseau d'agents CrewAI & AutoGen avec WebSockets et FastAPI.<br><strong>Impact :</strong> Prise de décision distribuée avec rollback d'état déterministe.",
      "card4_btn": "Prochainement",
      "card5_title": "Microservice Vision AI & Analytics",
      "card5_desc": "<strong>Problème :</strong> Analyse documentaire visuelle et détection d'anomalies en temps réel.<br><strong>Architecture :</strong> Pipeline PyTorch & OpenCV couplé à l'API Gemini Vision.<br><strong>Impact :</strong> Extraction sémantique et OCR haute précision.",
      "card5_btn": "Prochainement",

      // Blog Portal
      "blog_header_title": "Blog & <span class=\"gradient-text\">Analyses Techniques</span>",
      "blog_header_subtitle": "Retrouvez mes publications sur l'architecture logicielle de l'IA, le Model Context Protocol (MCP), et l'orchestration robuste des Cloud Agents.",
      "blog_tag_strategy": "✨ Stratégie & Sécurité",
      "blog_tag_arch": "✨ AI Architecture",
      "blog_tag_security": "✨ Sécurité & Agents",
      "blog_tag_eng": "✨ AI Engineering",
      "blog_read_time_6": "⏱️ 6 min de lecture",
      "blog_read_time_8": "⏱️ 8 min de lecture",
      "blog_read_article": "Lire l'article &rarr;",
      "blog_back_to_list": "Retour au blog",
      "blog_by_author": "✍️ Par Michaël Daadoun",
      "blog_tag_label": "🏷️ AI Engineering / Architecture",

      // Blog Article 1
      "art1_title": "L'Avènement de l'AI Engineer : De l'Artisanat du Prompt à l'Usine Logicielle Autonome",
      "art1_summary": "Analyse de l'évolution radicale du métier d'AI Engineer entre 2023 et 2026. Découvrez le passage du simple prompt engineering à la conception de Cloud Agents et de JIT Context Routers sous standard MCP.",

      // Blog Article 2
      "art2_title": "L’affaire OpenAI vs Hugging Face : quand l’IA échappe au laboratoire et pirate le Web",
      "art2_summary": "Retour sur un incident historique en juillet 2026 : des agents autonomes d'OpenAI s'échappent de leur sandbox lors d'une évaluation interne pour aller pirater les serveurs de Hugging Face et voler le corrigé du test.",

      // Blog Article 3
      "art3_title": "Kimi K3 décortiqué : Architecture, réalités de production et enjeux stratégiques",
      "art3_summary": "Analyse approfondie de Kimi K3, le plus grand modèle open-weight au monde avec 2,8 trillions de paramètres. Découvrez ses innovations architecturales, ses performances réelles et ses contraintes économiques de production.",

      // Blog Article 4
      "art4_title": "Le Grand Schisme de l'IA : Entre Guerre Hégémonique, Modèles \"Open-Weight\" Chinois et Crise des Guardrails",
      "art4_summary": "Une analyse du grand schisme de l'IA à l'été 2026 : l'affrontement entre les Frontier Labs closed-source américains et les modèles open-weight chinois (Kimi K3, GLM-5.2), l'économie de l'inférence et la crise de sécurité des agents autonomes.",

      // i18n Translator Showcase Page
      "i18n_hero_badge": "AI Product Feature & Intégration LLM",
      "i18n_hero_title": "Traducteur Automatique <span class=\"gradient-text\">i18n JSON</span>",
      "i18n_hero_desc": "Outil de localisation intelligente adaptable à tout produit utilisant du JSON. Résout le problème des variables d'interpolation corrompues (ex: <code>{username}</code>, <code>{{count}}</code>, <code>&lt;a&gt;</code>) grâce la validation par Structured Outputs.",
      "i18n_hero_btn_demo": "Tester la Démo Live",
      "i18n_hero_btn_proj": "Découvrir le Projet",
      "i18n_pres_title": "Présentation & Problématique Métier",
      "i18n_pres_subtitle": "Pourquoi la traduction i18n par LLM classique échoue sans pipeline dédié ?",
      "i18n_card1_title": "Préservation des Structures",
      "i18n_card1_desc": "Aplatissement récursif (flattening) des fichiers JSON complexes et reconstruction exacte après traduction. Aucune clé manquante ou déplacée.",
      "i18n_card2_title": "Protection des Variables",
      "i18n_card2_desc": "Post-traitement par Regex spécialisé garantissant que les variables comme <code>{user}</code> ou <code>{{count}}</code> et les balises HTML ne sont jamais altérées.",
      "i18n_card3_title": "Gestion des Quotas & Backoff",
      "i18n_card3_desc": "Découpage automatique en lots (batching) et retry résilient avec <em>Exponential Backoff & Jitter</em> pour éviter les erreurs de Rate Limit (429).",
      "i18n_card4_title": "Checkpointing Atomique",
      "i18n_card4_desc": "Sauvegarde progressive de l'avancement sur disque. En cas de coupure réseau, la traduction reprend exactement là où elle s'est arrêtée.",
      "i18n_arch_title": "Architecture du Pipeline",
      "i18n_arch_subtitle": "Microservice Serverless haute disponibilité déployé sur Google Cloud Run",
      "i18n_step1_title": "Aplatissement",
      "i18n_step1_desc": "Conversion du JSON imbriqué en paires clé-valeur plates.",
      "i18n_step2_title": "Batching",
      "i18n_step2_desc": "Segmentation optimisée selon la fenêtre de contexte.",
      "i18n_step3_title": "Gemini LLM",
      "i18n_step3_desc": "Inférence avec schéma strict Pydantic Structured Outputs.",
      "i18n_step4_title": "Regex & Repair",
      "i18n_step4_desc": "Correction automatique des espaces et variables.",
      "i18n_step5_title": "Reconstruction",
      "i18n_step5_desc": "Restitution du dictionnaire JSON traduit identique à l'original.",
      "i18n_docs_title": "Documents de Conception & Sources",
      "i18n_docs_subtitle": "Accédez directement aux ressources brutes au format Markdown ou au dépôt de code source.",
      "i18n_doc1_title": "Journaux de bord",
      "i18n_doc1_desc": "Historique complet et journal d'apprentissage de toutes les séances de développement du traducteur.",
      "i18n_doc1_link": "Parcourir les journaux ↗",
      "i18n_doc2_title": "Glossaire Technique",
      "i18n_doc2_desc": "Définitions détaillées des concepts clés du pipeline (Structured Outputs, Checkpointing, Retry Backoff).",
      "i18n_doc2_link": "Lire le glossaire brut (Raw) ↗",
      "i18n_doc3_title": "Questions d'Entretien",
      "i18n_doc3_desc": "FAQ préparatoire et questions typiques concernant l'architecture de l'agent et les choix de conception.",
      "i18n_doc3_link": "Lire la FAQ brute (Raw) ↗",
      "i18n_doc4_title": "Code Source Complet",
      "i18n_doc4_desc": "Dépôt complet du projet contenant l'intégralité du code (CLI, API FastAPI, Dockerfile et orchestration).",
      "i18n_doc4_link": "Parcourir le code source ↗",
      "i18n_demo_title": "Démo Live de Traduction",
      "i18n_demo_subtitle": "Testez le traducteur en temps réel sur du texte ou un dictionnaire i18n JSON",
      "i18n_btn_mode_json": "📦 Dictionnaire JSON i18n",
      "i18n_btn_mode_text": "📝 Texte Brut avec Variables",
      "i18n_label_source": "Source :",
      "i18n_label_target": "Cible :",
      "i18n_label_batch": "Taille du lot :",
      "i18n_presets_label": "Exemples prédéfinis :",
      "i18n_preset1": "Exemple 1 : Navigation & Auth",
      "i18n_preset2": "Exemple 2 : Variables & HTML",
      "i18n_preset3": "Exemple 3 : Arborescence Imbriquée",
      "i18n_input_title": "Entrée",
      "i18n_btn_clear": "Effacer",
      "i18n_btn_translate": "Traduire",
      "i18n_output_title": "Résultat Traduit",
      "i18n_btn_copy": "📋 Copier",
      "i18n_metric_status": "Statut :",
      "i18n_status_ready": "Prêt",
      "i18n_metric_vars": "Variables préservées :",
      "i18n_metric_time": "Temps d'exécution :",

      // AIPE Framework Showcase Page
      "aipe_hero_badge": "Industrial Blueprint & Product Infrastructure",
      "aipe_hero_title": "Blueprint <span class=\"gradient-text\">AI Product Engineering</span>",
      "aipe_hero_desc": "Socle technique et industriel standardisé conçu pour accélérer et sécuriser le développement de produits d'intelligence artificielle (LLMs, RAG, Agents). Élimine la dette technique initiale en imposant de bonnes pratiques strictes dès le premier jour.",
      "aipe_hero_btn_qa": "Explorer la Suite de Tests (64 PASSED)",
      "aipe_hero_btn_docs": "Consulter la Roadmap & FAQ",
      "aipe_pres_badge": "Résolution de la Dette Technique",
      "aipe_pres_title": "Les 4 Piliers d'Ingénierie AIPE",
      "aipe_pres_subtitle": "Comment passer d'un prototype IA spaghetti à un microservice prêt pour la production",
      "aipe_card1_title": "Zero-Setup Friction",
      "aipe_card1_desc": "Onboarding d'un développeur en moins de 5 minutes chrono (`git clone` → `make install` → `make dev`). Environnement virtuel `.venv` local déterministe.",
      "aipe_card2_title": "Gatekeeping & Sécurité Passive",
      "aipe_card2_desc": "Blocage automatique au niveau local Git de toute fuite de secret (clés API OpenAI, Gemini) via `detect-secrets` et validation de syntaxe YAML avant tout commit.",
      "aipe_card3_title": "Qualité & Typage Strict",
      "aipe_card3_desc": "Formateur & linter Rust ultra-rapide `Ruff` (< 2s) couplé au vérificateur statique `Mypy` en mode strict (100% du code dans `src/` annoté et vérifié).",
      "aipe_card4_title": "Conteneurisation Hardened",
      "aipe_card4_desc": "Dockerfile multi-stage ultra-léger (< 250 MB), exécuté sous un utilisateur système non-privilégié (`appuser` UID 1000) avec sonde native `HEALTHCHECK` HTTP.",
      "aipe_arch_title": "Architecture & Lifecycle par Phases",
      "aipe_arch_subtitle": "Une feuille de route linéaire en 6 phases de l'initialisation au déploiement",
      "aipe_step1_title": "Poetry & Setup",
      "aipe_step1_desc": "Isolation locale `.venv` & résolution déterministe.",
      "aipe_step2_title": "Qualité & Hooks",
      "aipe_step2_desc": "Ruff, Mypy strict & detect-secrets pre-commit.",
      "aipe_step3_title": "CLI Makefile",
      "aipe_step3_desc": "Interface de commande unifiée Zero-Friction.",
      "aipe_step4_title": "API FastAPI",
      "aipe_step4_desc": "Microservice ASGI & endpoint /health normé.",
      "aipe_step5_title": "Docker Hardened",
      "aipe_step5_desc": "Multi-stage, non-root appuser & HEALTHCHECK.",
      "aipe_step6_title": "IDE & Onboarding",
      "aipe_step6_desc": "Paramètres VSCode format-on-save Ruff & KPI simulation < 5 min.",
      "aipe_qa_title": "Indicateurs de Qualité & Terminal de Tests",
      "aipe_qa_subtitle": "Exécutez la suite de tests automatisés ou simulez le scénario d'onboarding en temps réel",
      "aipe_metric1": "Tests au Vert (100% Pass)",
      "aipe_metric2": "Couverture de Code (src/)",
      "aipe_metric3": "Typage Strict Mypy",
      "aipe_metric4": "Image Docker Runtime",
      "aipe_metric5": "KPI Onboarding (< 5 min)",
      "aipe_btn_suite_all": "🧪 Toute la suite (64 tests)",
      "aipe_btn_suite_onboarding": "🚀 Tests Onboarding (21 tests)",
      "aipe_btn_suite_vscode": "🖥️ Configuration VSCode (13 tests)",
      "aipe_btn_suite_docker": "🐳 Docker & Hardening (15 tests)",
      "aipe_btn_suite_sim": "⏱️ Simulation Onboarding (< 5 min)",
      "aipe_explorer_title": "Explorateur Interactif du Projet",
      "aipe_explorer_subtitle": "Naviguez dans la feuille de route, le glossaire, la FAQ recruteur et le journal d'apprentissage",
      "aipe_tab1": "🗺️ Feuille de Route (100% Validé)",
      "aipe_tab2": "📖 Glossaire Technique",
      "aipe_tab3": "❓ FAQ Entretien (34 questions)",
      "aipe_tab4": "📝 Journal (17 Séances)"
    }
  };

  function getPreferredLanguage() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'fr') {
      return saved;
    }
    // Default to English as requested
    return 'en';
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    updateSwitchButtons(lang);
    if (typeof window.updateThemeButtons === 'function') {
      window.updateThemeButtons();
    }
  }

  function updateSwitchButtons(lang) {
    const switches = document.querySelectorAll('.lang-switch-btn');
    switches.forEach(btn => {
      const textSpan = btn.querySelector('.lang-text');
      const nextLang = lang === 'en' ? 'fr' : 'en';
      if (lang === 'en') {
        if (textSpan) textSpan.textContent = 'FR';
        btn.setAttribute('aria-label', 'Changer la langue en Français');
        btn.setAttribute('title', 'Passer en Français');
      } else {
        if (textSpan) textSpan.textContent = 'EN';
        btn.setAttribute('aria-label', 'Switch language to English');
        btn.setAttribute('title', 'Switch to English');
      }
    });
  }

  const initialLang = getPreferredLanguage();
  applyLanguage(initialLang);

  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(getPreferredLanguage());

    document.body.addEventListener('click', (e) => {
      const switchBtn = e.target.closest('.lang-switch-btn');
      if (switchBtn) {
        const currentLang = document.documentElement.getAttribute('lang') || 'en';
        const newLang = currentLang === 'en' ? 'fr' : 'en';
        localStorage.setItem(LANG_KEY, newLang);
        applyLanguage(newLang);
      }
    });
  });
})();
