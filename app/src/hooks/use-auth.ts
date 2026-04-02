import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';

export function useAuth() {
  const { user, loading, signInWithGoogle, signOut, initialize } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initialize();
    return unsubscribe;
  }, [initialize]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signInWithGoogle,
    signOut,
  };
}
