# L'Ère des *Harnesses* et des *Deep Agents* : La Nouvelle Stack des Agents IA Expliquée

Depuis fin 2024 et début 2025, l'écosystème de l'intelligence artificielle a franchi un cap décisif . Nous sommes passés de l'ère des simples "prompts" et des chaînes rigides à celle des **agents autonomes à long horizon** (*long horizon agents*).

Pour les ingénieurs produit IA, cette mutation redéfinit les fondations technologiques : l'enjeu ne consiste plus seulement à choisir un modèle de langage (LLM), mais à concevoir le **harness** (le "harnais" ou la structure d'orchestration) et l'**environnement de suivi** indispensables pour exploiter ces modèles en production.

---

## Part 1. Vulgarisation & Synthèse : Comprendre le Changement de Paradigme

### 1. Du Prompt à l'Agent : De quoi parle-t-on ?

Historiquement, un système d'IA générative fonctionnait de manière synchrone : une question en entrée, une réponse en sortie. Un **agent**, à l'inverse, est une boucle dans laquelle un LLM prend des décisions, évalue son travail, utilise des outils (exécuteurs de code, requêtes d'API, recherches web) et interagit avec son environnement pour accomplir un objectif complexe .

### 2. Qu'est-ce qu'un *Harness* (Harnais d'Agent) ?

Le *harness* représente l'infrastructure logicielle qui entoure le LLM pour lui permettre d'interagir avec le monde extérieur de manière autonome. Harrison Chase résume le harnais moderne autour de **4 briques fondamentales**:

```
+-----------------------------------------------------------------------+
|                            AGENT HARNESS                              |
|                                                                       |
|  +--------------------+                     +----------------------+  |
|  |   System Prompt    |                     |    Planning Tool     |  |
|  |  (Directives &     |                     | (Scratchpad mental,  |  |
|  |   instructions)    |                     |  gestion des tâches) |  |
|  +---------+----------+                     +----------+-----------+  |
|            |                                           |              |
|            +------------------+------------------------+              |
|                               |                                       |
|                               v                                       |
|                     +-------------------+                             |
|                     |     LLM Loop      |                             |
|                     +---------+---------+                             |
|                               |                                       |
|            +------------------+------------------------+              |
|            |                                           |              |
|            v                                           v              |
|  +--------------------+                     +----------------------+  |
|  |    Sub-Agents      |                     |     File System      |  |
|  | (Isolation du      |                     | (Gestion de la       |  |
|  |  contexte & tâches)|                     |  mémoire & context)  |  |
|  +--------------------+                     +----------------------+  |
+-----------------------------------------------------------------------+

```

* 
**Le System Prompt dynamique :** Consignes de cadrage et modes d'opération (via des fichiers comme `CLAUDE.md` ou `agent.md`) .


* 
**L'outil de planification (*Planning Tool*) :** Un bloc-notes mental (*scratchpad*) permettant à l'agent de suivre et d'ajuster ses étapes au fil du temps .


* 
**Les Sous-Agents (*Sub-Agents*) :** L'isolation des contextes pour déléguer des tâches complexes sans encombrer la mémoire de travail de l'agent principal .


* 
**Le Système de Fichiers (*File System*) :** Un espace d'E/S permettant à l'agent de gérer lui-même son propre contexte (ex. sauvegarder des sorties de 60 000 tokens plutôt que de les injecter directement dans le prompt) .



### 3. La Convergence : "Tout agent devient un agent de code"

L'un des constats majeurs fait par LangChain est la divergence entre deux types d'agents  :

1. 
**Les agents conversationnels :** Axés sur la très faible latence (voix, service client), nécessitant peu d'appels d'outils.


2. 
**Les agents à long horizon (*Long Horizon Agents*) :** Capables de planifier, d'exécuter des actions complexes et d'écrire/exécuter du code Bash ou Python .



Pour ces derniers, l'utilisation du code s'est imposée comme le canal universel d'action . Plutôt que de faire 100 appels d'outils (API) individuels, l'agent écrit un script Python pour itérer sur 100 fichiers, réduire la latence et traiter la donnée efficacement .

---

## Part 2. Déroulé Chronologique Détaillé de l'Évolution des Agents

```
2022                          2023                        2024 / Début 2025               Dernières évolutions
  |                             |                                 |                                  |
  +--- V0 (LangChain)           +--- L'ère de la Scaffolding      +--- L'Émergence des Harnesses     +--- Proactive & Async
  |    • Papiers ReAct           |    • LangGraph                  |    • Claude Code, Manus          |    • Agents toujours actifs
  |    • AutoGPT                 |    • Déterminisme requis        |    • Deep Agents                 |    • Identité & Autonomie
  |    • Modèles trop faibles    |    • Contrôle par les graphes   |    • Modèles capables de tourner |    • Neatron & Open Source
  |                              |                                 |      en boucle                    |

```

### Étape 1 : Les débuts naïfs (Fin 2022 - Début 2023)

* 
**Les Primitives :** LangChain naît fin 2022 juste avant ChatGPT. Les concepts de base s'appuient sur le papier *ReAct* (exécuter le LLM dans une boucle et appeler des outils).


* 
**L'Échec en Production :** Des projets comme AutoGPT tentent l'autonomie totale. Cependant, les modèles de l'époque (ex. GPT-3.5 ou les premiers DaVinci) manquent de robustesse, dérivent rapidement et s'enferment dans des boucles infinies .



### Étape 2 : L'ère de la rigidité et des graphes (2023 - Mi-2024)

* **L'Échafaudage (*Scaffolding*) :** Face à l'imprévisibilité des LLMs, l'industrie réagit en créant des structures très encadrées.
* 
**LangGraph :** LangChain introduit LangGraph pour construire des workflows sous forme de graphes orientés . Le déterminisme est réinjecté artificiellement dans les systèmes : l'agent conserve une part d'autonomie locale, mais le flux de travail reste strictement guidé .



### Étape 3 : La révolution des *Harnesses* et des *Deep Agents* (Fin 2024 - Début 2025)

* 
**Le Déclic des Modèles :** L'arrivée de modèles de frontière beaucoup plus intelligents et performants en génération de code (ex. Claude 3.5 Sonnet, Claude 3.7 Opus, Qwen-Coder) change la donne .


* 
**L'apparition des produits phares :** Des outils comme Claude Code, Manus ou Deep Research démontrent qu'un LLM doté d'un bon *harness* (accès au système de fichiers, exécution de code Bash, gestion de sous-agents) peut exécuter des tâches complexes de plusieurs heures sans dériver.


* 
**Lancement de Deep Agents :** LangChain formalise ce pattern en publiant *Deep Agents*, une bibliothèque open-source agnostique qui offre cette structure universelle clés en main .



### Étape 4 : Le présent et le futur proche (Courant 2025 - 2026)

* 
**Sous-agents Asynchrones :** Les sous-agents ne sont plus bloquants ; un orchestrateur lance des sous-agents en arrière-plan et interagit de façon fluide avec l'utilisateur .


* **Agents Événementiels et Toujours Actifs (*Proactive / Always-on*) :** Les agents n'attendent plus un prompt de l'utilisateur. Ils écoutent des événements d'entreprise (emails, Slack, webhooks) et agissent de manière proactive avec un humain dans la boucle .


* 
**Identité et Mémoire Persistante :** Passage du modèle *"Acting on behalf of"* (l'agent utilise les credentials de l'utilisateur) vers des **Identités d'Agents dédiées** (un agent nommé "Tom", disposant de ses propres comptes, de son budget et de sa mémoire d'entreprise) .



