---
name: architecture
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - architecture
  - firebase
  - react
  - data connect
  - auth
---

# Architecture — Firebase Web (React 19 + Firebase)

## Project Structure

```
src/
├── app/                        ← App shell
│   ├── App.tsx
│   ├── router.tsx              ← React Router 7
│   └── providers.tsx           ← Auth + Firebase providers
├── features/                   ← Feature modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── guards/
│   ├── posts/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── pages/
│   └── dashboard/
├── shared/
│   ├── components/             ← Reusable UI
│   ├── hooks/                  ← Shared hooks
│   └── utils/
├── services/
│   ├── firebase.ts             ← Firebase init + exports
│   ├── auth.ts                 ← Auth helpers
│   └── dataconnect.ts          ← Data Connect SDK
├── stores/                     ← Zustand stores
│   └── authStore.ts
├── dataconnect/                ← Auto-generated SDK
│   ├── index.ts
│   └── connectors/
└── types/
    └── index.ts
```

## Firebase Initialization

```typescript
// services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
});

export const auth = getAuth(app);
export const functions = getFunctions(app);

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
```

## Auth Hook

```typescript
// features/auth/hooks/useAuth.ts
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const { user, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { user, isAuthenticated: !!user };
}
```

## Data Connect (Auto-generated SDK)

```typescript
// services/dataconnect.ts
import { listPosts, createPost, getPostById } from '@/dataconnect';

export async function fetchPosts() {
  const result = await listPosts();
  return result.data.posts;
}

export async function addPost(title: string, content: string) {
  return createPost({ title, content });
}
```

## Zustand Auth Store

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import type { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
```

## Cloud Functions v2 Calls

```typescript
// services/functions.ts
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export const processPayment = httpsCallable<
  { amount: number; currency: string },
  { success: boolean; transactionId: string }
>(functions, 'processPayment');
```

## Rules

- Firebase Auth for authentication (Google, Email, Anonymous).
- Data Connect for database (auto-generated TypeScript SDK).
- Cloud Functions v2 via `httpsCallable` for server logic.
- Zustand for client state (auth, UI).
- React 19 with hooks and functional components.
- Emulators for local development.
