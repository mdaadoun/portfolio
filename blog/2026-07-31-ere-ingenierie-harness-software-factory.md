## L'Ère de l'Ingénierie de Harness : Construire la Software Factory Agentique

---

### Résumé Éxécutif : Le Changement de Paradigme

Pendant des décennies, l'optimisation du développement logiciel s'est concentrée sur la vitesse de frappe et l'assistance ponctuelle des développeurs. L'émergence des agents de codage autonomes (comme Claude Code, Codex ou Gemini) déplace le goulot d'étranglement de l'écriture du code vers la revue, la vérification et l'architecture.

Ce passage d'un modèle interactif (chat) à un modèle asynchrone gouverné par des règles donne naissance à la **Software Factory** (Usine Logicielle). Dans cette vision, le produit final n'est plus rédigé à la main par des humains, mais généré et maintenu par un système d'agents. Les ingénieurs produit IA évoluent vers un rôle de concepteur de systèmes et d'outillage interne.

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │                         BOUCLE META (Meta Loop)                        │
  │     (Apprentissage continu, détection des patterns, ajustement)        │
  │                                                                        │
  │     ┌────────────────────────────────────────────────────────────┐     │
  │     │                 BOUCLE EXTERNE (Outer Loop)                │     │
  │     │           (Revue de PR, CI/CD, Agent QA, Verifiers)       │     │
  │     │                                                            │     │
  │     │     ┌────────────────────────────────────────────────┐     │     │
  │     │     │           BOUCLE INTERNE (Inner Loop)          │     │     │
  │     │     │    (Iteration locale de l'agent, Linter,     │     │     │
  │     │     │        Tests unitaires, Skills/Plugins)        │     │     │
  │     │     └────────────────────────────────────────────────┘     │     │
  │     └────────────────────────────────────────────────────────────┘     │
  └────────────────────────────────────────────────────────────────────────┘
```

---

## Part I. Analyse Approfondie : Les Composants d'une Software Factory

Pour orchestrer des agents sans tomber dans le piège de la dégradation massive du code, la pratique repose sur une nouvelle discipline : l'**Ingénierie de Harness** (ou *Loop Engineering*). Elle se découpe en trois piliers stratégiques et trois boucles d'itération.

### 1. Les Trois Piliers d'Évaluation

* **L'Autonomie** : Capacité d'un agent à exécuter une tâche sur une durée prolongée (30 à 40 minutes) sans intervention ni correction humaine.
* **L'Automatisation** : Degré d'indépendance accordé aux agents pour modifier le système sans supervision directe. Une équipe peut posséder des agents à haute autonomie mais appliquer une faible automatisation par manque de confiance envers les résultats.
* **La Qualité** : Mesure de la robustesse, de l'accessibilité, de la sécurité et de la maintenabilité du code généré. Contrairement aux idées reçues, l'objectif d'une Software Factory mature n'est pas d'accepter une baisse de qualité contre du volume, mais d'augmenter la qualité globale grâce à une capacité d'inspection continue impossible pour un humain.

---

### 2. L'Architecture des Boucles d'Amélioration (Loops)

| Niveau de Boucle | Fréquence & Vitesse | Coût | Objectif principal | Mécanismes associés |
| --- | --- | --- | --- | --- |
| **Inner Loop** (Boucle Interne) | En continu, très rapide | Faible | Autocorrection immédiate de l'agent avant la PR. | Skills, plugins repo-level, linters rapides, suite de tests unitaires. |
| **Outer Loop** (Boucle Externe) | Exécutée aux frontières des PR / CI | Élevé (temps & tokens) | Validation de confiance et élimination de la revue humaine exhaustive. | Agents de Code Review (Change Review), Verifiers déterministes LLM, Agent QA. |
| **Meta Loop** (Boucle Méta) | En arrière-plan (asynchrone) | Variable | Apprentissage continu du système. Codification des erreurs répétées. | Analyse du backlog/PR, mises à jour automatiques des règles et skills. |

---

### 3. Les Outils de Gouvernance : Change Review vs. Verifiers

Un défi majeur des agents réside dans le respect des contraintes architecturales de l'entreprise. Deux approches complémentaires sont mobilisées dans la boucle externe :

```
Diff PR ───► [ Change Review (LLM Multi-Lenses) ] ───► Analyse Contextuelle / Architecture
         ───► [ Verifiers (Micro-LLM Targeted) ]   ───► Validation Invariante / Binaire (100% Déterministe)
