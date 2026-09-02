# 🏛️ Pax.Fabrica — Vitrine Commerciale & Passerelle d'Acquisition

> **La vitrine web officielle et passerelle de conversion directe pour [paxfabrica.com](https://paxfabrica.com)**  
> *« Vos DPGF PDF et Scans. Notre IA. Votre Excel prêt à travailler. »*

---

## 🎯 Vue d'Ensemble & Proposition de Valeur

**Pax.Fabrica** édite des solutions d'intelligence artificielle et d'automatisation documentaire sur-mesure pour les acteurs de la construction (économistes de la construction, bureaux d'études, entreprises générales, maîtres d'ouvrage).

Ce dépôt contient l'application web statique de la vitrine commerciale et de la passerelle d'ingestion client, articulée autour du produit phare **Pax.Extract** :

- **⚡ Extraction Automatisée :** Conversion de DPGF, BPU et DQE complexes (PDF natifs ou numérisés/scans) en feuilles de calcul Excel (`.xlsx`) structurées et exploitables.
- **🔎 Détection des Anomalies :** Signalement instantané des prix manquants, unités incohérentes, formules erronées et doublons.
- **📍 Traçabilité Source :** Rapprochement direct de chaque ligne extraite avec sa page et son emplacement dans le document source.
- **🔒 Données Sous Contrôle :** Zéro remplacement arbitraire, conformité RGPD, conservation intégrale de la décision par l'économiste.

---

## 🧭 Parcours Client & Offres Commerciales

Le site propose un entonnoir d'acquisition transparent et progressif en 4 étapes :

| Étape | Offre | Format & Délais | Tarification & Conditions |
| :--- | :--- | :--- | :--- |
| **0** | **Démo Directe en Visio** | 15 min en direct sur DPGF type | **Gratuit**, réservation directe de créneau |
| **1** | **Pilote Flash 48 h** | 1 à 3 dossiers réels (500 pages max), Excel structuré + rapport d'anomalies | **490 € net**, **100 % déduit** de l'Outil Métier |
| **2** | **Outil Métier Dédié** | Espace web privé sécurisé pour l'entreprise, 1 an de maintenance et support | **2 990 € net** *(50 % à la commande, Pilote déduit)* |
| **3** | **Extensions Sur-Mesure** | Recherche CCTP/DTU, connecteurs ERP (Batappli, Onaya, Sage), pipelines | **Sur devis personnalisé** |

---

## 💻 Architecture & Composants du Site

Le frontend est conçu sans framework lourd (Zero-Dependency) pour garantir une vitesse de chargement instantanée, une empreinte écologique minimale et une fiabilité maximale :

```
portfolio-static/
├── index.html       # Landing page commerciale (Hero, piliers, offres, ROI, FAQ, modal)
├── tech.html        # Fiche technique & architecture détaillée pour profils DSI/CTO
├── legal.html       # Mentions légales, CGV complètes (art. 293B du CGI) et RGPD
├── style.css        # Design system Pax.Fabrica (CSS moderne, thèmes clair/sombre, responsive)
├── booking.js       # Module applicatif de la passerelle (gestion modal, validation, upload)
├── theme.js         # Sélecteur de thème dynamique (Light / Dark mode avec persistance)
├── favicon.svg      # Emblème vectoriel officiel Pax (Temple classique)
└── site.webmanifest # Manifeste PWA & configuration d'icônes
```

### 🚀 Passerelle de Réservation & Upload (`booking.js`)
- **Modal Multi-Modes Intégré :** Commutation fluide entre les 4 parcours (Démo, Pilote Flash, Déploiement Outil Métier, Contact).
- **Zone de Dépôt de Fichiers (Dropzone) :**
  - Formats acceptés : PDF, Excel (`.xlsx`, `.xls`, `.ods`, `.csv`), Scans d'images (`.png`, `.jpg`, `.jpeg`).
  - Capacité d'ingestion : **jusqu'à 50 Mo cumulés**.
  - Encapsulation Base64 et transmission asynchrone sécurisée.
- **Validation Client Robuste :** Schéma strict compatible Zod, filtrage anti-bot par pot de miel (*honeypot*) et jeton Cloudflare Turnstile.
- **Double Opt-In & Confirmation :** Réservation synchronisée avec les créneaux disponibles du backend.

---

## 🔌 Connexion API Backend

En environnement de production, la passerelle communique avec l'API Pax Fabrica hébergée sur le sous-domaine `dashboard.paxfabrica.com` :

- `GET /api/v1/creneaux` : Récupération en temps réel des créneaux de démo disponibles.
- `POST /api/v1/bookings` : Enregistrement des réservations, intake des documents et déclenchement des notifications.
- `GET /api/v1/bookings/confirm?token=...` : Validation du double opt-in par jeton sécurisé.

En local, `booking.js` cible automatiquement `http://localhost:8787` lorsqu'il est exécuté sur `localhost` ou `127.0.0.1`.

---

## 🛠️ Lancement Local & Développement

### 1. Servir le site en local
```bash
# Depuis le dossier portfolio-static :
python3 -m http.server 3000
# Ou depuis la racine du monorepo pax_hub :
python3 -m http.server 3000 --directory portfolio-static
```
Accédez au site via : `http://localhost:3000`.

### 2. Exécuter les tests automatisés
Les tests unitaires et de validation du DOM (avec JSDOM) sont exécutés via le monorepo :
```bash
node --test dashboard/tests/portfolio_booking_frontend.test.js
```

---

## 📜 Conformité & Informations Légales

- **Éditeur :** Pax.Fabrica (EI Michael Daadoun).
- **Régime fiscal :** TVA non applicable, art. 293 B du CGI.
- **Hébergement :** GitHub Pages / Cloudflare (Domaine configuré : [paxfabrica.com](https://paxfabrica.com)).
- **Protection des données :** Traitement des pièces jointes exclusivement dédié au chiffrage et aux tests pilotes, sans revente ni exploitation commerciale tierce.
