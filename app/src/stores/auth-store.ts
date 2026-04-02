import { create } from 'zustand';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { syncUser } from '@/services/user-service';

interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => () => void;
}

const googleProvider = new GoogleAuthProvider();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  signInWithGoogle: async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await syncUser(result.user.displayName ?? result.user.email ?? 'Anonymous');
  },

  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null });
  },

  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      set({ user: firebaseUser, loading: false });
    });
    return unsubscribe;
  },
}));
