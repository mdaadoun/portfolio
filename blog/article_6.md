# MCP Apps : L'Avènement du Web Agentique et la Fin du Web par Onglets

Pendant des années, l'interaction avec les modèles de langage (LLM) s'est résumée à une boîte de texte. Pour un ingénieur produit IA, ce format présente un plafond de verre : **le texte est l'interface la plus inefficace pour véhiculer des structures de données complexes**. Réduire un service à un bloc textuel dépouille les entreprises de leur identité de marque, détruit leur UX/UI minutieusement conçue et dégrade l'expérience utilisateur.

Les **MCP Apps** (étendues du *Model Context Protocol*) résolvent ce problème. Plutôt que de renvoyer du texte, les serveurs MCP peuvent désormais envoyer directement des **composants d'interface graphique interactifs et personnalisés (Micro-UI / UI Chunks)** directement au cœur des clients de chat (Claude, ChatGPT, VS Code, Cursor).

---

## 1. Synthèse Vulgarisée : De la Fenêtre de Chat à l'OS Agentique

### Le Problème du "Mur de Texte"

Lorsqu'un agent interroge un outil tiers (ex. PostHog, Spotify, Google Calendar) , la réponse brute renvoyée au LLM puis rédigée en Markdown est souvent illisible ou difficile à analyser en un coup d'œil.

### La Solution MCP Apps

Grâce à la standardisation de **MCP UI**  (développée en partenariat avec Anthropic et OpenAI) , le serveur renvoie un morceau de UI sandboxé (ex. HTML/React).

* 
**Identité visuelle préservée :** Un bloc Shopify ou PostHog ressemble réellement à Shopify ou PostHog dans l'interface de chat.


* 
**Interactivité bidirectionnelle :** L'utilisateur peut cliquer sur un élément visuel (ex. un bouton "Favori" ou un funnel de conversion) , ce qui déclenche un événement renvoyé à l'hôte pour poursuivre la boucle agentique.



---

## 2. Déroulé Chronologique & Évolution du Protocole

```
     Mai 2024                Fin 2024 / Début 2025              2026
--------|------------------------------|-------------------------|-------->
    Création de                 Création du standard         Standard mondial
    MCPUI (Ido Salomon)         MCP Apps (Anthropic/OpenAI)   "Agentic Web"

```

1. 
**Mai 2024 — Naissance de MCPUI :** Ido Salomon crée MCPUI, un protocole open source permettant la transmission d'UI interactives sur MCP. L'outil *Goose* (de Block) et *Postman* figurent parmi les pionniers de son adoption.


2. 
**Partenariat majeur (Anthropic & OpenAI) :** Normalisation de l'extension officielle sous le nom **MCP Apps** (sur la base du SDK MCP UI). Intégration rapide au sein de Claude, ChatGPT, VS Code et Cursor.


3. 
**2026 — L'Ère du Web Agentique :** MCP Apps devient le standard global de distribution d'interfaces pour agents.



---

## 3. Analyse Technique : L'Architecture sous le Capot

Le flux d'interaction s'articule autour d'une architecture événementielle stricte préservant le contrôle de l'hôte (*Host*) :

```
[Utilisateur] ---> (Prompt) ---> [Hôte / Chat (ex: Claude)]
                                        |
                                   (Tool Call)
                                        v
                               [Serveur MCP (ex: PostHog)]
                                        |
                             (Renvoie Resource HTML)
                                        v
[Composant UI Sandboxé] <--- (Rendu de l'UI) <--- [Hôte]
       |
 (Clic / Event)
       +-----------------------> (Callback Event) ---> [Hôte] ---> (Action/Tool)

```

1. 
**Invocations de Resources & Tools :** Le LLM effectue un appel d'outil (*tool call*). Le serveur MCP renvoie une ressource HTML/JS encapsulée sous un URI dédié.


2. 
**Rendu Sandboxé :** Le client (ex: Claude) consomme la ressource et la restitue dans un environnement isolé (iframe sandboxée ou composant React).


