---
applyTo: "**"
---

# Firebase Web Template — Copilot Instructions

## Project Overview
This is a React 19 + Firebase template using Vite, TypeScript (strict), Tailwind CSS v4, Zustand, and react-i18next.

## Architecture
- **Layered**: Pages → Components → Hooks → Stores → Services → Data Connect SDK
- **State**: Zustand stores in `app/src/stores/`. Never use raw `useState` for shared state.
- **Services**: Wrap all Data Connect SDK calls in `app/src/services/`. Never import SDK directly in components.
- **i18n**: All user-facing strings must use `useTranslation()` from react-i18next. Add keys to both `en.json` and `tr.json`.

## Conventions
- Named exports for components (not default exports).
- File names: kebab-case (`auth-guard.tsx`, `item-store.ts`).
- Path alias: `@/` maps to `app/src/`.
- Tailwind utility classes only — no CSS modules, no styled-components.
- Firebase Functions use v2 (`firebase-functions/v2`).

## Testing
- Unit tests: `app/__tests__/` with Vitest + Testing Library.
- E2E tests: `app/e2e/` with Playwright.
- Test files: `*.test.ts` or `*.test.tsx`.

## Important
- Never commit `.env` files. Use `.env.example` as reference.
- Data Connect SDK in `app/src/lib/dataconnect-sdk/` is auto-generated — do not edit manually.
- Run `firebase dataconnect:sdk:generate` after schema changes.
