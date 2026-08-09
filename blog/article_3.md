# Concevoir des Agents IA Autonomes à Long Horizon : Guide d'Architecture et d'Ingénierie Produit

Aujourd'hui, la majorité des agents IA peinent à dépasser des tâches ponctuelles ou du simple *text-in/text-out*. Si le développement logiciel à assistance IA a rapidement progressé, orchestrer un agent autonome capable d'exécuter des flux métiers complexes pendant plusieurs heures, voire plusieurs jours, reste un défi majeur d'ingénierie.

Pour comprendre comment construire ces agents dits **« à long horizon »** (*long-horizon agents*), nous nous appuyons sur le retour d'expérience de Mitch Troyanovsky, cofondateur de **Basis** (une licorne IA spécialisée dans l'automatisation complète de la comptabilité et des déclarations fiscales).

---

## 1. Vulgarisation : Qu'est-ce qu'un Agent à Long Horizon ?

Pour un ingénieur produit IA, la définition d'un agent ne réside pas dans une catégorification binaire, mais dans un **spectre d'autonomie**.

Un agent est un système basé sur l'inférence doté du pouvoir décisionnel (*agency*) d'interagir avec son environnement via des outils.

* 
**Court horizon :** L'agent effectue une recherche simple (ex. consulter la météo) et boucle en un ou deux appels d'outils sans avoir besoin de maintenir un état cohérent sur la durée.


* 
**Long horizon :** L'agent doit résoudre une tâche complexe (ex. produire une déclaration fiscale complète de type Form 1065 ou construire un modèle d'ingénierie complexe ). Il opère pendant 20 minutes, plusieurs heures, voire des jours , exécutant des milliers d'étapes d'inférence.



### La contradiction fondamentale des LLM

Les modèles de langage actuels disposent d'une **très grande mémoire de travail** (la fenêtre de contexte). Cependant, ils sont dépourvus de **mémoire à court ou long terme intrinsèque**. Dès que l'exécution dépasse la capacité du contexte ou rencontre un phénomène de « dégradation de contexte » (*context rot*) , le modèle perd sa cohérence s'il n'est pas guidé par un harnais logiciel (*harness*) structuré.

---

## 2. Déroulé Chronologique Détaillé de l'Agentique (2022 - 2026)

Pour concevoir les architectures d'aujourd'hui, il convient de retracer les étapes clés de l'évolution des agents IA.

```
2022: Framework ReAct (Raisonnement + Action)
  │
2023: Expérimentations BabyAGI (Limites des fenêtres de contexte & erreurs cumulatives)
  │
2023: Supervision par le Procédé ("Let's Verify Step by Step" - OpenAI)
  │
2024: Ruptures Contextuelles & Modèles de Raisonnement (Claude 3 Opus, OpenAI o1/o3)
  │
2025-2026: Consolidation des Spécifications de Comportement (Behavior Specs & RLVR)

```

### 2022 — Le Framework ReAct

L'article fondateur sur **ReAct** (*Reasoning and Acting*) formalise la boucle fondamentale de l'agentique : l'alternance entre une étape de réflexion (pensée) et une étape d'exécution (action via un outil). Si cette théorie reste la base de tous les agents modernes , elle se limitait à l'époque à des trajectoires très courtes.

### 2023 — L'ère BabyAGI et les Erreurs Cumulatives

L'émergence de projets comme **BabyAGI** a démontré le potentiel des boucles autonomes, mais s'est rapidement heurtée à un mur pratique.

* 
**Fenêtres de contexte restreintes :** Avant l'arrivée des contextes longs, la mémoire s'épuisait très vite.


* 
**Erreurs cumulatives (*Compounding Errors*) :** Une seule décision erronée au token $N$ altérait irréversiblement toute la suite de la trajectoire, sans capacité d'auto-correction (*self-healing*).



### 2023 — Supervision par le Procédé vs Supervision par le Résultat

En mai 2023, OpenAI publie le papier *"Let's Verify Step by Step"*. Les chercheurs démontrent qu'en récompensant chaque étape intermédiaire de raisonnement (supervision du procédé) plutôt que seulement le résultat final, la précision globale augmente considérablement sur des problèmes complexes comme les mathématiques. Cependant, étiqueter manuellement 800 000 étapes de raisonnement s'est avéré extrêmement coûteux.

