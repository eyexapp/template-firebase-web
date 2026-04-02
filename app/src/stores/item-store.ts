import { create } from 'zustand';
import type { Item, CreateItemInput } from '@/types';
import * as itemService from '@/services/item-service';

interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
  createItem: (input: CreateItemInput) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  toggleFavorite: (itemId: string, isFavorited: boolean) => Promise<void>;
}

export const useItemStore = create<ItemState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const items = await itemService.fetchItems();
      set({ items, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  createItem: async (input) => {
    await itemService.createNewItem(input);
    await get().fetchItems();
  },

  deleteItem: async (id) => {
    await itemService.deleteItemById(id);
    set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
  },

  toggleFavorite: async (itemId, isFavorited) => {
    if (isFavorited) {
      await itemService.removeFromFavorites(itemId);
    } else {
      await itemService.addToFavorites(itemId);
    }
  },
}));
