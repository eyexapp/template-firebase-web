import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;

/* ----- Keys ----- */

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

export interface Item_Key {
  id: UUIDString;
  __typename?: 'Item_Key';
}

export interface FavoriteItem_Key {
  userId: string;
  itemId: UUIDString;
  __typename?: 'FavoriteItem_Key';
}

/* ----- Mutation types ----- */

export interface UpsertUserData { user_upsert: User_Key; }
export interface UpsertUserVariables { username: string; }

export interface CreateItemData { item_insert: Item_Key; }
export interface CreateItemVariables { title: string; description?: string | null; imageUrl?: string | null; tags?: string[] | null; }

export interface UpdateItemData { item_update?: Item_Key | null; }
export interface UpdateItemVariables { id: UUIDString; title?: string | null; description?: string | null; imageUrl?: string | null; tags?: string[] | null; }

export interface DeleteItemData { item_delete?: Item_Key | null; }
export interface DeleteItemVariables { id: UUIDString; }

export interface AddFavoriteItemData { favorite_item_upsert: FavoriteItem_Key; }
export interface AddFavoriteItemVariables { itemId: UUIDString; }

export interface RemoveFavoriteItemData { favorite_item_delete?: FavoriteItem_Key | null; }
export interface RemoveFavoriteItemVariables { itemId: UUIDString; }

/* ----- Query types ----- */

export interface ListItemsData {
  items: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    imageUrl?: string | null;
    status?: string | null;
    tags?: string[] | null;
    createdAt?: TimestampString | null;
    user?: { id: string; username: string; } | null;
  })[];
}

export interface GetItemByIdData {
  item?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    imageUrl?: string | null;
    status?: string | null;
    tags?: string[] | null;
    createdAt?: TimestampString | null;
    user?: { id: string; username: string; } | null;
  } | null;
}
export interface GetItemByIdVariables { id: UUIDString; }

export interface GetCurrentUserData {
  user?: { id: string; username: string; } | null;
}

export interface GetIfFavoritedItemData {
  favorite_item?: { itemId: UUIDString; } | null;
}
export interface GetIfFavoritedItemVariables { itemId: UUIDString; }

export interface SearchItemsData {
  items: ({
    id: UUIDString;
    title: string;
    description?: string | null;
  })[];
}
export interface SearchItemsVariables { query: string; }

/* ----- Mutation refs & executors ----- */

export function upsertUserRef(vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
export function upsertUserRef(dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

export function createItemRef(vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
export function createItemRef(dc: DataConnect, vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
export function createItem(vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;
export function createItem(dc: DataConnect, vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;

export function updateItemRef(vars: UpdateItemVariables): MutationRef<UpdateItemData, UpdateItemVariables>;
export function updateItemRef(dc: DataConnect, vars: UpdateItemVariables): MutationRef<UpdateItemData, UpdateItemVariables>;
export function updateItem(vars: UpdateItemVariables): MutationPromise<UpdateItemData, UpdateItemVariables>;
export function updateItem(dc: DataConnect, vars: UpdateItemVariables): MutationPromise<UpdateItemData, UpdateItemVariables>;

export function deleteItemRef(vars: DeleteItemVariables): MutationRef<DeleteItemData, DeleteItemVariables>;
export function deleteItemRef(dc: DataConnect, vars: DeleteItemVariables): MutationRef<DeleteItemData, DeleteItemVariables>;
export function deleteItem(vars: DeleteItemVariables): MutationPromise<DeleteItemData, DeleteItemVariables>;
export function deleteItem(dc: DataConnect, vars: DeleteItemVariables): MutationPromise<DeleteItemData, DeleteItemVariables>;

export function addFavoriteItemRef(vars: AddFavoriteItemVariables): MutationRef<AddFavoriteItemData, AddFavoriteItemVariables>;
export function addFavoriteItemRef(dc: DataConnect, vars: AddFavoriteItemVariables): MutationRef<AddFavoriteItemData, AddFavoriteItemVariables>;
export function addFavoriteItem(vars: AddFavoriteItemVariables): MutationPromise<AddFavoriteItemData, AddFavoriteItemVariables>;
export function addFavoriteItem(dc: DataConnect, vars: AddFavoriteItemVariables): MutationPromise<AddFavoriteItemData, AddFavoriteItemVariables>;

export function removeFavoriteItemRef(vars: RemoveFavoriteItemVariables): MutationRef<RemoveFavoriteItemData, RemoveFavoriteItemVariables>;
export function removeFavoriteItemRef(dc: DataConnect, vars: RemoveFavoriteItemVariables): MutationRef<RemoveFavoriteItemData, RemoveFavoriteItemVariables>;
export function removeFavoriteItem(vars: RemoveFavoriteItemVariables): MutationPromise<RemoveFavoriteItemData, RemoveFavoriteItemVariables>;
export function removeFavoriteItem(dc: DataConnect, vars: RemoveFavoriteItemVariables): MutationPromise<RemoveFavoriteItemData, RemoveFavoriteItemVariables>;

/* ----- Query refs & executors ----- */

export function listItemsRef(): QueryRef<ListItemsData, undefined>;
export function listItemsRef(dc: DataConnect): QueryRef<ListItemsData, undefined>;
export function listItems(): QueryPromise<ListItemsData, undefined>;
export function listItems(dc: DataConnect): QueryPromise<ListItemsData, undefined>;

export function getItemByIdRef(vars: GetItemByIdVariables): QueryRef<GetItemByIdData, GetItemByIdVariables>;
export function getItemByIdRef(dc: DataConnect, vars: GetItemByIdVariables): QueryRef<GetItemByIdData, GetItemByIdVariables>;
export function getItemById(vars: GetItemByIdVariables): QueryPromise<GetItemByIdData, GetItemByIdVariables>;
export function getItemById(dc: DataConnect, vars: GetItemByIdVariables): QueryPromise<GetItemByIdData, GetItemByIdVariables>;

export function getCurrentUserRef(): QueryRef<GetCurrentUserData, undefined>;
export function getCurrentUserRef(dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
export function getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

export function getIfFavoritedItemRef(vars: GetIfFavoritedItemVariables): QueryRef<GetIfFavoritedItemData, GetIfFavoritedItemVariables>;
export function getIfFavoritedItemRef(dc: DataConnect, vars: GetIfFavoritedItemVariables): QueryRef<GetIfFavoritedItemData, GetIfFavoritedItemVariables>;
export function getIfFavoritedItem(vars: GetIfFavoritedItemVariables): QueryPromise<GetIfFavoritedItemData, GetIfFavoritedItemVariables>;
export function getIfFavoritedItem(dc: DataConnect, vars: GetIfFavoritedItemVariables): QueryPromise<GetIfFavoritedItemData, GetIfFavoritedItemVariables>;

export function searchItemsRef(vars: SearchItemsVariables): QueryRef<SearchItemsData, SearchItemsVariables>;
export function searchItemsRef(dc: DataConnect, vars: SearchItemsVariables): QueryRef<SearchItemsData, SearchItemsVariables>;
export function searchItems(vars: SearchItemsVariables): QueryPromise<SearchItemsData, SearchItemsVariables>;
export function searchItems(dc: DataConnect, vars: SearchItemsVariables): QueryPromise<SearchItemsData, SearchItemsVariables>;

