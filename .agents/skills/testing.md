---
name: testing
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - test
  - vitest
  - emulator
  - mock firebase
---

# Testing — Firebase Web (Vitest + Firebase Emulators)

## Component Tests

```typescript
// features/posts/components/__tests__/PostCard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PostCard } from '../PostCard';

describe('PostCard', () => {
  const mockPost = { id: '1', title: 'Test', content: 'Body', authorId: 'u1', createdAt: new Date(), updatedAt: new Date() };

  it('renders post title and content', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('shows delete button when onDelete provided', () => {
    render(<PostCard post={mockPost} onDelete={() => {}} />);
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});
```

## Hook Tests (Auth)

```typescript
// features/auth/hooks/__tests__/useAuth.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Firebase auth
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback({ uid: 'test-uid', email: 'test@test.com' });
    return vi.fn();
  }),
  getAuth: vi.fn(),
}));

describe('useAuth', () => {
  it('sets user from Firebase auth state', async () => {
    const { result } = renderHook(() => useAuth());
    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });
  });
});
```

## Emulator Integration Tests

```typescript
// tests/integration/auth.test.ts
import { connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';

beforeAll(() => {
  connectAuthEmulator(auth, 'http://localhost:9099');
});

it('creates and authenticates user', async () => {
  const email = `test-${Date.now()}@test.com`;
  await createUserWithEmailAndPassword(auth, email, 'password123');
  const cred = await signInWithEmailAndPassword(auth, email, 'password123');
  expect(cred.user.email).toBe(email);
});
```

## Running Tests

```bash
npx vitest                      # Unit tests
npx vitest --coverage           # With coverage
firebase emulators:start        # Start emulators first
npx vitest run tests/integration # Integration tests against emulators
```
