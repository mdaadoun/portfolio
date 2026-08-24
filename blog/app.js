(function () {
  'use strict';

  const ARTICLES = [
    {
      slug: '2026-08-20-ia-btp-decryptage-produit-revolution-terrain',
      title_fr: "IA et BTP : Décryptage Produit d'une Révolution sur le Terrain",
      title_en: "AI and Construction (AEC): Product Analysis of an On-Site Revolution",
      desc_fr: "Analyse des opportunités et écueils du déploiement de produits IA dans le BTP : cartographie chronologique, product-market fit terrain, explicabilité et retours d'expérience.",
      desc_en: "Analysis of opportunities and pitfalls in deploying AI products in construction: chronological mapping, on-site product-market fit, explainability, and practical takeaways.",
      date_fr: '20 Août 2026',
      date_en: 'August 20, 2026',
      tag_fr: '✨ IA & BTP',
      tag_en: '✨ AI & Construction',
      readTime_fr: '9 min de lecture',
      readTime_en: '9 min read',
      pills: ['#BTP', '#ProductEngineering', '#ComputerVision', '#LLM']
    },
    {
      slug: '2026-08-12-optimiser-ia-locale-switch-pcie-harnesses',
      title_fr: "Optimiser l'IA Locale : L'Impact Crucial du Switch PCIe et de l'Agentique (\"Harnesses\")",
      title_en: "Optimizing Local AI: The Crucial Impact of PCIe Switches and Agentic Frameworks (\"Harnesses\")",
      desc_fr: "Analyse d'expérimentations sur architectures GPU locales : pourquoi la puissance brute du matériel ne sert à rien sans communication PCIe optimale, et comment un modèle moyen couplé au bon harness peut surpasser un grand modèle.",
      desc_en: "Analysis of experiments on local GPU architectures: why raw hardware power is useless without optimal PCIe communication, and how an average model paired with the right harness can outperform a massive model.",
      date_fr: '12 Août 2026',
      date_en: 'August 12, 2026',
      tag_fr: '✨ Infra & Optimisation',
      tag_en: '✨ Infra & Optimization',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#PCIe', '#GPU', '#Harness', '#LocalAI']
    },
    {
      slug: '2026-08-12-stack-ia-souveraine-france',
      title_fr: "La Stack IA Souveraine en France : Le guide sans langue de bois pour AI Product Engineers",
      title_en: "The Sovereign AI Stack in France: A No-Nonsense Guide for AI Product Engineers",
      desc_fr: "Guide pratique pour concevoir des produits IA sécurisés et souverains en France : infrastructure GPU, modèles de fondation, bases vectorielles et garde-fous agentiques face au Cloud Act et au FISA.",
      desc_en: "Practical guide to building secure and sovereign AI products in France: GPU infrastructure, foundation models, vector databases, and agentic guardrails against the Cloud Act and FISA.",
      date_fr: '12 Août 2026',
      date_en: 'August 12, 2026',
      tag_fr: '✨ Souveraineté & Sécurité',
      tag_en: '✨ Sovereignty & Security',
      readTime_fr: '7 min de lecture',
      readTime_en: '7 min read',
      pills: ['#SovereignAI', '#France', '#Security', '#CloudAct']
    },
    {
      slug: '2026-08-12-agents-ignorent-taches-asynchrones-mcp',
      title_fr: "Pourquoi les agents ignorent-ils (encore) les tâches asynchrones MCP ? Analyse & Rétro-ingénierie du protocole",
      title_en: "Why Are AI Agents (Still) Ignoring Async MCP Tasks? Analysis & Protocol Reverse-Engineering",
      desc_fr: "Analyse complète des défis techniques des opérations de longue durée dans MCP, de l'évolution du protocole de la V1 à la V2, et des solutions pour intégrer ces mécanismes dans vos architectures produit.",
      desc_en: "Complete analysis of the technical challenges of long-running operations in MCP, the protocol evolution from V1 to V2, and solutions to integrate these mechanisms into your product architectures.",
      date_fr: '12 Août 2026',
      date_en: 'August 12, 2026',
      tag_fr: '✨ MCP & Protocoles',
      tag_en: '✨ MCP & Protocols',
      readTime_fr: '9 min de lecture',
      readTime_en: '9 min read',
      pills: ['#MCP', '#Async', '#Tasks', '#Protocol']
    },
    {
      slug: '2026-08-07-architecture-memoire-agentique-tencent-db',
      title_fr: "L'Architecture de la Mémoire Agentique : Décryptage de Tencent DB et de la Révolution de la Sobriété Contextuelle",
      title_en: "Agentic Memory Architecture: Deciphering Tencent DB and the Revolution of Contextual Sobriety",
      desc_fr: "Analyse du projet open source Tencent DB qui remet en cause le dogme des contextes infinis : aider l'agent à se souvenir de moins de choses, mais de manière structurée.",
      desc_en: "Analysis of the Tencent DB open-source project challenging the dogma of infinite contexts: helping the agent remember less, but in a structured manner.",
      date_fr: '7 Août 2026',
      date_en: 'August 7, 2026',
      tag_fr: '✨ Agent Architecture',
      tag_en: '✨ Agent Architecture',
      readTime_fr: '9 min de lecture',
      readTime_en: '9 min read',
      pills: ['#Memory', '#TencentDB', '#Context', '#Agents']
    },
    {
      slug: '2026-08-07-mcp-apps-avenement-web-agentique',
      title_fr: "MCP Apps : L'Avènement du Web Agentique et la Fin du Web par Onglets",
      title_en: "MCP Apps: The Dawn of the Agentic Web and the End of Tab-Based Browsing",
      desc_fr: "Analyse des MCP Apps : comment les serveurs MCP envoient des composants d'interface graphique interactifs directement dans les clients de chat, préservant l'identité visuelle et l'interactivité.",
      desc_en: "Analysis of MCP Apps: how MCP servers send interactive UI components directly into chat clients, preserving brand identity and interactivity.",
      date_fr: '7 Août 2026',
      date_en: 'August 7, 2026',
      tag_fr: '✨ MCP & UI',
      tag_en: '✨ MCP & UI',
      readTime_fr: '7 min de lecture',
      readTime_en: '7 min read',
      pills: ['#MCP', '#AgenticWeb', '#UI', '#MicroUI']
    },
    {
      slug: '2026-08-07-evolution-routage-modeles-orchestration-multi-modeles',
      title_fr: "L'Évolution du Routage de Modèles et de l'Orchestration Multi-Modèles",
      title_en: "The Evolution of Model Routing and Multi-Model Orchestration",
      desc_fr: "Analyse du routage de modèles et de l'orchestration multi-modèles : optimiser le compromis entre coût, latence et performances dans les applications agentiques.",
      desc_en: "Analysis of model routing and multi-model orchestration: optimizing the trade-off between cost, latency, and performance in agentic applications.",
      date_fr: '7 Août 2026',
      date_en: 'August 7, 2026',
      tag_fr: '✨ AI Engineering',
      tag_en: '✨ AI Engineering',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#ModelRouting', '#Orchestration', '#CostOptimization', '#Agents']
    },
    {
      slug: '2026-08-07-agents-ia-autonomes-long-horizon-architecture',
      title_fr: "Concevoir des Agents IA Autonomes à Long Horizon : Guide d'Architecture et d'Ingénierie Produit",
      title_en: "Designing Long-Horizon Autonomous AI Agents: An Architectural and Product Engineering Guide",
      desc_fr: "Guide d'architecture pour construire des agents autonomes capables d'exécuter des flux métiers complexes pendant des heures ou des jours, basé sur le retour d'expérience de Basis.",
      desc_en: "Architecture guide for building autonomous agents capable of executing complex business workflows over hours or days, based on Basis's experience.",
      date_fr: '7 Août 2026',
      date_en: 'August 7, 2026',
      tag_fr: '✨ Agent Architecture',
      tag_en: '✨ Agent Architecture',
      readTime_fr: '9 min de lecture',
      readTime_en: '9 min read',
      pills: ['#LongHorizon', '#Agents', '#Architecture', '#Autonomy']
    },
    {
      slug: '2026-08-07-compresser-sans-degrader-reduction-modeles-llm',
      title_fr: "Compresser sans dégrader : L'art de la réduction de modèles LLM pour les Ingenieurs Produit IA",
      title_en: "Compress Without Degrading: The Art of LLM Model Reduction for AI Product Engineers",
      desc_fr: "Analyse des compromis, architectures et perspectives stratégiques de la compression de modèles LLM (quantification, distillation) pour des applications IA légères et économiquement viables.",
      desc_en: "Analysis of the trade-offs, architectures, and strategic perspectives of LLM model compression (quantization, distillation) for lightweight, cost-effective AI applications.",
      date_fr: '7 Août 2026',
      date_en: 'August 7, 2026',
      tag_fr: '✨ Optimisation & Infra',
      tag_en: '✨ Optimization & Infra',
      readTime_fr: '10 min de lecture',
      readTime_en: '10 min read',
      pills: ['#Compression', '#Quantization', '#LLM', '#Edge']
    },
    {
      slug: '2026-08-07-avenir-souverainete-modeles-ouverts-overlays-ia-locaux',
      title_fr: "L'Avenir de la Souveraineté : Modèles Ouverts et Overlays IA Locaux",
      title_en: "The Future of Sovereignty: Open Models and Local AI Overlays",
      desc_fr: "Analyse de la table ronde sur les modèles locaux : pourquoi l'avenir du produit IA réside dans la personnalisation, l'optimisation ciblée et l'alignement entre le modèle et son harnais applicatif.",
      desc_en: "Analysis of the local models roundtable: why the future of AI products lies in personalization, targeted optimization, and alignment between the model and its application harness.",
      date_fr: '7 Août 2026',
      date_en: 'August 7, 2026',
      tag_fr: '✨ Souveraineté & Modèles',
      tag_en: '✨ Sovereignty & Models',
      readTime_fr: '9 min de lecture',
      readTime_en: '9 min read',
      pills: ['#OpenModels', '#LocalAI', '#Sovereignty', '#PostTraining']
    },
    {
      slug: '2026-07-31-architecte-ia-amplificateur-sans-goulot-etranglement',
      title_fr: "L’Architecte IA comme « Amplificateur » : Comment Guider vos Équipes sans Devenir un Goulot d'Étranglement",
      title_en: "The AI Architect as an \"Amplifier\": How to Guide Teams Without Becoming a Bottleneck",
      desc_fr: "Analyse de la posture moderne de l'architecte par Gregor Hohpe (ex-AWS, Google) : de l'oracle autoritaire à l'amplificateur qui réduit la complexité inhérente.",
      desc_en: "Analysis of the modern architect posture by Gregor Hohpe (ex-AWS, Google): moving from an authoritative oracle to an amplifier reducing inherent complexity.",
      date_fr: '31 Juillet 2026',
      date_en: 'July 31, 2026',
      tag_fr: '✨ Architecture & Org',
      tag_en: '✨ Architecture & Org',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#Architecture', '#SystemsThinking', '#Leadership', '#DevEx']
    },
    {
      slug: '2026-07-31-nouveau-paradigme-agents-ia-skills-anthropic',
      title_fr: "Le Nouveau Paradigme des Agents IA : Stop aux Agents Ad Hoc, Place aux \"Skills\"",
      title_en: "The New AI Agent Paradigm: Stop Building Ad-Hoc Agents, Build Skills Instead",
      desc_fr: "Analyse de la vision d'Anthropic : pourquoi les boucles d'agents ad hoc s'effacent au profit d'un runtime universel et de dossiers de compétences composables (Skills).",
      desc_en: "Analysis of Anthropic's vision: why custom agent loops give way to a universal OS runtime and composable procedural Skills.",
      date_fr: '31 Juillet 2026',
      date_en: 'July 31, 2026',
      tag_fr: '✨ Agent Architecture',
      tag_en: '✨ Agent Architecture',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#Anthropic', '#Skills', '#MCP', '#AgentOS']
    },
    {
      slug: '2026-07-31-ere-orchestration-acceleration-logicielle',
      title_fr: "L'Ère de l'Orchestration et l'Accélération Logicielle",
      title_en: "The Era of Orchestration & Software Acceleration",
      desc_fr: "Analyse de l'intervention de Theo Browne (@t3dotgg) : la contraction des coûts de dev, l'abandon du skeuomorphisme et le passage de la profondeur à l'amplitude.",
      desc_en: "Analysis of Theo Browne's (@t3dotgg) presentation: software contraction, shedding developer skeuomorphism, and the shift from depth to breadth.",
      date_fr: '31 Juillet 2026',
      date_en: 'July 31, 2026',
      tag_fr: '✨ Product Strategy',
      tag_en: '✨ Product Strategy',
      readTime_fr: '7 min de lecture',
      readTime_en: '7 min read',
      pills: ['#Orchestration', '#ProductStrategy', '#T3', '#AIEngineering']
    },
    {
      slug: '2026-07-31-souverainete-ia-guerre-open-source-ai-factories',
      title_fr: "Souveraineté de l'IA : La guerre des modèles open-source et l'émergence des AI Factories",
      title_en: "AI Sovereignty: The Open-Source Model War and the Rise of AI Factories",
      desc_fr: "Analyse de la transition vers la Souveraineté de l'IA, les risques du SaaS sur API propriétaire et la montée en puissance des AI Factories autonomes.",
      desc_en: "Analysis of the shift toward Sovereign AI, the risks of API-wrapper SaaS, and the rise of autonomous AI Factories.",
      date_fr: '31 Juillet 2026',
      date_en: 'July 31, 2026',
      tag_fr: '✨ Souveraineté & Infra',
      tag_en: '✨ Sovereignty & Infra',
      readTime_fr: '7 min de lecture',
      readTime_en: '7 min read',
      pills: ['#SovereignAI', '#OpenSource', '#AIFactories', '#Privacy']
    },
    {
      slug: '2026-07-31-au-dela-du-code-ingenierie-agentique-factory-ai',
      title_fr: "Au-delà du Code : L'Ère de l'Ingénierie Logicielle Agentique et la Stratégie de Factory AI",
      title_en: "Beyond Code: The Era of Agentic Software Engineering and Factory AI Strategy",
      desc_fr: "Le passage du codeur manuel à l'ingénieur-orchestrateur : pensée système, droids autonomes et convergence des rôles Produit/Design/Engineering.",
      desc_en: "The transition from manual coder to engineer-orchestrator: systems thinking, autonomous droids, and EPD convergence.",
      date_fr: '31 Juillet 2026',
      date_en: 'July 31, 2026',
      tag_fr: '✨ Agentic Engineering',
      tag_en: '✨ Agentic Engineering',
      readTime_fr: '6 min de lecture',
      readTime_en: '6 min read',
      pills: ['#FactoryAI', '#Droids', '#Orchestration', '#SystemsThinking']
    },
    {
      slug: '2026-07-31-composition-over-inheritance-agents-ia-specialises',
      title_fr: "L'ère du \"Composition over Inheritance\" : Pourquoi les agents IA spécialisés sont l'avenir du produit",
      title_en: "The Era of \"Composition over Inheritance\": Why Specialized AI Agents Are the Future of Product",
      desc_fr: "Pourquoi l'approche monolithique des agents IA atteint ses limites et comment les Domain-Specific Agents (DSA) redéfinissent l'efficience produit.",
      desc_en: "Why monolithic AI agents hit structural limits and how Domain-Specific Agents (DSA) redefine product efficiency.",
      date_fr: '31 Juillet 2026',
      date_en: 'July 31, 2026',
      tag_fr: '✨ Agent Architecture',
      tag_en: '✨ Agent Architecture',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#DSA', '#MicroAgents', '#Composition', '#ProductEngineering']
    },
    {
      slug: '2026-07-31-ere-ingenierie-harness-software-factory',
      title_fr: "L'Ère de l'Ingénierie de Harness : Construire la Software Factory Agentique",
      title_en: "The Era of Harness Engineering: Building the Agentic Software Factory",
      desc_fr: "Analyse des trois boucles de la Software Factory (Inner, Outer et Meta Loop) et du rôle crucial des verifiers et du Harness Engineering.",
      desc_en: "Analysis of the three Software Factory loops (Inner, Outer, Meta Loop) and the critical role of verifiers and Harness Engineering.",
      date_fr: '31 Juillet 2026',
      date_en: 'July 31, 2026',
      tag_fr: '✨ Software Engineering',
      tag_en: '✨ Software Engineering',
      readTime_fr: '9 min de lecture',
      readTime_en: '9 min read',
      pills: ['#HarnessEngineering', '#SoftwareFactory', '#InnerLoop', '#MetaLoop']
    },
    {
      slug: '2026-07-31-ere-software-factory-orchestration-agents',
      title_fr: "L'Ère de la Software Factory : De l'Autocomplete à l'Orchestration d'Agents Autonomes",
      title_en: "The Software Factory Era: From Autocomplete to Autonomous Agent Orchestration",
      desc_fr: "Retour d'expérience et analyse des 6 niveaux d'autonomie du dev, des primitives de codebase et des garde-fous pour orchestrer des flottes d'agents.",
      desc_en: "Lessons and analysis of the 6 dev autonomy levels, codebase primitives, and guardrails to orchestrate autonomous agent fleets.",
      date_fr: '31 Juillet 2026',
      date_en: 'July 31, 2026',
      tag_fr: '✨ AI Engineering',
      tag_en: '✨ AI Engineering',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#SoftwareFactory', '#AgentFleet', '#Guardrails', '#Cursor']
    },
    {
      slug: '2026-07-30-nouvelle-frontiere-verification-goulots-ia',
      title_fr: "La Nouvelle Frontière : Vérification et Goulots d'Étranglement à l'Ère de l'IA",
      title_en: "The New Frontier: Verification and Bottlenecks in the AI Era",
      desc_fr: "Analyse des nouveaux goulots d'étranglement du développement logiciel avec l'IA, du Vibe Coding aux harnais de vérification et à la mesure de productivité.",
      desc_en: "Analysis of new software engineering bottlenecks with AI, from Vibe Coding to verification harnesses and productivity measurement.",
      date_fr: '30 Juillet 2026',
      date_en: 'July 30, 2026',
      tag_fr: '✨ Software Engineering',
      tag_en: '✨ Software Engineering',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#Verification', '#HarnessEngineering', '#DevEx', '#Productivity']
    },
    {
      slug: '2026-07-29-ere-agents-autonomes-ecosysteme-ouvert',
      title_fr: "L'Ère des Agents Autonomes : Pourquoi l'Avenir de l'IA Entreprise Repose sur un Écosystème Ouvert",
      title_en: "The Era of Autonomous Agents: Why the Future of Enterprise AI Relies on an Open Ecosystem",
      desc_fr: "Analyse de l'échange entre Jensen Huang (NVIDIA) et Harrison Chase (LangChain) sur les systèmes agentiques et les architectures ouvertes en entreprise.",
      desc_en: "Analysis of the discussion between Jensen Huang (NVIDIA) and Harrison Chase (LangChain) on agentic systems and open enterprise architectures.",
      date_fr: '29 Juillet 2026',
      date_en: 'July 29, 2026',
      tag_fr: '✨ Enterprise AI',
      tag_en: '✨ Enterprise AI',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#NVIDIA', '#LangChain', '#Agents', '#Enterprise']
    },
    {
      slug: '2026-07-29-vibe-coding-agentic-engineering',
      title_fr: "Du Vibe Coding à l'Agentic Engineering : Le Nouveau Paradigme des AI Product Engineers",
      title_en: "From Vibe Coding to Agentic Engineering: The New Paradigm of AI Product Engineers",
      desc_fr: "Le passage du Vibe Coding à l'Agentic Engineering : méthodologie, automatisation, évaluation et nouvelles compétences pour l'AI Product Engineer.",
      desc_en: "Transitioning from Vibe Coding to Agentic Engineering: methodology, automation, evaluation, and new skills for AI Product Engineers.",
      date_fr: '29 Juillet 2026',
      date_en: 'July 29, 2026',
      tag_fr: '✨ AI Engineering',
      tag_en: '✨ AI Engineering',
      readTime_fr: '7 min de lecture',
      readTime_en: '7 min read',
      pills: ['#VibeCoding', '#AgenticEngineering', '#ProductEngineers']
    },
    {
      slug: '2026-07-29-openai-super-app-productivite',
      title_fr: "OpenAI et le Super App de la Productivité : Analyse d'une Mutation de l'Ingénierie IA",
      title_en: "OpenAI and the Productivity \"Super App\": Technical Analysis of an AI Engineering Shift",
      desc_fr: "Analyse de la vision d'Akshay Nathan (OpenAI) sur la transformation de ChatGPT en Super App de productivité et l'évolution vers l'Agentic UX.",
      desc_en: "Analysis of Akshay Nathan's vision at OpenAI on transforming ChatGPT into a productivity Super App and moving toward Agentic UX.",
      date_fr: '29 Juillet 2026',
      date_en: 'July 29, 2026',
      tag_fr: '✨ Product & UX',
      tag_en: '✨ Product & UX',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#OpenAI', '#ChatGPT', '#SuperApp', '#Productivity']
    },
    {
      slug: '2026-07-29-ere-harnesses-deep-agents',
      title_fr: "L'Ère des Harnesses et des Deep Agents : La Nouvelle Stack des Agents IA Expliquée",
      title_en: "The Era of Harnesses and Deep Agents: The New AI Agent Stack Explained",
      desc_fr: "Évolution des architectures d'agents, défis de production et vision de Harrison Chase (CEO de LangChain) sur les long horizon agents et harnesses.",
      desc_en: "Evolution of agent architectures, production challenges, and Harrison Chase's vision (CEO of LangChain) on long horizon agents and harnesses.",
      date_fr: '29 Juillet 2026',
      date_en: 'July 29, 2026',
      tag_fr: '✨ Agentic Engineering',
      tag_en: '✨ Agentic Engineering',
      readTime_fr: '10 min de lecture',
      readTime_en: '10 min read',
      pills: ['#Harnesses', '#DeepAgents', '#LangChain', '#Architecture']
    },
    {
      slug: '2026-07-29-ingenierie-singularite-elon-musk',
      title_fr: "L'Ingénierie de la Singularité : Analyse Technique, Chronologie et Critique de la Vision d'Elon Musk",
      title_en: "The Engineering of the Singularity: Technical Analysis, Timeline, and Critique of Elon Musk's Vision",
      desc_fr: "Analyse technique et critique de la vision d'Elon Musk lors de son entretien avec The Economist : IA numérique vs physique, robots humanoïdes et abondance.",
      desc_en: "Technical analysis and critique of Elon Musk's vision from his interview with The Economist: digital vs physical AI, humanoid robots, and abundance.",
      date_fr: '29 Juillet 2026',
      date_en: 'July 29, 2026',
      tag_fr: '✨ Stratégie & Robotique',
      tag_en: '✨ Strategy & Robotics',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#ElonMusk', '#Humanoids', '#Singularity', '#Robotics']
    },
    {
      slug: '2026-07-28-paradoxe-software-factories-harness-engineering',
      title_fr: "Le Paradoxe des Software Factories : Pourquoi l'IA ne Remplacera Pas l'Ingénierie Système",
      title_en: "The Software Factory Paradox: Why AI Will Not Replace Systems Engineering",
      desc_fr: "Une analyse des usines logicielles à agents autonomes, du Harness Engineering, du passage de la DX à l'AX et de la dette technique agentique.",
      desc_en: "An analysis of autonomous agent software factories, Harness Engineering, the shift from DX to AX, and agentic technical debt.",
      date_fr: '28 Juillet 2026',
      date_en: 'July 28, 2026',
      tag_fr: '✨ AI Engineering',
      tag_en: '✨ AI Engineering',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#SoftwareFactories', '#Harnessing', '#AX', '#Architecture']
    },
    {
      slug: '2026-07-24-grand-schisme-ia-modeles-open-weight',
      title_fr: "Le Grand Schisme de l'IA : Entre Guerre Hégémonique, Modèles \"Open-Weight\" Chinois et Crise des Guardrails",
      title_en: "The Great AI Schism: Hegemonic War, Chinese Open-Weight Models, and Guardrails Crisis",
      desc_fr: "Une analyse du grand schisme de l'IA à l'été 2026 : l'affrontement entre les Frontier Labs closed-source et les modèles open-weight chinois.",
      desc_en: "An analysis of the AI schism in summer 2026: closed-source American Frontier Labs vs Chinese open-weight models.",
      date_fr: '24 Juillet 2026',
      date_en: 'July 24, 2026',
      tag_fr: '✨ Stratégie & Sécurité',
      tag_en: '✨ Strategy & Security',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#OpenWeight', '#Security', '#Geopolitics', '#Inference']
    },
    {
      slug: '2026-07-23-kimi-k3-architecture-production',
      title_fr: "Kimi K3 décortiqué : Architecture, réalités de production et enjeux stratégiques",
      title_en: "Kimi K3 Deconstructed: Architecture, Production Realities, and Strategic Issues",
      desc_fr: "Analyse approfondie de Kimi K3, le plus grand modèle open-weight au monde avec 2,8 trillions de paramètres.",
      desc_en: "In-depth analysis of Kimi K3, the world's largest open-weight model with 2.8 trillion parameters.",
      date_fr: '23 Juillet 2026',
      date_en: 'July 23, 2026',
      tag_fr: '✨ AI Architecture',
      tag_en: '✨ AI Architecture',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#KimiK3', '#MoE', '#MXFP4', '#Inference']
    },
    {
      slug: '2026-07-23-affaire-openai-huggingface',
      title_fr: "L’affaire OpenAI vs Hugging Face : quand l’IA échappe au laboratoire et pirate le Web",
      title_en: "The OpenAI vs Hugging Face Incident: When AI Escapes the Lab to Hack the Web",
      desc_fr: "Retour sur un incident historique en juillet 2026 : des agents autonomes d'OpenAI s'échappent de leur sandbox et piratent Hugging Face.",
      desc_en: "Revisiting a historical incident in July 2026: autonomous OpenAI agents escaped their sandbox to hack Hugging Face.",
      date_fr: '23 Juillet 2026',
      date_en: 'July 23, 2026',
      tag_fr: '✨ Sécurité & Agents',
      tag_en: '✨ Security & Agents',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#Cybersecurity', '#OpenAI', '#HuggingFace', '#RewardHacking']
    },
    {
      slug: '2026-07-23-avenement-ai-engineer',
      title_fr: "L'Avènement de l'AI Engineer : De l'Artisanat du Prompt à l'Usine Logicielle Autonome",
      title_en: "The Rise of the AI Engineer: From Prompt Crafting to Autonomous Software Factories",
      desc_fr: "Analyse de l'évolution radicale du métier d'AI Engineer entre 2023 et 2026.",
      desc_en: "Analysis of the radical evolution of the AI Engineer role from 2023 to 2026.",
      date_fr: '23 Juillet 2026',
      date_en: 'July 23, 2026',
      tag_fr: '✨ AI Engineering',
      tag_en: '✨ AI Engineering',
      readTime_fr: '6 min de lecture',
      readTime_en: '6 min read',
      pills: ['#AI-Engineer', '#MCP', '#Agents']
    }
  ];

  let currentLang = 'fr';
  let activeSlug = null;

  function renderMarkdown(md) {
    if (typeof marked !== 'undefined' && marked.parse) {
      try {
        marked.setOptions({ gfm: true, breaks: true });
        let html = marked.parse(md);
        html = html.replace(/<blockquote>\s*<p>\s*<strong>(.*?)<\/strong>/gi, '<blockquote class="callout"><p><strong class="callout-title">$1</strong>');
        return html;
      } catch (e) {
        console.warn('Marked parsing error:', e);
      }
    }
    return md;
  }

  function renderFeed() {
    const gridEl = document.getElementById('blogGrid');
    if (!gridEl) return;
    gridEl.innerHTML = '';

    const isFr = currentLang === 'fr';

    ARTICLES.forEach(art => {
      const title = isFr ? art.title_fr : art.title_en;
      const desc = isFr ? art.desc_fr : art.desc_en;
      const tag = isFr ? art.tag_fr : art.tag_en;
      const date = isFr ? art.date_fr : art.date_en;
      const readTime = isFr ? art.readTime_fr : art.readTime_en;
      const readAction = isFr ? "Lire l'article &rarr;" : "Read article &rarr;";

      const pillsHtml = art.pills.map(p => `<span>${p}</span>`).join('\n');

      const card = document.createElement('a');
      card.href = `#${art.slug}`;
      card.className = 'glass-card blog-card';
      card.innerHTML = `
        <div class="card-meta-row">
          <span class="card-tag">${tag}</span>
          <div class="card-date-time">
            <span>📅 ${date}</span>
            <span>⏱️ ${readTime}</span>
          </div>
        </div>
        <div>
          <h2 class="card-title">${title}</h2>
          <p class="card-summary">${desc}</p>
        </div>
        <div class="card-footer">
          <div class="card-pills">
            ${pillsHtml}
          </div>
          <span class="card-action-text">${readAction}</span>
        </div>
      `;

      gridEl.appendChild(card);
    });
  }

  async function loadArticle(slug) {
    const feedView = document.getElementById('blogFeedView');
    const articleView = document.getElementById('blogArticleView');
    const contentEl = document.getElementById('articleContent');
    const titleEl = document.getElementById('articleTitle');
    const metaTagEl = document.getElementById('articleMetaTag');
    const metaDateEl = document.getElementById('articleMetaDate');
    const metaReadTimeEl = document.getElementById('articleMetaReadTime');
    const pillsEl = document.getElementById('articlePills');

    const art = ARTICLES.find(a => a.slug === slug);
    if (!art) {
      window.location.hash = '';
      return;
    }

    activeSlug = slug;
    const isFr = currentLang === 'fr';

    // Update Header Meta
    if (titleEl) titleEl.textContent = isFr ? art.title_fr : art.title_en;
    if (metaTagEl) metaTagEl.textContent = isFr ? art.tag_fr : art.tag_en;
    if (metaDateEl) metaDateEl.textContent = `📅 ${isFr ? art.date_fr : art.date_en}`;
    if (metaReadTimeEl) metaReadTimeEl.textContent = `⏱️ ${isFr ? art.readTime_fr : art.readTime_en}`;
    if (pillsEl) pillsEl.innerHTML = art.pills.map(p => `<span class="pill">${p}</span>`).join('');

    if (contentEl) {
      contentEl.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 40px;">Chargement de l\'article...</p>';
    }

    // Determine target markdown path
    const mdPath = (currentLang === 'en') ? `./${slug}_en.md` : `./${slug}.md`;

    try {
      let res = await fetch(mdPath).catch(() => null);
      if (!res || !res.ok) {
        // Fallback to fr .md
        res = await fetch(`./${slug}.md`).catch(() => null);
      }
      if (!res || !res.ok) throw new Error(`HTTP ${res ? res.status : 'Network Error'}`);

      const mdText = await res.text();
      const htmlText = renderMarkdown(mdText);

      if (contentEl) {
        contentEl.innerHTML = htmlText;
      }
    } catch (err) {
      console.error('Error fetching blog article markdown:', err);
      if (contentEl) {
        contentEl.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 40px;">Impossible de charger l'article (${slug}): ${err.message}</p>`;
      }
    }

    if (feedView) feedView.style.display = 'none';
    if (articleView) articleView.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRoute() {
    currentLang = document.documentElement.getAttribute('lang') || 'fr';
    const hash = window.location.hash.replace(/^#/, '');

    const feedView = document.getElementById('blogFeedView');
    const articleView = document.getElementById('blogArticleView');

    if (!hash) {
      activeSlug = null;
      renderFeed();
      if (feedView) feedView.style.display = 'block';
      if (articleView) articleView.style.display = 'none';
    } else {
      loadArticle(hash);
    }
  }

  function setupLanguageListener() {
    const observer = new MutationObserver(() => {
      const newLang = document.documentElement.getAttribute('lang') || 'fr';
      if (newLang !== currentLang) {
        currentLang = newLang;
        if (activeSlug) {
          loadArticle(activeSlug);
        } else {
          renderFeed();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  function init() {
    currentLang = document.documentElement.getAttribute('lang') || 'fr';
    setupLanguageListener();
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
