## Du Vibe Coding à l'Agentic Engineering : Le Nouveau Paradigme des AI Product Engineers

### Introduction : Le Sol sous Nos Pieds s'est Effondré

Si vous êtes un AI Product Engineer, le paysage sur lequel vous construisiez s'est totalement métamorphosé. Pendant des mois, l'interaction avec les modèles de langage (LLM) tenait du bricolage assisté : générer une bribe de code par-ci, corriger une syntaxe par-là. Puis est survenu le déclic de la fin d'année. Les morceaux de code générés sont devenus subitement fonctionnels du premier coup. Ce moment de bascule a transformé le simple **"vibe coding"** (coder à l'instinct en pilotant l'IA par de hauts niveaux d'abstraction) en une nécessité d'adopter une ingénierie rigoureuse : **l'Agentic Engineering**.

Ce phénomène ne traduit pas seulement une accélération de la vitesse d'exécution : il marque l'émergence d'une toute nouvelle manière de concevoir, déployer et structurer les produits logiciels.

```
+---------------------------------------------------------------------------------+
|                              ÉVOLUTION DU PARADIGME                             |
+---------------------------------------------------------------------------------+
|  Software 1.0 (Code Explicite)  --> Écriture manuelle des règles                |
|  Software 2.0 (Poids Entraînés) --> Organisation des datasets & architectures   |
|  Software 3.0 (Prompting & Contexte) --> L'IA comme interprète & exécutant     |
+---------------------------------------------------------------------------------+

```

---

### Analyse Stratégique : Les Trois Piliers du Changement

#### 1. Software 3.0 et la Fin des Couches d'Abstraction Inutiles

Traditionnellement, le génie logiciel consistait à empiler des abstractions :

* 
**Software 1.0** : L'ingénieur écrit explicitement chaque règle d'un programme.


* 
**Software 2.0** : L'ingénieur prépare des jeux de données pour entraîner des réseaux de neurones (ex. vision par ordinateur).


* 
**Software 3.0** : Le LLM est l'ordinateur central, et votre levier principal est la fenêtre de contexte.



Cette transition remet en question l'existence même de nombreuses applications middleware. L'exemple du cas d'usage *MenuGen* illustre parfaitement cette rupture :

* 
**L'approche Software 1.0/2.0** : Créer une application web complète (OCR des titres du menu, appel d'API de génération d'images, assemblage de l'interface utilisateur sur Vercel).


* 
**L'approche Software 3.0** : Fournir l'image du menu directement au modèle multimodal et lui demander de superposer les rendus visuels au sein du même flux image-vers-image.



Pour les Product Engineers, l'enseignement est direct : une grande partie du code d'infrastructure classique devient superflue. Avant de concevoir une architecture logicielle complexe, il convient de se demander si le problème ne s'inscrirait pas plutôt dans un flux direct entre entrées et sorties neurales.

#### 2. La Facteur de Factabilité et l'Intelligence "Dentelée" (Jagged Intelligence)

Les modèles actuels ne progressent pas de manière linéaire ou uniforme. Ils présentent une **intelligence dentelée (jagged intelligence)**:

* 
**Domaines fortement vérifiables** : Le code, les mathématiques et les tâches structurées bénéficient massivement de l'apprentissage par renforcement (RL) avec boucles de rétroaction directes. C'est là que les capacités atteignent des sommets.


* 
**Domaines non vérifiables ou hors distribution** : Le bon sens basique, le jugement esthétique ou la logique contextuelle du monde réel peuvent s'effondrer de façon déconcertante.



> 
> **Exemple de rupture logique** : Un modèle de pointe capable de refactoriser un projet de 100 000 lignes de code peut simultanément recommander de marcher pour se rendre dans une station de lavage auto située à 50 mètres de chez soi.
> 
> 

```
+---------------------------------------------------------------------------------+
|                       VÉRIFIABILITÉ ET RENDEMENT EN IA                          |
+---------------------------------------------------------------------------------+
|  HAUTE VÉRIFIABILITÉ (Maths, Code, Jeux)                                        |
|  ==> Boucles de RL efficaces ==> Progression très rapide                        |
|                                                                                 |
|  FAIBLE VÉRIFIABILITÉ (Sens commun, Qualité de design, Intention produit)       |
|  ==> Évaluation subjective ==> Stagnation / Anomalies ("Intelligence dentelée") |
+---------------------------------------------------------------------------------+

```

#### 3. Vibe Coding vs. Agentic Engineering

Il convient de bien différencier ces deux concepts :

* 
**Vibe Coding** : Élève le niveau de base (*raises the floor*). Il permet à n'importe quel profil de prototyper des projets et de générer du code fonctionnel rapidement.


* 
**Agentic Engineering** : Maintenir l'exigence de qualité (*preserves the ceiling*). C'est la capacité à orchestrer des agents autonomes stochastiques et imparfaits tout en garantissant la sécurité, les performances et la pérennité de l'architecture logicielle.



