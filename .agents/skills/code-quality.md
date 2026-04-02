---
name: code-quality
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - code quality
  - naming
  - typescript
  - react
  - firebase
---

# Code Quality — Firebase Web (React 19 + TypeScript)

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Component | PascalCase | `PostCard`, `AuthGuard` |
| Hook | camelCase with use | `useAuth`, `usePosts` |
| Store | camelCase + Store | `useAuthStore` |
| Service function | camelCase | `fetchPosts`, `signInWithGoogle` |
| Type/Interface | PascalCase | `Post`, `AuthState` |
| Firebase function | camelCase | `processPayment` |
| File (component) | PascalCase.tsx | `PostCard.tsx` |
| File (hook) | camelCase.ts | `useAuth.ts` |
| Env variable | VITE_ prefix | `VITE_FIREBASE_API_KEY` |

## React 19 Patterns

```tsx
// Functional components with TypeScript
interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {onDelete && <button onClick={() => onDelete(post.id)}>Delete</button>}
    </article>
  );
}
```

## Auth Guard Component

```tsx
// features/auth/guards/AuthGuard.tsx
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
```

## Error Handling

```typescript
import { FirebaseError } from 'firebase/app';

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/user-not-found': return 'No account found with this email';
      case 'auth/wrong-password': return 'Incorrect password';
      case 'auth/email-already-in-use': return 'Email is already registered';
      case 'auth/too-many-requests': return 'Too many attempts. Try again later';
      default: return error.message;
    }
  }
  return 'An unexpected error occurred';
}
```

## Environment Variables

```bash
# .env.local
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Type Safety

```typescript
// types/index.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Use Firebase Timestamp conversion
import { Timestamp } from 'firebase/firestore';

export function toDate(timestamp: Timestamp): Date {
  return timestamp.toDate();
}
```