---

## Part 3. Analyse Critique & Ingénierie Produit

### 1. La Tension : Autonomie (*Deep Agents*) vs Contrôle (*LangGraph*)

Le grand dilemme des équipes produit IA réside dans le curseur de l'autonomie.

```
+-------------------------------------------------------------------------+
|                    AUTONOMIE VS CONTRÔLE DANS LES AGENTS                |
|                                                                         |
| High  ^                                                                 |
|       |                                          DEEP AGENTS            |
|       |                                    (Autonomie basée sur LLM,    |
|       |                                    harnais généraliste,       |
|       |                                    idéal Startups / R&D)       |
| A     |                                           * |
| U     |                                                                 |
| T     |                                                                 |
| O     |                                                                 |
| N     |                                                                 |
| O     |           LANGGRAPH                                             |
| M     |     (Workflows supervisés,                                      |
| I     |      graphes déterministes,                                     |
| E     |      idéal Secteurs Régulés)                                    |
|       |            * |
| Low   +---------------------------------------------------------------> |
|       Low                       PRÉCISITÉ / CONTRÔLE              High  |
+-------------------------------------------------------------------------+

```

* **Le Mode *Deep Agent* (100% Autonome) :** Vous fournissez des outils, des consignes système et un environnement. Le modèle décide de tout.