```

* **Tessl Change Review (Revue Générale Agentique)** : Analyse l'ensemble des modifications via des "lentilles" spécifiques (sécurité, lisibilité, réutilisation des modules internes). Elle détecte les anti-patterns globaux mais peut être sujette aux omissions sur des consignes ultra-spécifiques.
* **Tessl Verifiers (Vérificateurs Micro-LLM)** : Remplacent la revue humaine de détails répétitifs. Il s'agit de vérifications LLM ciblées et légères sur des règles strictes (ex: *"Toute balise JSX doit-elle posséder un attribut ARIA ?"* ou *"L'ensemble des logs utilise-t-il le logger interne ?"*). Leur périmètre restreint leur garantit une fiabilité proche de 100 %.

---

## Part II. Déroulé Chronologique du Retour d'Expérience (Tessl)

Voici la retranscription analytique et chronologique de l'implémentation d'une Software Factory telle que vécue et documentée par l'équipe d'ingénierie de Tessl.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 1 : Révolution Culturelle & Lock de l'Environnement                              │
│ ├─ Interdiction du code écrit à la main                                                │
│ └─ Suppression des sessions de chat interactives (Claude Code, Codex)                  │
└───────────────────────────────────────┬────────────────────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 2 : Construction du Plane de Contrôle                                            │
│ ├─ Définition du flux : Linear (Ticket) ──► Agent Sandbox ──► GitHub (PR)             │
│ └─ Problème d'identité : Mariage des comptes GitHub/Linear (Éviter l'effet "Maria")    │
└───────────────────────────────────────┬────────────────────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 3 : Infrastructure d'Exécution Asynchrone                                        │
│ ├─ Constat : GitHub Actions manque de persistance pour les tâches longues (>30 min)   │
│ └─ Déploiement de Tessl Launch Skill (Containers Cloud isolés avec Sidecars Auth)       │
└───────────────────────────────────────┬────────────────────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 4 : Déploiement de la Boucle Externe (Outer Loop)                                │
│ ├─ Implémentation de Change Review (Lentilles de Lisibilité/Sécurité)                  │
│ └─ Déploiement des Verifiers pour automatiser la conformité stricte                   │
└───────────────────────────────────────┬────────────────────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 5 : Fermeture de la Boucle Méta (Meta Loop)                                      │
│ └─ Capture automatique des commentaires de PR humaines ──► Mise à jour continue des   │
│    Skills                                                                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Étape 1 : Le Choix Radical (No-Interactive-Code)

L'équipe impose deux règles simples mais destructrices pour les habitudes établies : **arrêt du code manuscrit** et **interdiction des sessions de chat interactives locales**.

> **Raison d'être** : Tant qu'un développeur interagit localement avec un agent via son terminal, l'historique d'autocorrection, les prompts d'échec et les ajustements restent confinés sur sa machine. Le système global n'apprend rien.

---

### Étape 2 : L'Établissement du Control Plane & Le "Problème Maria"

Toute tâche doit naître d'un ticket (ex: Linear) et se terminer par une Pull Request.
Au début de l'expérience, une ingénieure nommée Maria a configuré le premier orchestrateur d'agents en utilisant ses propres identifiants GitHub personnels. En quelques jours, "Maria" est devenue le plus gros contributeur de l'entreprise en volume de code, saturant sa boîte de notifications et faussant les métriques d'équipe.

* **Solution** : Création d'applications dédiées (Tessl Linear App & Tessl GitHub App) pour assurer la traçabilité des identités agents vs. humains.

---

### Étape 3 : L'Échec de l'Infrastructure Classique (CI/CD traditionnel)

L'équipe a tenté d'exécuter les agents au sein de workflows GitHub Actions standards.

* **Goulots d'étranglement identifiés** :
  1. **Coût et Timeouts** : Les agents à haute autonomie nécessitent 30 à 60 minutes de calcul continu, ce qui est inadapté et très coûteux sur des runners CI classiques.
  2. **Gestion des jetons d'accès** : Les workflows CI perdaient leurs autorisations au milieu des itérations longues.
  3. **Privilèges en cascade** : Empêchement d'un agent de déclencher un autre workflow de test à cause des restrictions de sécurité.

* **Solution** : Déploiement d'un runtime d'agents isolé (via la CLI `Tessl Launch Skill`), exécutant les agents dans des conteneurs cloud éphémères gérant la rotation des secrets.

---

### Étape 4 : L'Élimination du "Code Review Bottleneck"

Une fois l'automatisation de la création de PR en place, le goulot d'étranglement s'est déplacé vers la relecture humaine. Les développeurs ont d'abord rejeté la revue automatique exhaustive sur les PR humaines, la jugeant "trop pédante". En revanche, appliquée directement aux PR des agents, cette rigueur s'est avérée parfaite : l'agent ne ressent aucune fatigue cognitive et applique immédiatement l'intégralité des corrections.

---

## Part III. Analyse Critique : Faiblesses et Risques de la Software Factory

Bien que le concept de Software Factory offre un modèle théorique puissant, sa mise en œuvre pratique révèle plusieurs faiblesses structurelles et risques d'ingénierie qu'il convient d'analyser sans concession.

```
               ┌─────────────────────────────────────────┐
               │    PROBLÉMATIQUES CLÉS DE LA FACTORY    │
               └────────────────────┬────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│  Travail Non │             │ Dépendance & │             │ Dette d'Agent│