### 2024-2026 — L'avènement des Modèles de Raisonnement et de l'Inférer Longue Durée

Trois ruptures majeures ont transformé le paysage :

1. 
**Claude 3 Opus :** Le premier modèle capable de maintenir une attention et une compréhension réelles sur des contextes de plus de 80 000 tokens.


2. 
**OpenAI o1 & o3 :** L'introduction du scaling du calcul au moment de l'inférence (*inference-time compute scaling*). Le modèle adapte son temps de réflexion selon la difficulté de l'étape, permettant une auto-correction efficace.


3. 
**RLVR (*Reinforcement Learning from Verifiable Rewards*) :** Popularisé par la suite (notamment dans DeepSeek R1), le RLVR a permis d'entraîner le raisonnement via des gratifications vérifiables sans dépendre exclusivement d'une annotation humaine étape par étape.



---

## 3. Pourquoi les Agents Échouent Hors du Génie Logiciel

Beaucoup d'ingénieurs produit transposent directement les méthodes de l'IA pour le code vers d'autres secteurs métiers. C'est une erreur méthodologique majeure.

| Facteur d'Évaluation | Ingénierie Logicielle / Code | Métiers Réels (Ex: Comptabilité, Droit) |
| --- | --- | --- |
| **Vérifiabilité au Runtime** | Immediate (Exécution des tests, compilation) 

 | Longue ou absente (Pas de compilateur natif) 

 |
| **Feedback Loop** | Très court (quelques secondes à minutes) 

 | Très long (des heures de travail métier) 

 |
| **Données d'Entraînement** | Abondantes (repos GitHub public, StackOverflow) 

 | Rares et hautement confidentielles 

 |
| **Propriété des Données de Runtime** | Détenue par l'utilisateur final (Codebase client) 

 | Détenue par la plateforme d'IA (Ontologie propriétaire) 

 |

### Les 3 pièges de l'évaluation par les résultats (*Outcome-Based Evals*)

Dans les processus complexes (comme la préparation d'une liasse fiscale de 1 000 documents) , se fier uniquement au résultat final (*Outcome*) est dangereux:

1. 
**L'illusion des tests réussis :** Un agent peut réussir 100/100 évals synthétiques en utilisant un mauvais raisonnement (ex: en lisant un article de blog ou Wikipedia au lieu de vérifier les sources légales du fisc).


2. 
**Non-généralisation en production :** Réussir un jeu de données de test ne garantit pas la fiabilité sur les cas limites (*edge cases*) réels.


3. 
**Absence de signal d'apprentissage :** Si une trajectoire de 3 000 étapes échoue au résultat final, attribuer la faute à une étape spécifique est quasi impossible sans signal intermédiaire.



---

## 4. Solutions Architecturales : Du Procédé aux Ontologies

Pour résoudre ces problèmes, Basis propose une méthodologie d'ingénierie centrée sur les **Spécifications de Comportement** (*Behavior Specs*) et les **Ontologies**.

### A. Les Spécifications de Comportement (*Behavior Specs*)

Plutôt que d'attendre la fin de la trajectoire, vous définissez en amont dans des fichiers Markdown des règles de comportement et des grilles d'évaluation (*rubrics*).

```markdown
# Behavior Spec: Verification of Tax Research Primary Sources

## Condition
The agent needs to answer a technical tax regulation question.

## Expected Behavior
1. The agent MUST search and cite the official government code (e.g., IRS tax code).
2. The agent MUST NOT rely solely on third-party blogs or pre-training knowledge.
3. If uncertainty exists, spawn a specialized sub-agent for deep verification.

```

> 
> **Note clé d'ingénierie :** Ces *Behavior Specs* ne sont pas injectées directement dans le prompt de l'agent pour éviter d'engorger son contexte. Elles servent de **référentiel pour des agents Juges** (*Judge Agents*) qui analysent la trajectoire au runtime ou à l'évaluation pour vérifier le respect du procédé métier.
> 
> 

### B. L'Analogie du film *Memento* et la Gestion du Contexte

Un LLM au sein d'un agent autonome est à l'image du personnage principal du film *Memento* : il se réveille chaque jour sans mémoire à court ou long terme, mais doté de sa culture générale (le pré-entraînement).

Pour progresser sans perdre le fil, l'agent doit:

* Rédiger des notes structurées pour son « moi futur ».


* Compacter son historique d'exécution de manière à maximiser la densité d'information.


* Déployer des sous-agents dédiés pour isoler certaines sous-tâches et éviter la pollution de la fenêtre de contexte principale.



### C. L'Ontologie comme Système de Fichiers Virtuel

Pour maintenir un état persistant sur plusieurs jours ou mois, l'agent doit évoluer au sein d'une **ontologie métier**.

```
/ontologie_metier/
├── /canonical/          <-- Documentation immuable & règles métiers valides
├── /lived_experience/   <-- Logs compactés des exécutions passées de l'agent
├── /artifacts/          <-- Documents générés (Excels, PDF, captures de contrôle)
└── /graph_relations/    <-- Relations conceptuelles entre les entités

```

Dans ce système, le texte en anglais structuré (*Markdown*) est traité avec le même niveau de rigueur qu'un codebase logiciel. Une modification mineure dans un paragraphe de documentation canonique peut casser le comportement d'un agent tout comme un bug de syntaxe dans du code Python.

---

## 5. Synthèse et Critique d'Ingénierie IA

### Analyse Critique : Risques et Compromis

1. 
**Le Surcoût des Juges :** Évaluer les trajectoires par des *Behavior Specs* implique de faire tourner des agents Juges sur des historiques de milliers de tokens. Le coût en calcul au moment de l'évaluation peut vite devenir prohibitif en production.


2. 
**Le Défi du *Move 37* vs la Conformité Métier :** En imposant des règles de comportement strictes (imitation des processus humains) , on supprime la possibilité qu'une IA découvre une méthode radicalement plus efficace (un coup de type « Move 37 » d'AlphaGo). Cependant, dans des métriques réglementées comme la comptabilité ou la médecine, la prédictibilité et la confiance de révision surpassent la créativité.


