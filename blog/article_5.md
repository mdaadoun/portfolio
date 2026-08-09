# L'Évolution du Routage de Modèles et de l'Orchestration Multi-Modèles

Dans le paysage actuel de l'intelligence artificielle, l'époque où l'on s'appuyait sur un seul modèle fondationnel ("un modèle unique pour les gouverner tous") touche à sa fin. À mesure que les applications deviennent plus agentiques et complexes, l'utilisation exclusive des modèles les plus performants (les *frontier models*) se heurte à un mur financier et opérationnel.

Pour les ingénieurs produit IA, le **routage de modèles** (*model routing*) et l'**orchestration multi-modèles** sont devenus des leviers fondamentaux pour optimiser le compromis entre coût, latence et performances.

---

## Part 1. Synthese & Vulgarisation : Comprendre le Routage Multi-Modèles

### Le Constat : L'Hétérogénéité des Capacités (*Jagged Capabilities*)

Un modèle affichant un score élevé sur un benchmark global (comme le codage) n'est pas nécessairement supérieur sur chaque sous-tâche spécifique (par exemple, la visualisation de données ou la manipulation de bibliothèques particulières). Les forces d'un modèle dépendent intimement du corpus de données utilisé lors de son pré-entraînement et de son post-entraînement.

### Le Problème du Routage Naïf

Pendant longtemps, le routage se résumait à une approche simpliste : classifier l'intention de la requête à l'entrée et l'envoyer vers un modèle petit/économique ou grand/puissant. Dans le cadre d'agents exécutant des tâches complexes (ex. développement logiciel), cette approche s'avère extrêmement fragile:

* Les besoins en intelligence évoluent au cours d'une même session.


