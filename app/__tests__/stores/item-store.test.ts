import { describe, it, expect, beforeEach } from 'vitest';
import { useItemStore } from '@/stores/item-store';

describe('item-store', () => {
  beforeEach(() => {
    useItemStore.setState({ items: [], loading: false, error: null });
  });

  it('should have empty initial state', () => {
    const state = useItemStore.getState();
    expect(state.items).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set loading state', () => {
    useItemStore.setState({ loading: true });
    expect(useItemStore.getState().loading).toBe(true);
  });
});
