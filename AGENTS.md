# AGENTS.md — Firebase Web (React 19 + Data Connect)

## Project Identity

| Key | Value |
|-----|-------|
| Framework | React 19 + Vite |
| Language | TypeScript (strict mode) |
| Category | Fullstack (Firebase backend) |
| State Management | Zustand |
| Styling | Tailwind CSS v4 |
| Backend | Firebase (Auth, Data Connect, Functions v2) |
| Testing | Vitest + Testing Library + Playwright |
| i18n | react-i18next (en, tr) |

---

## Architecture — Layered with Firebase Services

```
app/src/
├── components/          ← Shared/reusable components
│   ├── ui/              ← Design system atoms
│   └── layout/          ← App shell, header, sidebar
├── hooks/               ← Custom React hooks
├── pages/               ← Route page components
│   └── <feature>/
│       ├── <Feature>Page.tsx
│       └── components/  ← Feature-scoped components
├── stores/              ← Zustand stores
├── services/            ← Service layer wrapping SDK calls
├── lib/
│   └── dataconnect-sdk/ ← Auto-generated Data Connect SDK (DO NOT EDIT)
├── config/              ← Firebase config, app constants
├── types/               ← TypeScript interfaces
├── i18n/                ← Locale files (en.json, tr.json)
└── utils/               ← Pure utility functions
```

### Strict Layer Rules

| Layer | Can Import From | NEVER Imports |
|-------|----------------|---------------|
| `pages/` | components/, hooks/, stores/, services/ | lib/dataconnect-sdk/ directly |
| `components/` | hooks/, types/, utils/ | stores/, services/ |
| `hooks/` | stores/, services/, types/ | pages/, components/ |
| `stores/` | services/, types/ | pages/, components/ |
| `services/` | lib/dataconnect-sdk/, config/, types/ | stores/, components/ |

---

## Adding New Code — Where Things Go

### New Feature Page
1. Create `app/src/pages/<feature>/<Feature>Page.tsx`
2. Add route in router config
3. Create Zustand store if needed
4. **All Data Connect SDK calls go through services/** — never in components

### New Service
```typescript
// ✅ Services wrap Data Connect SDK calls
// app/src/services/item.service.ts
import { listItems, createItem } from '@/lib/dataconnect-sdk';

export async function getItems(): Promise<Item[]> {
  const result = await listItems();
  return result.data.items;
}

export async function addItem(data: CreateItemDto): Promise<Item> {
  const result = await createItem(data);
  return result.data;
}
```

### After Data Connect Schema Changes
- Run: `firebase dataconnect:sdk:generate`
- SDK in `lib/dataconnect-sdk/` is auto-regenerated
- **NEVER** edit files in `lib/dataconnect-sdk/` manually

---

## Design & Architecture Principles

### Services as SDK Boundary
- Components NEVER import from `lib/dataconnect-sdk/`
- Services wrap ALL Firebase SDK calls (Auth, Data Connect, Functions)
- This enables testing (mock services) and future SDK migration

### Zustand for Client State Only
```typescript
// ✅ Client/UI state in Zustand
export const useThemeStore = create<ThemeState>()((set) => ({
  isDark: false,
  toggle: () => set((s) => ({ isDark: !s.isDark })),
}));

// ❌ NEVER cache server data in Zustand — let Data Connect handle it
```

### Named Exports Only
```typescript
// ✅ Named export
export function ItemCard({ item }: ItemCardProps) { ... }

// ❌ NEVER use default exports
```

---

## Error Handling

### Firebase Error Handling
```typescript
// ✅ Catch Firebase-specific errors
import { FirebaseError } from 'firebase/app';

try {
  await signInWithEmail(email, password);
} catch (error) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/user-not-found': throw new AppError('User not found');
      case 'auth/wrong-password': throw new AppError('Invalid password');
      default: throw new AppError('Authentication failed');
    }
  }
  throw error;
}
```

### Component Error States
- Every async component handles: loading, error, empty, data states
- Use Error Boundaries for critical sections
- Firebase offline persistence → graceful degradation

---

## Testing Strategy

| Level | What | Where | Tool |
|-------|------|-------|------|
| Unit | Services, stores, hooks | `app/__tests__/` | Vitest |
| Component | UI behavior | `app/__tests__/` | Vitest + Testing Library |
| E2E | User flows | `app/e2e/` | Playwright |

### What MUST Be Tested
- All services (mock Data Connect SDK)
- All Zustand stores
- Auth flows (login, register, logout)
- Components with user interaction

---

## Security

- Firebase Auth handles authentication — never roll custom auth
- Security Rules enforce authorization on server side
- Never expose Firebase config secrets (public config is OK)
- Validate inputs before Cloud Function calls
- Use App Check for API abuse prevention

---

## Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Test | `npm run test` |
| Lint | `npm run lint` |
| SDK regenerate | `firebase dataconnect:sdk:generate` |

---

## Prohibitions — NEVER Do These

1. **NEVER** edit `lib/dataconnect-sdk/` — it's auto-generated
2. **NEVER** import Data Connect SDK directly in components — use services
3. **NEVER** use default exports — named exports only
4. **NEVER** use useState for shared state — use Zustand
5. **NEVER** use CSS modules or styled-components — Tailwind only
6. **NEVER** use `any` type — strict TypeScript
7. **NEVER** commit `.env` files
8. **NEVER** hardcode Firebase config — use environment config
9. **NEVER** skip i18n — all user strings via `useTranslation()`
10. **NEVER** use `className` concatenation — use `cn()` utility