3. 
**Le Choc de la *Bitter Lesson* :** L'effort massif investi aujourd'hui dans l'ingénierie de contexte (*context engineering*) et le découpage manuel de harnais sera-t-il obsolète d'ici 2 à 5 ans? Il est probable que les futurs modèles de fondation absorbent nativement ces capacités d'orchestration. Mais pour les entreprises produisant de l'IA applicative aujourd'hui, attendre la solution native des labs n'est pas une option commerciale viable.



### L'Émergence de Nouveaux Rôles Produit

Le développement d'agents à long horizon modifie la composition des équipes IA. Deux rôles émergent:

* 
**Architectes de Langage / Context Engineers :** Des profils dotés d'une forte pensée systémique (*systems thinking*), souvent issus du droit, de la philosophie ou de l'architecture logicielle. Ils écrivent les abstractions en langage naturel destinées à être interprétées par le LLM au runtime.


* 
**Équipes de Déploiement d'Intelligence (*Deployed Intelligence - DI*) :** Des équipes chargées d'accompagner la transformation organisationnelle des clients lors de l'intégration d'agents équivalents à « 300 collaborateurs IA ».



---

## Conclusion pour l'Ingénieur IA

Rappelez-vous que les fossés technologiques (*technical moats*) sont temporaires ; seuls les fossés d'usage et de workflow (*business moats*) persistent. Ne cherchez pas le modèle magique : construisez le harnais logiciel, l'ontologie et le système de vérification par le procédé qui permettront à vos agents de devenir des collaborateurs fiables et autonomes sur le long terme.

---

## Sources & Références

Les informations et concepts de cet article sont directement issus des réflexions de **Mitch Troyanovsky** (cofondateur de **Basis**) partagées lors de son passage sur le podcast *Mad Podcast* animé par Matt Turk:

* 
**Podcast Source :** *How to Build Long-Horizon AI Agents — Mitch Troyanovsky, Basis* (Présenté par Matt Turk sur le *Mad Podcast*).


* 
**Projet Open Source associé :** Norme de *Behavior Specs* développée en collaboration entre Basis et BrainTrust.


* 
**Travaux de recherche cités :** OpenAI - *"Let's Verify Step by Step"* (2023); Framework ReAct (2022); Recherches RLVR / DeepSeek R1.