3. 
**Events & Callbacks :** Quand l'utilisateur clique sur un élément de l'UI , l'application ne communique pas en direct avec son backend. Elle émet un callback à l'hôte.


4. 
**Boucle Agentique :** L'hôte orchestre l'événement : il peut interpréter le clic comme une intention, générer un nouveau prompt ou exécuter un autre outil (*tool call*).



---

## 4. Nuances, Critiques et Défis pour les Ingénieurs Produit IA

Bien que révolutionnaire, l'adoption de MCP Apps soumet le design de produits IA à plusieurs arbitrages techniques et stratégiques :

### 1. La Perte du Contrôle du User Journey

* 
**Analyse :** Sur le web traditionnel, une entreprise (ex: Amazon ou Shopify) maîtrise 100 % de l'entonnoir de conversion. Avec MCP Apps, l'interface est atomisée en "briques UI" (*UI atoms*) composées à la volée par l'assistant de l'utilisateur.


* 
**Critique :** Les marques deviennent de simples fournisseurs de composants. L'assistant devient le chef d'orchestre de l'expérience utilisateur, ce qui modifie radicalement les métriques d'engagement et de conversion.



### 2. Le Spectrum de la UI Générative vs Déclarative

Le protocole navigue actuellement sur un spectre à trois niveaux:

* 
**Predefined UI (MCP Apps classiques) :** Rendu délimité (ex. iFrame/HTML fixe). Très robuste, sécurisé et fidèle au branding, mais peu flexible.


* 
**Declarative UI (ex: A2UI, JSON Render) :** Le serveur renvoie un schéma de structure (JSON), et l'hôte génère l'UI. Idéal pour une cohérence globale du chat, mais perte de contrôle sur le design fin.


* 
**Generative UI :** L'hôte génère le composant visuel de toutes pièces en streaming.



### 3. Gestion de la Performance et de l'État (Reusable Views & View Tools)

* 
**Re-rendering coûteux :** Charger de lourdes interfaces (ex: un moteur 3D d'Autodesk) à chaque prompt est inefficace. Le groupe de travail MCP développe des *Reusable Views*  pour mettre à jour un composant existant sans le réinstancier.


* 
**View Tools / App Tools (Bidirectionnalité) :** Permettre à l'agent de manipuler lui-même l'interface (ex: *"remplis ce formulaire pour moi"*) grâce au standard *WebMC*.



---

## 5. Synthèse comparative des approches UI en IA

| Critère | Texte Brut / Markdown | MCP Apps (Predefined UI) | UI Déclarative (A2UI / JSON) |
| --- | --- | --- | --- |
| **Fidélité au Branding** | Nulle (réduit à de la donnée) 

 | <br>**Excellente** (UI dédiée) 

 | Moyenne (dépend du thème du chat) |
| **Interactivité** | Faible (liens) | <br>**Élevée** (callbacks, événements) 

 | Élevée (formulaires standardisés) |
| **Contrôle de l'Hôte** | Total | Total (l'hôte gère le flux) 

 | Total |
| **Portabilité Client** | Universelle | <br>**Élevée** (Write once, run in ChatGPT/Claude) 

 | Dépend du support de l'hôte 

 |

---

> 
> **Key Takeaway pour les équipes Produit IA :** > Le Web ne sera plus consommé par la navigation dans 20 onglets différents. La valeur des produits de demain résidera dans la création d'**Atomes UI et d'Outils MCP** capables d'être orchestrés de façon transparente au sein de l'assistant personnel du client.
> 
> 

---

## Sources et Références

* 
**Titre de la présentation :** *MCP Apps: Extending the Frontier* 


* 
**Intervenants :** Ido Salomon (Créateur de MCPUI, co-créateur de MCP Apps) & Liad Yosef (Co-fondateur d'Aura, co-créateur de MCP Apps) 


* 
**Dépôt officiel SDK & Spec :** `modelcontextprotocol/xapps` (`XTA app`) 


* 
**Protocole & Initiatives citées :** Model Context Protocol (MCP), MCPUI, A2UI, WebMC, Open Agentic Web