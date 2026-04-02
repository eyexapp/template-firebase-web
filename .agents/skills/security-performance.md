---
name: security-performance
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - security
  - performance
  - firestore rules
  - auth
  - bundle size
---

# Security & Performance — Firebase Web

## Security

### Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null
        && request.resource.data.authorId == request.auth.uid;
      allow update, delete: if request.auth != null
        && resource.data.authorId == request.auth.uid;
    }

    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

### Auth Token Handling

```typescript
// Always use Firebase Auth — never store tokens manually
import { getIdToken } from 'firebase/auth';

// For custom backend calls
async function callBackend(endpoint: string) {
  const token = await getIdToken(auth.currentUser!);
  return fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
```

### API Key Security

```typescript
// Firebase API keys are NOT secrets — they are safe to expose in client code
// Security comes from Firestore rules and Auth, NOT from hiding keys
// Never put service account keys in client code
```

### Input Validation

```typescript
// Validate on client AND enforce in Firestore rules
function validatePost(data: { title: string; content: string }) {
  if (!data.title || data.title.length > 200) throw new Error('Invalid title');
  if (!data.content || data.content.length > 10000) throw new Error('Invalid content');
}
```

## Performance

### Lazy Loading Routes

```tsx
import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./features/dashboard/pages/DashboardPage'));
const Posts = lazy(() => import('./features/posts/pages/PostsPage'));

function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Suspense>
  );
}
```

### Firebase SDK Tree Shaking

```typescript
// ✅ Import only what you need (modular SDK)
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// ❌ Never import the compat SDK
import firebase from 'firebase/app'; // Huge bundle
```

### Data Connect Query Optimization

```typescript
// Fetch only needed fields via Data Connect schema
// Avoid over-fetching — design queries to return minimal data
const result = await listPostsSummary(); // title + id only
```

### Image Optimization

```typescript
// Use Firebase Storage with resize extension
import { getDownloadURL, ref } from 'firebase/storage';
const thumbUrl = await getDownloadURL(ref(storage, `thumbs/${imageId}_200x200`));
```

### Offline Support

```typescript
import { enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
// Enable offline persistence for Firestore
enableMultiTabIndexedDbPersistence(db).catch(console.error);
```