│  Planifié    │             │  Verrouillage│             │  (Slop Code) │
└──────────────┘             └──────────────┘             └──────────────┘
```

### 1. Le Piège du "Travail Non Planifié" (*Unplanned Work*)

L'ingénierie de harness souffre d'un défaut psychologique majeur : l'amélioration continue des boucles est un travail imprévisible.
Lorsqu'un agent échoue sur un ticket, le développeur a le choix entre :

* **Corriger la PR à la hand** (rapide à court terme, mais condamne l'équipe au maxima local).
* **Améliorer le Harness / la Skill** (long, non planifié, retardant la livraison immédiate).

Dans la majorité des organisations sous pression de livraison, l'ingénierie de harness est abandonnée au profit du correctif manuel immédiat, brisant la boucle méta.

### 2. Le Danger de la Dette Technique Répétée à Haute Vitesse

Si l'Inner Loop et l'Outer Loop manquent de règles déterministes strictes (Verifiers), la Software Factory devient une "usine à slop". Les LLM tendant à suivre les chemins de moindre résistance, ils risquent d'injecter des micro-dettes architecturales à grande échelle avant même que les métriques traditionnelles (couverture de tests) ne tirent la sonnette d'alarme.

### 3. La Sur-Dépendance au Vendor & L'Agrégation d'Outils Propriétaires

Le modèle prôné par des acteurs comme Tessl tente de concilier modularité et composants prêts à l'emploi (*batteries included*). Cependant, les équipes risquent d'ajouter une couche d'abstraction supplémentaire complexe (Orchestrateurs, Registres de Skills, Sandboxes, Runner CLI) par-dessus une infrastructure Cloud déjà complexe. Si un framework propriétaire contrôle la boucle de feedback, l'organisation s'expose à un verrouillage technologique sur la façon dont son code est produit.

---

## Synthèse Méthodologique pour les Équipes IA

Pour réussir la transition d'un modèle interactif vers une véritable Software Factory agentique sans paralyser la production, les équipes produit IA doivent procéder de manière progressive :

```
       [ Phase 1 : Legibility ]
       - Centraliser les workflows sur le ticket tracker (Linear/Jira).
       - Exécuter les agents de manière headless sans config locale.
                               │
                               ▼
       [ Phase 2 : Inner Loop Optimization ]
       - Vérifier que 100% des standards d'architecture sont dans le repo (.prompt / skills).
       - Interdire la configuration locale spécifique à un développeur.
                               │
                               ▼
       [ Phase 3 : Outer Loop Automation ]
       - Déployer la Change Review automatique sur la CI.
       - Isoler les vérifications critiques déterministes sous forme de Verifiers LLM ciblés.
                               │
                               ▼
       [ Phase 4 : Meta Loop Ratcheting ]
       - Transform chaque commentaire de revue de code humaine en un Verifier ou une mise à jour de Skill.
```

---

## Sources et Références

* **Projet & Vision** : Tessl Platform & Tessl Agent (*Harness Engineering: The New Discipline of Agentic Dev*).
* **Intervenant** : Dru Knox, Head of Product and Design chez Tessl.
* **Concepts Clés Utilisés** :
  * Software Factory Framework (Autonomie, Automatisation, Qualité).
  * Les Trois Loops : Inner Loop, Outer Loop, Meta Loop.
  * Outillage : Tessl Change Review, Tessl Verifiers, Tessl Launch Skill, Tessl Registry.