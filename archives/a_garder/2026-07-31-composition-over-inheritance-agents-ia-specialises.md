# L'ère du "Composition over Inheritance" : Pourquoi les agents IA spécialisés sont l'avenir du produit

Dans le monde du développement produit et de l'intelligence artificielle, un consensus tacite s'est installé : pour rendre une IA plus performante, il suffit de lui donner accès à plus d'outils, d'enrichir ses prompts et d'élargir son contexte. Pourtant, cette approche montre déjà ses limites opérationnelles et financières.

Lors d'une intervention remarquée, **Justin Schroeder**, fondateur en mode *stealth* de Standard Agents et créateur de projets open source reconnus (comme Demox ou Aererojs), propose un changement de paradigme fondamental. Nous traversons une accélération majeure de nos capacités de production. Si la révolution industrielle a consisté à apprendre à harnacher l'énergie via des machines, l'ère agentique consiste à **harnacher l'intelligence via des agents**.

En tant qu'ingénieurs produit IA, nous devons nous poser la question : nos architectures actuelles sont-elles réellement viables pour le passage à l'échelle ? Voici une analyse complète du concept de **Domain-Specific Agents (DSA)**, leurs fondements techniques, leurs enjeux économiques et la trajectoire de l'écosystème.

---

## 1. Synthèse et Vulgarisation : Du "Monolithe" aux "Micro-Agents"

Pour comprendre la proposition de valeur des agents spécialisés, il faut d'abord analyser la trajectoire actuelle des architectures IA.

### La Définition d'un Agent

Qu'est-ce qu'un agent ? La frontière entre un "harness" (harnais d'exécution) et un agent est aujourd'hui très poreuse et l'industrie ne s'est pas encore accordée sur une définition exacte. Selon Justin Schroeder, un agent est essentiellement :

> Un logiciel déterministe conçu pour orchestrer et harnacher les résultats non déterministes produits par des modèles de langage (LLM) afin de réaliser un objectif donné.

```
 ┌────────────────────────────────────────────────────────┐
 │                      AGENT / HARNESS                   │
 │  ┌──────────────────────────────────────────────────┐  │
 │  │ Logiciel Déterministe (Orchestration/Règles)     │  │
 │  └────────────────────────┬─────────────────────────┘  │
 │                           │ Appels                      
 │                           ▼                            │
 │  ┌──────────────────────────────────────────────────┐  │
 │  │ Modèle IA (Résultats Non Déterministes)          │  │
 │  └──────────────────────────────────────────────────┘  │
 └───────────────────────────┬────────────────────────────┘
                             │
                             ▼
                    [Objectif Désiré]
```

### Le Problème : L'Inflation du Contexte (L'Héritage)

Aujourd'hui, pour intégrer l'IA aux données d'entreprise, les équipes construisent généralement un agent généraliste monolithique. Pour lui donner de nouvelles capacités, on y empile des briques :

* **Un modèle de base**
* **Un prompt système**
* **Des outils** (ex: via le protocole **MCP** - *Model Context Protocol*)
* **Des *Skills*** (fichiers Markdown faisant office de documentation contextuelle)
* **L'historique des messages**

En ingénierie logicielle, cette approche s'apparente à de l'**héritage** : on surcharge un objet d'attributs pour lui faire exécuter plus de tâches.

Le résultat ? Un contexte saturé. Or, la recherche et l'expérience montrent qu'au-delà d'un certain seuil d'outils ou de documentations injectés, les performances du modèle se dégradent fortement (gaspillage de tokens, hallucinations, pertes d'attention). Donner cent outils à un seul agent ne permettra pas plus de résoudre un problème complexe que de donner cent outils à une seule personne pour envoyer une fusée sur la Lune.

### La Solution : La Composition d'Agents Spécialisés

L'alternative clé réside dans le principe de **"Composition over Inheritance"**. Au lieu d'avoir un grand agent surchargé, on orchestre une **équipe de micro-agents spécialisés dans un domaine strict** (*Domain-Specific Agents*):

1. **Isolation stricte** : Chaque agent possède un prompt système concis dédié à son métier (ex: un agent Figma, un agent Gmail, un agent Salesforce).
2. **Contextes minimes** : Il ne possède que les outils strictly nécessaires et un historique de messages restreint à sa sous-tâche.
3. **Communication en langage naturel** : Un agent coordinateur centralisé interacts avec ces sous-agents en anglais (ou autre langue), déléguant les instructions de manière modulaire.

---

## 2. Anatomie & Architecture d'un Agent Spécialisé Idéal

Pour concevoir un agent spécialisé prêt pour la production, l'architecture doit dépasser le simple prompt avec fonctions. Justin Schroeder détaille la structure idéale d'un agent de domaine :

```
┌────────────────────────────────────────────────────────────────────────┐
│                   STRUCTURE D'UN AGENT DE DOMAINE                      │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Modèle & System Prompt (Rôle spécifique & restreint)                │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Layer d'Outils (Tools)                                              │
│    ├── Functions  (Ex: Écriture fichier, appels API)                   │
│    ├── Prompts    (Ex: Sous-appels à un SLM/modèle d'image type Flux)   │
│    └── Sub-Agents (Agents de domaine spécialisés récursifs)            │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Hooks (Interception/Side-effects, ex: Injection de l'heure)          │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Rules & Guards (Validation des règles de gestion, limites de tours) │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Sandbox Persistante                                                 │
│    ├── File System local isolé                                         │
│    └── Code Execution Sandbox (Exécution sécurisée)                    │
└────────────────────────────────────────────────────────────────────────┘
```

* **Décomposition de la couche d'outils** : Les outils ne sont pas seulement des fonctions exécutables. Ce peuvent être des prompts spécialisés (ex: faire appel temporairement à un modèle de génération d'image) ou même **d'autres agents récursifs**.
* **Utilisation de Hooks** : Permettent de gérer les effets de bord de manière déterministe (ex: injecter dynamiquement la date et l'heure dans l'historique sans surcharger le prompt principal).
* **Règles d'Agent (Rules)** : Encadrement des boucles agentiques (nombre de tours maximum, conditions d'arrêt strictes, validation préalable).
* **Primitives de bac à sable (Sandbox)** : Tout agent doit disposer par défaut d'un **système de fichiers local isolé** et d'un **environnement d'exécution de code sécurisé**.