---

### Déroulé Chronologique Détaillé de l'Évolution

| Période / Étape | Changement Paradigmique | Impact Produit & Ingénierie | Limites et Critiques |
| --- | --- | --- | --- |
| **Phase 1 : L'Ère Autoplot & Copilot** *(Avant fin 2024)* | L'IA agit comme une autocomplétion intelligente.

 | Gain de productivité marginal. Correction manuelle fréquente nécessaire.

 | Interruption continue du flux de travail (*context switching*).

 |
| <br>**Phase 2 : La Bascule des Agents Cohérents** *(Fin 2024)* 

 | Les blocs de code et les scripts complexes s'exécutent correctement du premier coup sans intervention.

 | Émergence du *Vibe Coding*. Multiproduction de projets annexes.

 | Illusion d'omniscience : accumulation de dette technique et d'abstractions verbeuses.

 |
| **Phase 3 : Software 3.0 & Inversion des Rôles** *(Début 2025)* | L'agent prend la main sur le système d'exploitation et les environnements d'exécution.

 | Les guides d'installation cèdent la place au transfert direct d'instructions vers l'agent.

 | Vulnérabilités de sécurité et risque d'exécuter des actions non maîtrisées. |
| **Phase 4 : L'Agentic Engineering** *(Étape Actuelle)* | Transition d'un usage récréatif vers une discipline d'ingénierie rigoureuse.

 | Le rôle de l'ingénieur évolue vers celui d'un architecte-directeur (spécification, garde-fous, goût).

 | Complexité de l'évaluation automatisée de la qualité esthétique et de l'architecture.

 |
| **Perspectives Futures** *(2026 et au-delà)* | Processeurs neuraux hôtes, interfaces générées à la volée par diffusion.

 | Disparition progressive du code d'application traditionnel au profit de flux multimodaux directs.

 | Risque d'opacité totale des systèmes et perte d'explicabilité logicielle. |

---

### Analyse Critique et Problématiques pour les Ingénieurs Produit

#### Le Piège du Code "Boursouflé" (Bloatware Neuronal)

Bien que les agents permettent de déployer du code à grande vitesse, la qualité intrinsèque des bases de code générées reste inégale. Les modèles ont une propension naturelle à dupliquer la logique, à intégrer des abstractions inutiles et à produire du code inutilement verbeux.

* 
**Problème** : Simplifier ou condenser du code (comme ramener un projet à une version minimale et élégante) demeure particulièrement difficile pour les LLM actuels. Ceux-ci évoluent en dehors des circuits de récompense (RL) traditionnels axés sur la concision.


* 
**Solution** : L'ingénieur doit conserver le contrôle des fondations architecturales et de la simplification logicielle. L'IA prend en charge la rédaction détaillée des API, tandis que l'humain veille à la clarté et à la structure globale.



#### Le Risque de Perte de Compréhension

Outsourcer l'exécution de la pensée est désormais possible, mais **il reste impossible d'outsourcer la compréhension**.

```
           [ DONNÉES ET CONTEXTE BRUTS ]
                         │
                         ▼
        ┌────────────────────────────────┐
        │   Traitement & Exécution IA    │ ◄── (Outsourcing de la pensée)
        └────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  Compréhension & Goût Humain   │ ◄── (Non externalisable)
        └────────────────────────────────┘
                         │
                         ▼
             [ VISION PRODUIT VALIDE ]

```

Si l'ingénieur produit ne comprend plus les mécanismes sous-jacents (comme la gestion de la mémoire, la distinction entre vues et copies de tenseurs ou le modèle d'authentification) , il devient incapable d'orienter efficacement ses agents ou d'identifier des incohérences fondamentales de conception.

---

### Recommandations Pratiques pour le Product Engineer IA

1. 
**Revoir vos Processus de Recrutement et d'Évaluation** : Quittez les exercices d'algorithmique théoriques. Testez la capacité à piloter des agents sur des projets complets (ex. concevoir une application fonctionnelle, puis exécuter des tests d'intrusion automatisés pour en vérifier la robustesse).


2. 
**Construire du Logiciel "Agent-Native"** : Arrêtez de concevoir des interfaces utilisateur ou de la documentation destinées uniquement aux humains. Rédigez des spécifications, des API et des structures de données directement lisibles et manipulables par des agents (capteurs et actionneurs).


3. 
**Exploiter les Base de Connaissances Synthétiques** : Utilisez des LLM pour réorganiser, synthétiser et croiser vos données internes afin de maintenir une compréhension globale des systèmes que vous développez.



---

### Source Inédite et Inspiration

Cet article s'inspire directement des réflexions, concepts et retours d'expérience partagés par :

* 
**Andrej Karpathy & Stephanie Zhan** – *From Vibe Coding to Agentic Engineering*.