* 
*Avantage :* Extrêmement flexible, capable de résoudre des problèmes imprévus .


* *Critique :* Comportement non déterministe. Risque de boucles coûteuses et d'imprévisibilité des sorties.




* 
**Le Mode *Graph Workflow* (LangGraph) :** Vous définissez explicitement l'ordre des étapes (Étape A -> Valider -> Étape B).


* 
*Avantage :* Indispensable dans les industries très régulées (Finance, Santé, Cybersécurité) où un échec de conformité est inacceptable .


* *Critique :* Rigidité. Nécessite une maintenance importante dès que l'environnement change.



> **Recommandation Produit :** Ne jetez pas la rigidité trop vite. La plupart des architectures d'entreprise gagnent à utiliser un orchestre déterministe (LangGraph) qui délègue des sous-tâches spécifiques à des harnais autonomes (*Deep Agents*) .
> 
> 

---

### 2. Le Vrai Défi : La Mémoire et l'Ingénierie du Contexte

Un contresens fréquent chez les développeurs est de croire que la mémoire d'un agent se résume à une base de données vectorielle (RAG). L'analyse de Harrison Chase montre qu'il faut distinguer **trois types de mémoire**:

| Type de Mémoire | Description Technique | Implémentation dans les Harnais |
| --- | --- | --- |
| <br>**Sémantique** (*Facts*) 

 | Faits et connaissances générales sur le domaine ou l'utilisateur.

 | RAG, bases vectorielles, bases de données relationnelles.

 |
| <br>**Épisodique** (*History*) 

 | Historique des conversations et interactions passées.

 | Fichiers de logs, recherche dans les sessions antérieures.

 |
| <br>**Procédurale** (*Instructions*) 

 | <br>**La plus stratégique.** Règles métier sur *comment* effectuer une tâche .

 | Fichiers Markdown (`skills.md`), consignes du prompt modifiables par l'agent .

 |

#### La compaction du contexte (*Context Compaction*)

Puisque la fenêtre de contexte n'est ni infinie ni gratuite, l'agent doit apprendre à la compacter . Les approches modernes ne se contentent plus de couper le texte quand il atteint 80% du buffer :

1. Elles conservent intactes les $N$ dernières interactions (ex. les 10 derniers messages).


2. Elles résument le reste et l'écrivent dans un **système de fichiers virtuel**.


3. Si le LLM a besoin du détail brut plus tard, il exécute des commandes type `grep` ou `glob` pour relire le fichier d'historique.



---

### 3. Modèles Frontier vs Modèles Open Source : Stratégie de Coût

Une erreur stratégique coûteuse consiste à tout faire tourner sur les derniers modèles propriétaires (Claude 3.7 Opus, GPT-4o) .

* 
**Le problème du "Proactif / Always-On" :** Si un agent s'exécute toutes les 10 minutes ou écoute un flux continu d'événements d'entreprise, les coûts d'API de modèles propriétaires explosent de manière insoutenable .


* **La solution hybride / Multi-Agents :**
* 
**Le Modèle Chef d'Orchestre (Frontier Model) :** Un modèle propriétaire de premier plan gère le découpage des tâches et la planification haut niveau .


