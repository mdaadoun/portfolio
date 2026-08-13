# Optimiser l'IA Locale : L'Impact Crucial du Switch PCIe et de l'Agentique ("Harnesses")

Dans la course aux modèles de langage et d'action performants, les ingénieurs produit IA et développeurs *on-premise* font face à un dilemme permanent : **faut-il investir dans des modèles plus volumineux ou optimiser l'infrastructure d'exécution et le cadre applicatif (le *harness*) ?** 

Une série d'expérimentations menées sur des architectures GPU locales (notamment à base d'NVIDIA RTX Pro 6000 et RTX 3090) apporte un éclairage décisif : **la puissance brute du matériel ne sert à rien sans une communication PCIe optimale, et un modèle moyen couplé au bon *harness* peut surpasser un grand modèle exécuté de manière basique.** 

---

## Part 1 : Vulgarisation & Synthèse Décisionnelle

### 1. Le Goulot d'Étranglement Matériel : PCIe Switch, ReBar et Above 4G Decoding

Pour faire tourner des modèles massifs (comme GLM-52 ou DeepSeek V4) en local, l'utilisation de plusieurs GPU est indispensable. Cependant, connecter plusieurs cartes graphiques à une carte mère grand public ou workstation crée rapidement un goulot d'étranglement.

* 
**Le Switch PCIe Gen 5 :** Il permet d'interconnecter directement plusieurs GPU entre eux et vers l'hôte à des débits élevés sans saturer le bus système.


* 
**L'exigence du Resizable BAR (ReBar) & Above 4G Decoding :** Sans l'activation conjointe de ces deux fonctionnalités dans le BIOS, les performances globales du système peuvent s'effondrer de **30% à 50%**. De plus, certains BIOS propriétaires (notamment sur des machines de marque) désactivent ou gèrent mal le re-timer du switch PCIe, provoquant la déconnexion pure et simple des cartes lors du chargement de l'OS.



### 2. Le Débat des Modèles : La guerre des bits et de la précision

L'analyse montre une compétition féroce entre deux approches :

* 
**GLM-52 (3.25 bpw / FP4) :** Un modèle très lourd, extrêmement performant mais coûteux en calcul, atteignant environ 75 tokens/seconde.


* 
**DeepSeek V4 Flash (version 0731) :** Un modèle ultra-rapide (dépassant 350 à 400 tokens/sec grâce à DSpark et au Switch PCIe Gen 5). Sa précision est principalement sur 4 bits, ce qui réduit considérablement son empreinte mémoire.



### 3. La Révélation Applicative : *The Right Harness is All You Need*

Un *harness* (ou agent de codage/exécution) est la structure logicielle qui encapsule le modèle pour exécuter des tâches complexes (boucles de réflexion, appels d'outils, corrections d'erreurs).

* 
**Minion (Harness minimaliste) :** Teste l'intelligence brute du modèle sans artifice. Sur ce harness, DeepSeek V4 Flash 0731 obtenait un score décevant de 44/89 sur TerminalBench.


* 
**OM (Harness itératif lourd) :** Offre une autonomie avancée. En basculant DeepSeek V4 Flash sur le harness **OM**, le score bondit à **64/89 (72%)**, rivalisant directement avec GLM-52 (65/89 avec OM)!



> 
> **Conclusion Produit :** Un harness itératif permet à un modèle léger et rapide de compenser ses lacunes par des boucles de rétroaction successives. Le coût réside dans une surconsommation importante de tokens et un temps de résolution global plus long.
> 
> 

---

## Part 2 : Déroulé Chronologique & Analyse Critique des Étapes

```
[Étape 1: Hardware PCIe] ──> [Étape 2: Benchmarking Agentique] ──> [Étape 3: Multi-Modèles & Vision]

```

### Étape 1 : Le Calvaire de l'Installation Matérielle (PCIe Switch & Retimer)

* 
**Contexte :** Tentative d'installer un switch PCIe Gen 5 à 100 lignes avec Re-timer pour piloter un cluster de cartes RTX Pro 6000.


* 
**Tests successifs :** Essais sur Dell T2 Tower, machines Puget, Box Workstations et configurations personnalisées.


* 
**Problématique BIOS :** Sur la Dell T2 Tower, malgré l'activation d'Above 4G et du ReBar, le switch se déconnectait du bus dès le chargement du système d'exploitation. Sur la machine Box, l'absence de ReBarentraînait une chute de performance d'environ 40% sur le débit de tokens.


* 
**Solution retenue :** Conversion d'une ancienne machine hôte principale en banc de test avec carte Re-timer reliée par double câble MCIO vers le switch PCIe Gen 5.



> **Analyse critique :** Le marché du matériel local pour l'IA souffre d'un manque criant de validation croisée. Les ingénieurs produit ne peuvent pas se fier uniquement aux fiches techniques : les BIOS propriétaires des constructeurs OEM restent des boîtes noires qui bloquent souvent l'allocation de grandes plages d'adresses mémoire (BAR) nécessaires aux topologies multi-GPU modernes.
> 
> 

---

### Étape 2 : Évaluation des Modèles – Le Cas Poolside Laguna S21

* 
**Lancement :** Poolside publie Laguna S21 (118B paramètres, 8B actifs) en affichant des scores impressionnants (70.2 sur TerminalBench).


