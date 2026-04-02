import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '@/stores/auth-store';

describe('auth-store', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, loading: true });
  });

  it('should have correct initial state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.loading).toBe(true);
  });

  it('should expose signInWithGoogle and signOut functions', () => {
    const state = useAuthStore.getState();
    expect(typeof state.signInWithGoogle).toBe('function');
    expect(typeof state.signOut).toBe('function');
    expect(typeof state.initialize).toBe('function');
  });
});
