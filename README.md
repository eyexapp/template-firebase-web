# Firebase Web Template

A production-ready React + Firebase template featuring Data Connect (PostgreSQL-backed GraphQL), Firebase Auth, Cloud Functions, and modern DX tooling.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript 5.8 (strict), Vite 7 |
| **Styling** | Tailwind CSS v4 |
| **State** | Zustand |
| **i18n** | react-i18next (EN / TR) |
| **Backend** | Firebase Data Connect, Cloud Functions v2 |
| **Auth** | Firebase Auth (Google OAuth) |
| **Testing** | Vitest + Testing Library (unit) · Playwright (e2e) |
| **DX** | ESLint 9 (flat config) · Prettier · Husky · lint-staged · commitlint |

## Project Structure

```
firebase-web/
├── app/                    # React frontend
│   ├── src/
│   │   ├── components/     # UI components (Navbar, Card, AuthGuard)
│   │   ├── hooks/          # Custom hooks (useAuth)
│   │   ├── layouts/        # Root layout with Outlet
│   │   ├── lib/            # Firebase init, i18n config, Data Connect SDK
│   │   ├── locales/        # Translation files (en.json, tr.json)
│   │   ├── pages/          # Route pages (Home, Items, Profile, NotFound)
│   │   ├── services/       # Data Connect service wrappers
│   │   ├── stores/         # Zustand stores (auth, items)
│   │   └── types/          # TypeScript interfaces
│   ├── __tests__/          # Unit tests
│   └── e2e/                # Playwright e2e tests
├── dataconnect/            # Firebase Data Connect
│   ├── schema/             # GraphQL schema (User, Item, FavoriteItem)
│   └── app-connector/      # Queries & mutations + SDK generation config
├── functions/              # Firebase Cloud Functions (v2)
│   └── src/index.ts        # Function entry point
├── firebase.json           # Firebase project config + emulators
├── eslint.config.js        # ESLint v9 flat config
└── .husky/                 # Git hooks (pre-commit, commit-msg)
```

## Getting Started

### Prerequisites

- Node.js 22+
- Firebase CLI (`npm i -g firebase-tools`)
- A Firebase project with Data Connect enabled

### Setup

1. **Clone and install**

   ```bash
   cd app && npm install
   cd ../functions && npm install
   ```

2. **Configure environment**

   ```bash
   cp app/.env.example app/.env
   ```

   Fill in the Firebase config values from your Firebase Console → Project Settings.

3. **Generate Data Connect SDK**

   ```bash
   firebase dataconnect:sdk:generate
   ```

4. **Start development**

   ```bash
   # Terminal 1 — Firebase emulators
   firebase emulators:start

   # Terminal 2 — Vite dev server
   cd app && npm run dev
   ```

   App runs at `http://localhost:5173`.

### Scripts (app/)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run typecheck` | TypeScript check |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Watch mode |
| `npm run test:e2e` | Playwright e2e tests |

### Deploy

```bash
# Functions only
firebase deploy --only functions

# Hosting (frontend)
cd app && npm run build
firebase deploy --only hosting
```

## Architecture

### Layered Design

```
Pages → Components → Hooks → Stores (Zustand) → Services → Data Connect SDK
```

- **Services** wrap Data Connect SDK calls with clean async functions
- **Stores** manage state (auth session, items) via Zustand
- **Hooks** provide React-friendly access to stores (e.g., `useAuth` with auto-initialization)
- **Components** are presentational with minimal logic
- **Pages** compose components and connect to stores

### Data Connect Schema

Three entities: `User`, `Item`, and `FavoriteItem` (join table). Queries and mutations are defined in GraphQL and the TypeScript SDK is auto-generated.

### i18n

Two languages supported out of the box: English (`en.json`) and Turkish (`tr.json`). Language is auto-detected from browser settings and can be toggled in the navbar.

## License

[MIT](LICENSE)
