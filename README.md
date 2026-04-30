# Inventaire personnel de composants

Application web locale en React + Vite + TailwindCSS pour gerer un stock de composants electroniques.

## Fonctionnalites

- Recherche par nom, categorie ou description.
- Ajout, modification, consultation et suppression de composants.
- Panneau lateral de detail avec grande image et actions rapides.
- Sauvegarde automatique dans `localStorage`.
- Donnees d'exemple au premier lancement.
- Interface responsive utilisable sur ordinateur et mobile.

## Installation

```bash
npm install
```

## Lancement en developpement

```bash
npm run dev
```

Vite affiche ensuite l'adresse locale a ouvrir dans le navigateur, generalement `http://localhost:5173`.

## Build de production

```bash
npm run build
```

Les fichiers generes sont places dans `dist/`.

## Structure

```text
src/
  App.jsx      Logique de l'application et composants UI
  index.css    TailwindCSS et styles globaux
  main.jsx     Point d'entree React
```