* 
**Les Sous-Agents Spécialisés (Open Source / Fine-Tuned) :** Des modèles open-source exécutés en local ou sur infrastructure dédiée (ex. familles Neatron, Qwen-Coder, Llama) s'occupent de tâches précises (exécutions de code, extraction, formatage) à coût quasi-nul .





---

### 4. Sandbox & Sécurité : Le Runtime de l'Agent

Dès lors qu'un agent écrit et exécute son propre code, la question de l'environnement d'exécution (*runtime*) devient centrale . Deux architectures s'opposent actuellement dans la communauté  :

```
    Option A : Agent DANS la Sandbox             Option B : Agent HORS de la Sandbox (Recommandé)
    
  +-----------------------------------+        +-----------------+      +-----------------+
  | Sandbox (ex. Daytona, Mac Mini)   |        | Orchestrateur   |      | Sandbox         |
  |                                   |        | / Agent         | ---> | (Isolation      |
  |  [ Agent Harness + Runtime Code ] |        | (LangChain/Host)| Outil|  Stricte)       |
  +-----------------------------------+        +-----------------+      +-----------------+

```

1. 
**Agent DANS la Sandbox (Option A) :** L'agent complet et son harnais sont déployés à l'intérieur d'un conteneur isolé (ex. Mac Mini ou Sandbox Cloud type Daytona) .


2. 
**Agent HORS de la Sandbox (Option B - Approche recommandée) :** L'orchestrateur de l'agent réside sur un serveur sécurisé et considère la Sandbox uniquement comme un outil distant d'exécution de code .


* 
*Avantage Sécurité :* Cela évite de stocker les clés d'API (OpenAI, Anthropic) dans le même environnement d'exécution que le code non supervisé rédigé par l'agent, protégeant ainsi le système contre les attaques par **Prompt Injection** .





---

### 5. Méthodologie : *Evaluation-Driven Development* (EDD)

Construire un agent sans suite d'évaluation systématique est l'assurance d'échouer en production. En raison de la nature non déterministe des LLMs, un changement mineur dans un prompt ou dans la définition d'un outil peut détruire 20% des performances du système sans avertissement.

#### Comment démarrer l'EDD ?

* 
**Ne cherchez pas 1 000 scénarios au départ :** Commencez avec **5 à 10 cas d'usage réels** représentatifs de ce que l'agent doit et ne doit pas faire .


* 
**Évolution vivante du Dataset :** Dès qu'un utilisateur en production rencontre un comportement inattendu ou un bug, ce cas est transformé en un nouveau cas de test dans la suite d'évaluation (sur une plateforme comme LangSmith).


* 
**Cycle de réécriture :** Harrison Chase avertit que dans ce secteur, **la stack d'un agent doit être réévaluée ou réécrite tous les 9 à 12 mois** pour intégrer les nouvelles capacités des modèles et des harnais .



---

## Conclusion & Synthèse pour l'Ingénieur IA

Le rôle de l'ingénieur IA passe progressivement du "Prompt Engineering" à l'**Ingénierie de Harness et d'Environnement** (*Context & Harness Engineering*).

* 
**Ce qui change constamment :** Les frameworks d'orchestration haut niveau, la syntaxe des prompts et les modèles de fondation .


* **Ce qui reste pérenne (Vos actifs stratégiques) :**
1. Vos **outils métier précis** (exposés via des standards comme MCP) .


2. La **mémoire procédurale** de vos domaines (la formalisation de vos processus sous forme de consignes et règles métier) .


3. Vos **jeux de données d'évaluation** (*Eval Datasets*).





---

## Sources & Inspirations

Cet article a été rédigé en s'appuyant sur l'analyse des interventions de Harrison Chase (CEO et co-fondateur de LangChain) :

1. **NVIDIA AI Podcast (Ep. 297) :** *Harrison Chase of LangChain on Deep Agents, LangSmith, and Earning Trust*.
2. **The MAD Podcast avec Matt Turk :** *Everything Gets Rebuilt: The New AI Agent Stack*.
3. **Daytona Compute Conference :** *Harrison Chase: Everything Gets Rebuilt: Agents, Harnesses, and the New Compute Layer*.