---

## 3. Déroulé Chronologique et Tendances Économiques (2024-2027)

L'adoption des agents spécialisés s'inscrit dans un calendrier serré, tiré par des contraintes techniques et économiques majeures.

```
2024 - 2025                    Mi-2026                    Fin 2026                    2027
     │                            │                          │                         │
     ├── Explosion de l'héritage  ├── Retournement des couts  ├── Émergence massive     └── Année de
     │   (MCP, Skills, Prompts)   │   (Tokens +76% / +29% IQ)│   des frameworks DSA    l'orchestration
     │                            │                          │                         multi-agents
```

### Chronologie des faits et prédictions

* **2024 - Début 2026 : L'ère de l'héritage et des frustrations en entreprise** Les entreprises essayent de développer leurs propres agents sur mesure. Face à la complexité d'orchestration (boucle agentique, tolérance aux pannes, manque de portabilité), beaucoup refluent vers des architectures d'outils partagés comme le protocole MCP d'Anthropic. Cependant, MCP s'impose surtout comme un standard d'injection d'outils et ne résout pas la gestion de la complexité ou de la mémoire.
* **Mi-2026 : L'inflection des coûts et la prise de conscience (Aujourd'hui)** Contrairement à la croyance populaire selon laquelle le coût de l'intelligence artificielle baisserait indéfiniment, les données de 2026 montrent une inversion de tendance:
  * Le coût moyen des tokens est en **hausse de 76%** sur l'année.
  * Ajusté au niveau d'IQ des modèles, le coût reste en **hausse de 29%**.
  * Les tensions sur les infrastructures et la mémoire vive (*memory crunch*) imposent une contrainte budgétaire forte.
  * *Événement repère* : Vercel publie le framework **Eve**, introduisant publiquement le terme et l'architecture de *Domain-Specific Agents*.
