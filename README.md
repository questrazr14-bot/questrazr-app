# questrazr-app

Questrazr is a Vite + React single-page application that uses Firebase Authentication in the frontend and is configured for Firebase Hosting deployment.

## Tech stack

- React 18
- Vite 5
- React Router 6
- Firebase Web SDK
- Firebase Hosting

## Prerequisites

Install the following before working on the project:

- Node.js 18 or newer
- npm 9 or newer
- Firebase CLI (`npm install -g firebase-tools`) for emulator and deployment workflows
- Access to the Firebase project `questrazr-82347`

## Project structure

```text
.
|-- src/
|   |-- App.jsx
|   |-- context/
|   |-- lib/firebase.js
|   `-- pages/
|-- .env.example
|-- .env.local
|-- .firebaserc
|-- firebase.json
|-- package.json
`-- vite.config.js
```

## Environment configuration

The app reads Firebase settings from Vite environment variables.

Required variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

### Create local environment file

If `.env.local` does not exist yet, copy the example file:

```bash
cp .env.example .env.local
```

This repository already includes the Firebase values for the current project configuration.

## Installation

Install project dependencies from the repository root:

```bash
npm install
```

## Available scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates a production build in `dist/`
- `npm run preview` serves the production build locally with Vite
- `npm run hosting:serve` starts the Firebase Hosting emulator
- `npm run hosting:deploy` builds the app and deploys Hosting to Firebase

## Running locally

Start the development server:

```bash
npm run dev
```

By default, Vite serves the app on:

```text
http://127.0.0.1:5173/
```

If port `5173` is already in use, Vite may choose another available port unless a fixed port is forced.

## Testing and verification

This repository does not currently include an automated unit or integration test suite.

Until automated tests are added, use the following validation steps before opening a PR or deploying:

### 1. Run the production build

```bash
npm run build
```

This verifies that the code compiles successfully and generates the deployable `dist/` output.

### 2. Smoke test in local development

```bash
npm run dev
```

Open the local app in the browser and verify the main flows:

- Home page loads without console errors
- Navigation works across routed pages
- Sign in page renders correctly
- Sign up page renders correctly
- Firebase-backed auth flow behaves as expected for the configured project

### 3. Smoke test the production build locally

```bash
npm run preview
```

This checks the built output before deployment.

### 4. Test with the Firebase Hosting emulator

```bash
npm run build
npm run hosting:serve
```

Use this when you want to validate the same static output and SPA rewrites that Firebase Hosting will use in production.

## Firebase Hosting configuration

The project is already configured for Firebase Hosting.

Current Hosting setup:

- Firebase project: `questrazr-82347`
- Hosting public directory: `dist`
- SPA rewrite rule: all routes rewrite to `/index.html`

Important files:

- [firebase.json](/Users/aeeturi/Documents/Akhil/project_questrazr/questrazr-app/firebase.json)
- [.firebaserc](/Users/aeeturi/Documents/Akhil/project_questrazr/questrazr-app/.firebaserc)

## Deployment steps

### First-time setup

1. Install the Firebase CLI if it is not already installed.
2. Log in to Firebase:

```bash
firebase login
```

3. Confirm the active Firebase project:

```bash
firebase use questrazr-82347
```

### Deploy the current application

Run:

```bash
npm run hosting:deploy
```

That command does two things:

1. Builds the production bundle with Vite
2. Deploys the generated `dist/` directory to Firebase Hosting

### Current production URL

The app is currently deployed at:

```text
https://questrazr-82347.web.app
```

## Release checklist

Use this checklist for each release:

1. Pull the latest code.
2. Ensure `.env.local` contains the expected Firebase configuration.
3. Run `npm install` if dependencies changed.
4. Run `npm run build`.
5. Smoke test with `npm run dev` or `npm run preview`.
6. Optionally validate with `npm run hosting:serve`.
7. Deploy with `npm run hosting:deploy`.
8. Open the live site and verify key routes and auth behavior.

## Troubleshooting

### Port already in use

If the Vite dev server port is occupied, stop the process using that port or restart Vite on another port.

### Firebase CLI authentication issues

If deploy fails because of authentication or permissions:

```bash
firebase logout
firebase login
firebase use questrazr-82347
```

### Routing works locally but not after deploy

This project uses SPA rewrites in `firebase.json`. If deployed routes fail, confirm that `firebase.json` still rewrites all paths to `/index.html`.

### Build succeeds but the live site looks stale

Run a fresh deploy:

```bash
npm run hosting:deploy
```

Then hard refresh the browser to clear cached assets.