* 
**Échec de réplication :** Impossible de valider ces résultats en conditions réelles.


* 
**Diagnostic :** Le modèle souffre d'un surapprentissage (*overfitting*) massif par rapport au harness de benchmark interne de l'éditeur. Placé dans un environnement standard, Laguna S21 génère de faux appels d'outils (*hallucinated tool calls*) directement hérités du formatage de son harness d'entraînement.



> **Analyse critique :** C'est le piège classique du "Harness Overfitting". Pour un ingénieur IA, adopter un modèle dont la capacité de réflexion est rigidement liée au harness du vendeur crée une dette technique majeure. Si votre pipeline produit n'utilise pas exactement la même structure d'appel, le modèle s'effondre.
> 
> 

---

### Étape 3 : La Confrontation – DeepSeek V4 Flash (0731) vs GLM-52

* 
**Le choc des métriques :** DeepSeek prétend que sa version V4 Flash 0731 surpasse GLM-52. Initialement rejeté car testé sous le harness minimaliste *Minion*, le modèle échouait lamentablement.


* 
**Passage sous le Harness OM :** L'intégration du harness itératif OM transforme la dynamique.



| Modèle | Harness | Tâches Réussies (TerminalBench) | Score (%) | Vitesse (Decode) |
| --- | --- | --- | --- | --- |
| **GLM-52 (3.25 bpw)** | OM | **65 / 89** | **73%** | ~75 tok/s 

 |
| **DeepSeek V4 Flash (0731)** | **OM** | **64 / 89** | **72%** | <br>**~350 - 400 tok/s** 

 |
| **GLM-52 (3.25 bpw)** | Minion | 61 / 89 | 68% | ~75 tok/s 

 |
| **DeepSeek V4 Flash (0731)** | Minion | 44 / 89 | 49% | ~350 - 400 tok/s 

 |

> 
> **Analyse critique :** Le harness **OM** agit comme un correcteur d'erreurs en temps réel. DeepSeek V4 Flash bénéficie de sa vitesse d'inférence phénoménale (400 tok/s) pour faire 3 ou 4 itérations dans le même laps de temps qu'il faut à GLM-52 pour générer une seule réponse. En revanche, l'empreinte mémoire d'entrée (tokens de contexte) s'envole en raison de ces aller-retours.
> 
> 

---

### Étape 4 : Spécialisation des Noyaux & Intégration Vision (Qwen 36/38)

* **Architecture hybride :** Pour équilibrer la charge, le cluster local délègue l'exécution :
1. Les modèles de raisonnement/code lourds (GLM-52 ou DeepSeek V4) sont hébergés sur l'array RTX Pro 6000.


2. Un modèle multimodal plus petit (ex: Qwen 36 27B à 4-bit) tourne sur une carte dédiée (RTX 3090) pour gérer les tâches visuelles (robotique, analyse de diagrammes, interface web).




* 
**Application Robotique :** Expérimentation d'apprentissage par démonstration (ACT - Action Chunking with Transformers et Lerobot) sur un robot humanoïde Unitree G1. L'analyse visuelle et la génération d'actifs 3D nécessitent impérativement un modèle multimodal en appoint.



---

## Part 3 : Synthèse Générale & Recommandations Produit

```
                                  ┌── Minion (Simple) ──> Rapide, Économe mais exige un Modèle Intelligent (GLM-52)
                                  │
Choix de l'Ingénieur IA ──────────┤
                                  │
                                  └── OM (Itératif) ────> Consomme de la Latence/Tokens mais débloque les Modèles Rapides (DS V4)

```

1. 
**Ne négligez pas l'infrastructure matérielle sous-jacente :** Avant d'acheter des GPU haut de gamme, assurez-vous que la carte mère gère parfaitement le **ReBar** et le **Above 4G Decoding** sur des PCIe Switches de Gen 5 pour éviter une bride de 40% de vos débits de streaming.


2. **Choisissez votre Harness en fonction de votre SLO (Service Level Objective) :**
* Si vous cherchez la **vitesse et la simplicité brute**, utilisez un gros modèle (ex: GLM-52) sur un harness léger.


* Si vous privilégiez le **coût d'inférence et la rentabilité**, combinez un petit modèle ultra-rapide (ex: DeepSeek V4 Flash) à un harness fortement itératif (ex: OM).




3. 
**Méfiez-vous des benchmarks constructeurs :** Répétez toujours les tests dans vos propres environnements sans reprendre aveuglément les harness fournis par les éditeurs.



---

## Sources & Références

1. 
**Vidéo / Fichier de référence :** *"The Right Harness is All You Need - For local Frontier AI"* 


2. **Technologies & Modèles cités :**
* 
*Hardware :* NVIDIA RTX Pro 6000, RTX 3090, Switch PCIe Gen 5, Retimers MCIO, Dell T2 Tower.


* 
*Software / Frameworks :* Harness OM, Harness Minion, DSpark, Lerobot, ACT (Action Chunking with Transformers).


* 
*Modèles LLM/VLM :* GLM-52 (3.25 bpw), DeepSeek V4 Flash (preview & 0731), Poolside Laguna S21, Qwen 36/38 27B.


* 
*Benchmarks :* TerminalBench 21.