* **Fin 2026 (Prédiction) : L'accélération des frameworks DSA** Montée en puissance massive de frameworks dédiés à la création et au packaging d'agents spécialisés.
* **2027 (Prédiction) : L'année de l'orchestration multi-agents** Standardisation de la coordination d'agents spécialisés autonomes collaborant en réseau.

---

## 4. Analyse Critique & Synthèse Produit

Pour un Lead Developer ou un Head of AI Product, la vision défendue par Justin Schroeder présente des avantages majeurs, mais soumet l'organisation à de nouveaux défis d'ingénierie.

### Tableau comparatif : Agent Généraliste vs. Réseau d'Agents de Domaine

| Dimension | Agent Généraliste Monolithique | Architecture Agents de Domaine (DSA) |
| --- | --- | --- |
| **Gestion du Contexte** | Surchargé (Prompts + MCP + Skills) | Hyper-réduit et ciblé |
| **Efficacité Token** | Faible (fenêtres de contexte massives) | **> 80% d'efficacité** sur les tâches |
| **Modèles Requis** | SOTA coûteux (ex: Claude 3.5 Sonnet / Fable 5) | **SLM / Modèles légers** (ex: DeepSeek V4 Flash) |
| **Coût par exécution** | Très élevé (jusqu'à x137 de différence) | Drastiquement réduit |
| **Sécurité & IT** | Permis trop larges / Risques de fuites | Per-agent sandboxing & Portée limitée (Validé IT) |
| **Composabilité** | Nulle / Difficilement portable | Forte (agents packagés et réutilisables) |

### Avantages Majeurs

1. **L'équation économique de l'IA applicative** : Utiliser un modèle haut de gamme (*SOTA*) pour des requêtes simples est financièrement insoutenable à grande échelle ou pour du B2C. L'approche DSA permet d'exploiter de petits modèles spécialisés (*Small Language Models* - SLM), réduisant jusqu'à 137 fois le coût d'exécution par tâche.
2. **Sérénité pour les départements IT (Gouvernance & Sécurité)** : L'un des plus grands freins au déploiement des agents en entreprise réside dans le sur-privilège des agents de codage ou d'entreprise. Un agent spécialisé à périmètre clos et restreint à sa sandbox rassure immédiatement les équipes de sécurité informatique.
3. **Parallélisation et Portabilité** : Chaque micro-agent disposant de sa propre boucle d'exécution, ils peuvent être exécutés en parallèle sur le cloud sans nécessiter d'architectures réseau lourdes (*VPC*).

### Limites et Défis Techniques

* **Le coût de l'orchestration (Overhead)** : Remplacer un prompt unique par une hiérarchie d'agents implique la gestion d'un routeur/coordinateur central. Si l'orchestration est mal conçue, la latence accumulée par les échanges en langage naturel entre sous-agents peut dégrader l'expérience utilisateur.
* **La rigueur de la décomposition des tâches** : La création de DSA impose un travail de découpage du domaine applicatif rigoureux en amont. On ne peut plus s'en remettre au "magique" d'un modèle SOTA pour comprendre un besoin mal défini.

---

## Conclusion

L'analogie avec le programme Apollo résume parfaitement l'enjeu : l'humanité n'est pas allée sur la Lune en donnant une caisse à outils géante à un seul astronaute. Elle y est parvenue grâce à des équipes d'experts ultra-spécialisés, disposant chacun de leurs propres instruments et communiquant entre eux.

Pour les ingénieurs IA, le passage à l'échelle en 2026/2027 ne se fera pas par l'augmentation infinie des contextes, mais par **la rigueur de la composition logicielle**.

---

## Sources et Références

* **Justin Schroeder**, *"The Future Is Domain-Specific Agents"*, Conférence / Intervention pour Standard Agents (`standardagents.ai`).
* **Projets cités** : *Demox* (multiplexeur d'agents de code), *Aererojs* (Framework UI pour l'ère agentique), *Vercel Eve* (Framework d'agents).
* **Projets & Protocoles mentionnés** : *MCP (Model Context Protocol)*, *Vercel AI SDK*.