* Un petit modèle bloqué hors de son domaine d'expertise va tourner en boucle, consommer des outils inutilement et finir par coûter **plus cher** qu'un grand modèle (ex. l'exécution de TerminalBench sur Haiku vs Opus).



### Les Nouveaux Paradigmes de Solutions

Pour dépasser ces limites, l'écosystème évolue vers des architectures d'orchestration hybrides :

1. 
**L'architecture "Sidekick" plutôt que "Sub-agent"** : Un petit modèle gère l'exécution et l'exploration continue en conservant son contexte dans le cache KV, tandis qu'un modèle supérieur supervise l'avancement.


2. 
**Le partage et la compaction de contexte** : Éviter la redondance des tokens transférés entre agents via la réduction d'état, l'accès au système de fichiers local ou des références indirectes.


3. 
**Le co-design Modèle / Harness** : Entraîner ou affiner (*post-training*) spécifiquement des modèles pour qu'ils soient de bons collaborateurs ou délégués.



---

## Part 2. Analyse Chronologique et Technique des Problématiques

---

### 1. La Genèse et la Fragilité des Premiers Routers

* 
**Analyse** : À l'origine, le routage était pensé comme un simple sélecteur statique au niveau de l'API (ex. envoyer une classification texte à un petit modèle, et de la rédaction complexe à un grand modèle).


* 
**Problématique** : L'émergence des workflows agentiques et des signaux réguliers (ex. le mécanisme de *heartbeat* des applications comme OpenClaw) a bouleversé ce schéma. Utiliser un modèle de frontière pour traiter des signaux de présence produit un gaspillage financier massif.


* 
**Solution apportée** : La création de routeurs automatiques adaptés aux différents profils de charge, différenciant les tâches *in-domain* (où les petits modèles excellent à faible coût) des tâches *out-of-domain*.



---

### 2. Le Défi de l'Orchestration Agentique : Modèle Orchestrateur vs Exécuteur

* 
**Analyse** : Comment structurer la collaboration entre un grand modèle (ex. Fable/Opus) et un petit modèle d'exécution?


* 
**Problématique** : Faut-il que l'orchestrateur externe soit le grand ou le petit modèle?


* 
*Si l'orchestrateur est le grand modèle* : Il prend de meilleures décisions de délégation, mais son coût fixe de supervision peut être élevé.


* 
*Si l'orchestrateur est le petit modèle* : Il risque de ne pas détecter quand il est dépassé par la complexité de la tâche.




* **Solution apportée (Devin Fusion & OpenRouter Fusion)** :
* Garder le grand modèle en supervision continue pour valider les étapes clés sans réinjecter l'intégralité du contexte.


* Utiliser des patterns de "Sidekick" qui conservent leur contexte via le cache KV plutôt que de réinstancier des sub-agents à chaque sous-tâche.





---

### 3. Le Mur du Contexte et de la Gestion Mémoire (KV Cache & Compaction)

* 
**Analyse** : Multiplier les agents sur un problème augmente drastiquement la quantité de tokens traités.


* 
**Problématique** : Transmettre l'historique complet d'un petit agent à un grand modèle crée une explosion des coûts et détruit le gain d'efficacité. De plus, au-delà de 100k-200k tokens, la dégradation de l'intelligence (*context degradation*) devient critique.


* **Solution apportée** :
* 
**Context Compaction** : Résumer de manière "lossless" ou hiérarchique l'état de l'agent.


* 
**Fallback sur des systèmes externes** : Utiliser le système de fichiers comme mémoire long-terme pour que le grand modèle ne lise que les fichiers nécessaires sur référence.


* 
**Optimisation KV Cache** : Exploiter les réutilisations de cache (ex. *prefix caching*) pour réduire les coûts d'entrée jusqu'à 90%.





---

### 4. La Détection de Dérive et Sondes de Hallucination (*Probes*)

* 
**Analyse** : Comment déterminer le moment exact où un petit modèle s'égare pour effectuer un passage de relais (*handoff*) vers le grand modèle?


* 
**Problématique** : Attendre qu'un petit modèle génère des milliers de tokens inutiles coûte cher et nuit à la fiabilité.


* **Solution apportée** :
* 
**Sondes d'état interne (*Probes*)** : Analyse de la perplexité, analyse vectorielle de magnitude ou sondes linéaires appliquées sur les états cachés / KV cache du modèle pour évaluer le risque d'hallucination en temps réel.


* 
**Vérification périodique lors du rafraîchissement de cache** : Profiter des fenêtres d'éviction de cache (souvent 5 minutes chez les providers cloud) pour faire un appel rapide d'évaluation par le grand modèle.





---

### 5. L'Infrastructure : Cloud vs Self-Hosted / Edge (ex. DGX Spark)

* 
**Analyse** : La structure des coûts varie radicalement selon le mode de déploiement.


* 
**Problématique** : Les fournisseurs d'API amortissent les usages globaux et imposent des règles strictes sur la durée de rétention du cache KV (ex. 5 min). Sur du matériel dédié ou local (ex. NVIDIA DGX Spark, architectures Rubin), le coût dépend de l'électricité et de l'utilisation mémoire.


* **Solution apportée** :
* 
**Routage Hybride Local/Cloud** : Traiter les données sensibles et les tâches à forte empreinte mémoire en local, puis anonymiser et router les tâches à haute complexité vers le cloud.


* 
**Inference Engines modulaires (FlexRun, Dynamo)** : Isoler des sous-ensembles de poids ou ajuster dynamiquement la taille du modèle selon la complexité perçue du prompt.





---

## Part 3. Critique Technologique & Opportunités Produit

```
[Prompt Utilisateur / Tâche]
       │
       ▼
┌──────────────┐      Sondes (Hallucination/Complexity)
│ Router Logic │ ◄─────────────────────────────────────┐
└──────┬───────┘                                       │
       │                                               │
       ├─── Tâche simple / In-Domain ────────► [ Petit Modèle Exécuteur / Sidekick ]
       │                                               │ (Suivi KV Cache)
       └─── Tâche complexe / Out-of-Domain ──┐         │
                                             ▼         │
                              [ Grand Modèle / Supervisor ] ──┘

```

### 1. La Non-Portabilité des Prompts : Le Goulet d'Étranglement Méconnu

L'une des limites majeures du routage dynamique entre différentes familles d'architectures (ex. Anthropic vs OpenAI vs modèles Open-Source) est la sensibilité aux prompts. Un prompt optimisé pour un grand modèle fonctionnera rarement de manière optimale sur un modèle réduit.

* **Critique** : Les systèmes actuels sous-estiment le coût de translation des instructions entre agents.
* 
**Opportunité Produit** : Développer des mécanismes de *Prompt Tuning* dynamique pilotés par des agents d'auto-recherche (*Auto-research loops*) capables d'adapter la formulation de la consigne à l'architecture cible à partir des traces d'exécution.



### 2. Vers la fin des Harnesses séparés ? Le Co-Design Modèle/Orchestrateur

Aujourd'hui, l'orchestration est principalement gérée au niveau de la couche applicative (le *harness*). Cependant, les modèles de nouvelle génération intègrent de plus en plus des capacités natives de collaboration, de planification et de délégation.

* **Critique** : Séparer strictement le modèle et la logique du router crée un surcoût d'alignement.
* 
**Opportunité Produit** : Entraîner les modèles via RL (*Reinforcement Learning*) spécifiquement pour le rôle d'exécuteur/collaborateur (*Sidekick RL*) ou pour le rôle d'orchestrateur.



---

## Conclusion pour les Ingénieurs Produit IA

Le routage de modèles n'est pas une simple tuyauterie d'infrastructures : c'est un composant d'architecture produit stratégique. Pour bâtir des applications IA durables et rentables :

1. Ne concevez plus vos workflows autour d'un modèle unique.


2. Exploitez la complémentarité des modèles en déléguant l'exploration aux petits modèles tout en maintenant une supervision par un modèle de frontière.


3. Optimisez agressivement votre gestion du contexte (compaction, réutilisation du cache KV, accès aux fichiers) pour éviter la dégradation des performances et l'explosion des coûts.



---

## Sources & Références

Cet article s'inspire des interventions et retours d'expérience du panneau *"The State of Model Routing"* :

1. 
**Cognition** (Créateurs de *Devin* et *Devin Fusion*) — *Walden Yan* 


2. 
**NVIDIA** (Développement des modèles *Neotron*, infrastructure *FlexRun* et *Dynamo*) — *Carter & Dane* 


3. 
**OpenRouter** (Plateforme et routeur auto/fusion multi-modèles) — *Alex* 



---

*Note de transparence : Le contenu de cet article synthétise les concepts abordés lors de la table ronde sur l'état de l'art du routage de modèles (modèles de frontière, optimisation du KV Cache, architectures agentiques)*.