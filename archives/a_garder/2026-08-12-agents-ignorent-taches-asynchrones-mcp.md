# Pourquoi les agents ignorent-ils (encore) les tâches asynchrones MCP ? Analyse & Rétro-ingénierie du protocole

Les architectures basées sur le **Model Context Protocol (MCP)** évoluent rapidement. Pourtant, un fossé persiste entre le besoin d'exécuter des opérations de longue durée (*long-running tasks*) et la capacité réelle des agents IA à les gérer en production.

Bien que la spécification des **MCP Tasks** promette de dépasser le simple modèle « Requête-Réponse » (HTTP classique) pour introduire des processus asynchrones (ex. validation ERP, flux *Human-in-the-Loop*), l'adoption côté client reste au point mort.

Voici l'analyse complète des défis techniques, de l'évolution du protocole de la version V1 à la V2, et des solutions pour intégrer ces mécanismes dans vos architectures produit.

---

## Part 1. Synthèse Vulgarisée : Le problème des tâches longues dans MCP

Pour un ingénieur produit, un outil MCP classique fonctionne de manière basique : l'agent envoie une requête via `tools/call`, bloque sa boucle d'exécution pendant quelques millisecondes (ou secondes), puis reçoit un résultat.

```
[Agent IA] ----(tools/call)----> [Serveur MCP] ---> [Exécution] ---> [Résultat direct]

```

Cependant, les cas d'usage industriels réels (ex. traitement d'un bon de commande avec contrôle d'inventaire, paiement et validation humaine) prennent des minutes, des heures, voire des jours. Dans ce contexte, maintenir une connexion TCP/HTTP ouverte est impossible :

* **Interruptions réseau** et déconnexions intempestives.


* **Crashs de composants** (crash du serveur MCP ou du client IA/runner de workflows).


* **Délais humains** (*Human-in-the-Loop*) irréalistes pour des sessions synchrones.



```

```

La spécification **MCP Tasks** a été introduite pour transformer une invocation d'outil synchrone en un modèle à **handle de tâche**:

1. L'agent lance une tâche.


2. Il reçoit immédiatement un jeton/handle (*Task Handle*).


3. Il interagit avec cette tâche au fil du temps jusqu'à sa résolution.



Le verrou principal réside dans **l'exigence de durabilité** fixée par la spécification : une tâche créée ne doit pas pouvoir disparaître sous prétexte qu'un serveur redémarre ou qu'un réseau flanche.

---

## Part 2. Déroulé Chronologique & Analyse Comparative : MCP Tasks V1 vs V2

Pour comprendre pourquoi les développeurs de clients et d'agents sont restés frileux, il faut étudier la trajectoire technique du protocole depuis fin 2024.

### Timeline d'évolution du Protocole

```
 [Novembre 2024] -------------> [Mai 2025] -------------------> [Juillet 2025+]
  MCP Tasks V1 (Expérimental)    Annonce de la refonte V2        Lancement V2
  Protocole d'État / Complexe    Core Stateless + Extensions     Adoption & Standardization

```

* **Novembre 2024** : Publication de la spécification MCP Tasks V1 (marquée comme expérimentale).


* **Mars–Mai 2025** : Retours d'expérience de la communauté (notamment via la *Agentic AI Foundation*) soulignant l'extrême complexité côté client et les goulets d'étranglement à l'échelle.


* **Mai 2025** : Annonce officielle du passage à une architecture *stateless* (V2).


* **Abonnement/Notifications** : Évolution vers des architectures pilotées par les événements pour éviter le *polling* passif à grande échelle.



---

### Analyse Détaillée : Les Faiblesses Structurales de Tasks V1

Le tableau ci-dessous résume les différences majeures entre la première mouture du protocole et la révision V2 :

| Axe d'analyse | MCP Tasks V1 (Novembre 2024) 

 | MCP Tasks V2 (Juillet 2025+) 

 |
| --- | --- | --- |
| **Architecture du protocole** | Basée sur l'état (*Stateful*) 

 | Sans état (*Stateless Core*) 

 |
| **Gestion des extensions** | Protocole monolithe 

 | Découplage Core / Extension 

 |
| **Découverte (`task/list`)** | Endpoint global renvoyant toutes les tâches 

 | Supprimé (Persistance obligatoire de l'ID par le client) 

 |
| **Interaction / *Human-in-the-loop*** | <br>*Tunneling* d'état complexes via sessions ouvertes (`task/result`) 

 | Signalement direct asynchrone (`task/update`) 

 |
| **Complexité d'implémentation Client** | Trés élevée (gestion de file d'attente FIFO, tunnels de connexion) 

 | Modérée à Faible (style REST/Signal explicite) 

 |

---

### Critique Technique Approfondie des Deux Versions

#### 1. Le Piège du `task/list` de la V1 (Problème de Scalabilité)

