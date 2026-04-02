---
name: version-control
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - git
  - commit
  - emulator
  - deploy
  - vite
---

# Version Control — Firebase Web

## Commits

- `feat(auth): add Google sign-in flow`
- `feat(posts): integrate Data Connect SDK for post listing`
- `fix(functions): handle timeout in processPayment callable`

## Firebase CLI

```bash
firebase emulators:start                    # Start all emulators
firebase deploy --only functions            # Deploy functions ONLY
firebase deploy --only firestore:rules      # Deploy security rules
# ⚠️ NEVER deploy hosting without explicit approval
```

## Vite Dev Server

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
```

## .gitignore

```
node_modules/
dist/
.env.local
.firebase/
dataconnect/.dataconnect/
```

## Environment

```bash
# .env.local (not committed)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...

# .env (committed — non-sensitive defaults)
VITE_APP_NAME=MyApp
```

## Data Connect

```bash
firebase dataconnect:sdk:generate   # Generate TypeScript SDK
firebase deploy --only dataconnect  # Deploy schema + connectors
```
