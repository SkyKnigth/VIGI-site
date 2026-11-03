# VIGI – Site syndical (première version)

Projet React + Vite / Express / SQLite, avec un composant JSX et son CSS dans le même dossier.

## Installation

Prérequis : Node.js 20+ et npm. Depuis le dossier `VIGI-site` :

```bash
npm run install:all
cp backend/.env.example backend/.env
npm run dev
```

Sur Windows PowerShell, remplacer `cp` par `Copy-Item`.

Frontend : http://localhost:5173
API : http://localhost:4000/api/health

## Architecture

- `frontend/src/components` : un dossier par bloc de la page, avec `.jsx` et `.css`.
- `frontend/src/pages` : les pages et leurs CSS.
- `frontend/src/data/navigation.js` : menus déroulants.
- `frontend/src/data/socials.js` : réseaux sociaux à renseigner.
- `frontend/public/images` : logo, visuels, diaporama.
- `frontend/public/videos/accueil.mp4` : vidéo de référence fournie (à remplacer par le montage VIGI autorisé).
- `backend/src/routes` : routes HTTP.
- `backend/src/database` : schéma SQL créé au premier lancement.

## Ajouter des publications officielles

Les listes sont vides par défaut pour ne pas inventer de contenus attribués à VIGI. Après vérification des droits et des URLs, depuis le dossier `backend` :

```bash
node scripts/add-publication.js video "Titre de la vidéo" "https://www.youtube.com/watch?v=ID" "https://adresse-image.jpg" 2026-11-02
node scripts/add-publication.js tract "Titre du tract" "https://adresse-du-tract.pdf" "https://adresse-image.jpg" 2026-11-02
```

Types possibles : `video`, `tract`, `news`, `press`. Pour un tract, `external_url` peut être l'URL d'un PDF officiel.

## À compléter avant une mise en production

1. Remplacer la vidéo fournie par le montage VIGI final, avec autorisations d'utilisation des images et musiques.
2. Fournir les véritables photographies de policiers pour remplacer les 3 visuels SVG du diaporama.
3. Renseigner les liens officiels des réseaux sociaux et les coordonnées VIGI.
4. Publier les vidéos, tracts et communiqués vérifiés.
5. Valider les textes, slogans, mentions légales, confidentialité et statistiques avec VIGI.
6. Développer l'authentification sécurisée et le parcours d'adhésion : ces écrans sont **volontairement non fonctionnels** dans cette première version.
7. Connecter l'envoi du formulaire à une boîte officielle et mettre en place une politique de conservation des données. Pour le moment, les messages sont uniquement stockés dans SQLite localement.
8. Mettre en place HTTPS, sauvegardes, supervision, protection anti-spam et audit sécurité avant toute mise en ligne.

## Vérification

```bash
npm run build
```

La vidéo et les images fournies sont des éléments de référence ; leur présence dans le projet ne constitue pas une autorisation de diffusion publique.