En V1, la spécification mettait la responsabilité de l'état sur le serveur avec un endpoint `task/list`.

* **Critique** : Cet endpoint ne supportait pas de filtrage. Dans un environnement de production exécutant un million de tâches en arrière-plan, le client devait télécharger l'intégralité des tâches pour retrouver celle le concernant. Une hérésie pour tout système distribué à fort volume.



#### 2. L'Abonnement et le Tunneling `task/result` en V1

L'acquisition d'entrées utilisateur (*input required*) en V1 imposait d'ouvrir une connexion longue portée (*long-running session*) où le serveur sollicitait le client à travers le canal de résultat.

* **Critique** : Si la connexion réseau coupait pendant la demande d'information, la gestion de reprise (*re-handshake*) créait un code spaghetti ingérable au niveau du client. De plus, les implémentations de référence traitaient les requêtes en mode séquentiel strict (FIFO), bloquant le traitement en parallèle d'autres tâches en attente d'entrées.



#### 3. La Correction de la V2 : L'approche *Stateless* et le pattern *Signal*

La V2 supprime `task/list` et remplace le tunnel de résultat par l'endpoint `task/update`.

* **Critique** :
* **Avantage** : Le client envoie un signal directement au workflow (similaire au mécanisme de *Signals* des moteurs d'orchestration distribués comme Temporal). La gestion devient prévisible et sans état côté protocole transport.


* **Contrainte cachée** : La suppression de `task/list` oblige désormais le client à **persister obligatoirement les ID de tâches** de son côté. Si le client crash sans avoir sauvegardé le `task_id`, la tâche devient orpheline et irrécupérable sur le serveur.





#### 4. Le Goulet d'Étranglement du Polling Passif (Même en V2)

Même avec la simplification V2, si un agent gère des milliers de tâches, faire des requêtes `task/get` répétées sur chaque tâche n'est pas viable à l'échelle.

* **Critique** : La V2 doit impérativement s'accompagner du **protocole de notifications** (*Notifications Protocol*). Plutôt que de scruter chaque tâche (*polling*), le client s'abonne à un unique endpoint d'événements push.



---

## Part 3. Recommandations & Architecture pour les Ingénieurs Produit IA

Si vous concevez une infrastructure d'agents IA devant exécuter des tâches longues, voici les règles d'architecture à suivre :

```
                               ┌──────────────────────────────────────────────┐
                               │               WORKFLOW ENGINE                │
                               │  (ex: Temporal / Orchestrateur d'état)      │
                               └──────┬───────────────────────────────▲───────┘
                                      │                               │
                               1. Invoke Task                   3. Signal Update
                                      │                               │
┌──────────────┐   tools/call         ▼                               │
│  AGENT IA    ├───────────────►┌─────────────┐                       │
│  (Client)    │                │ SERVEUR MCP │                       │
│              │◄───────────────┤             │                       │
└──────┬───────┘  Task Handle   └─────────────┘                       │
       │                                                              │
       │ 2. Persist Task ID                                           │
       ▼                                                              │
┌──────────────┐                                                      │
│ PERSISTENCE  │──────────────────────────────────────────────────────┘
│  (Client DB) │                   4. Input Required/Approve
└──────────────┘

```

1. **Associez MCP à un Moteur de Workflow Déclaratif** :
Ne réinventez pas la durabilité au niveau de l'agent. Le serveur MCP ne doit être qu'une fine couche d'adaptation (via des frameworks comme *FastMCP*) exposant un moteur d'orchestration robuste en arrière-plan.


2. **Ne comptez pas sur le Serveur pour vous rappeler vos Tâches** :
Implémentez une persistance stricte des métadonnées de tâche (`task_id`, état courant, identifiant du bon de commande/flux métier) côté client avant même de traiter la réponse.


3. **Mappez les États de Tâche avec votre Domaine Métier** :
Assurez-vous de faire correspondre la machine d'état du protocole MCP (`working` -> `input_required` -> `completed`/`failed`) directement avec la machine d'état de votre application métier (ex: *Validation ERP* -> *Approbation* -> *Paiement*).



---

## Part 4. Sources & Références

Cet article s'inspire directement des retours d'expérience et des analyses techniques présentés par la communauté MCP :

* **Cornelia Davis (Temporal)** – *MCP Tasks (async): Why Aren't Any Agents Supporting Them?* (Présentation technique sur l'architecture des tâches asynchrones, la durabilité et la transition V1/V2).


* **Cornelia Davis** – *Server-side MCP Tasks Durability* (Talk présenté au MCP DevSummit).


* **Angie Jones (Agentic AI Foundation)** – *Announcing the Stateless Core Architecture for MCP V2* (Publication officielle sur le passage du protocole au modèle *stateless* et modulaire).


* **FastMCP Framework** – Documentation et implémentation de référence des handlers de protocole client/serveur pour MCP.