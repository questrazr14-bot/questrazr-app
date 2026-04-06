# questrazr-app

Vite + React app for Questrazr.

## Local development

```bash
npm install
npm run dev
```

## Firebase Hosting

This project is configured for Firebase Hosting as a single-page app:

- Hosting project: `questrazr-82347`
- Build output: `dist`
- SPA routing: all routes rewrite to `index.html`

### Deploy

Make sure the Firebase CLI is installed and authenticated, then run:

```bash
npm run hosting:deploy
```

### Test Hosting locally

```bash
npm run build
npm run hosting:serve
```
