import {
  listItems,
  getItemById,
  getIfFavoritedItem,
  searchItems,
  createItem,
  updateItem,
  deleteItem,
  addFavoriteItem,
  removeFavoriteItem,
} from '@movie/dataconnect';
import type { CreateItemInput, Item } from '@/types';

export async function fetchItems(): Promise<Item[]> {
  const { data } = await listItems();
  return data.items;
}

export async function fetchItemById(id: string): Promise<Item | null> {
  const { data } = await getItemById({ id });
  return data.item ?? null;
}

export async function checkIfFavorited(itemId: string): Promise<boolean> {
  const { data } = await getIfFavoritedItem({ itemId });
  return !!data.favorite_item;
}

export async function search(query: string): Promise<Item[]> {
  const { data } = await searchItems({ query });
  return data.items;
}

export async function createNewItem(input: CreateItemInput): Promise<void> {
  await createItem(input);
}

export async function updateExistingItem(
  id: string,
  input: Partial<CreateItemInput>,
): Promise<void> {
  await updateItem({ id, ...input });
}

export async function deleteItemById(id: string): Promise<void> {
  await deleteItem({ id });
}

export async function addToFavorites(itemId: string): Promise<void> {
  await addFavoriteItem({ itemId });
}

export async function removeFromFavorites(itemId: string): Promise<void> {
  await removeFavoriteItem({ itemId });
}
