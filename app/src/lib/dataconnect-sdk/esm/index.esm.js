import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'app-connector',
  service: 'my-firebase-app',
  location: 'us-central1'
};

function makeRef(type, opName, dcOrVars, vars, hasVars) {
  const { dc, vars: v } = validateArgs(connectorConfig, dcOrVars, vars, hasVars);
  dc._useGeneratedSdk();
  return type === 'q' ? queryRef(dc, opName, v) : mutationRef(dc, opName, v);
}

/* --- Mutations --- */
export const upsertUserRef = (a, b) => makeRef('m', 'UpsertUser', a, b, true);
upsertUserRef.operationName = 'UpsertUser';
export function upsertUser(a, b) { return executeMutation(upsertUserRef(a, b)); }

export const createItemRef = (a, b) => makeRef('m', 'CreateItem', a, b, true);
createItemRef.operationName = 'CreateItem';
export function createItem(a, b) { return executeMutation(createItemRef(a, b)); }

export const updateItemRef = (a, b) => makeRef('m', 'UpdateItem', a, b, true);
updateItemRef.operationName = 'UpdateItem';
export function updateItem(a, b) { return executeMutation(updateItemRef(a, b)); }

export const deleteItemRef = (a, b) => makeRef('m', 'DeleteItem', a, b, true);
deleteItemRef.operationName = 'DeleteItem';
export function deleteItem(a, b) { return executeMutation(deleteItemRef(a, b)); }

export const addFavoriteItemRef = (a, b) => makeRef('m', 'AddFavoriteItem', a, b, true);
addFavoriteItemRef.operationName = 'AddFavoriteItem';
export function addFavoriteItem(a, b) { return executeMutation(addFavoriteItemRef(a, b)); }

export const removeFavoriteItemRef = (a, b) => makeRef('m', 'RemoveFavoriteItem', a, b, true);
removeFavoriteItemRef.operationName = 'RemoveFavoriteItem';
export function removeFavoriteItem(a, b) { return executeMutation(removeFavoriteItemRef(a, b)); }

/* --- Queries --- */
export const listItemsRef = (a, b) => makeRef('q', 'ListItems', a, b, false);
listItemsRef.operationName = 'ListItems';
export function listItems(a, b) { return executeQuery(listItemsRef(a, b)); }

export const getItemByIdRef = (a, b) => makeRef('q', 'GetItemById', a, b, true);
getItemByIdRef.operationName = 'GetItemById';
export function getItemById(a, b) { return executeQuery(getItemByIdRef(a, b)); }

export const getCurrentUserRef = (a, b) => makeRef('q', 'GetCurrentUser', a, b, false);
getCurrentUserRef.operationName = 'GetCurrentUser';
export function getCurrentUser(a, b) { return executeQuery(getCurrentUserRef(a, b)); }

export const getIfFavoritedItemRef = (a, b) => makeRef('q', 'GetIfFavoritedItem', a, b, true);
getIfFavoritedItemRef.operationName = 'GetIfFavoritedItem';
export function getIfFavoritedItem(a, b) { return executeQuery(getIfFavoritedItemRef(a, b)); }

export const searchItemsRef = (a, b) => makeRef('q', 'SearchItems', a, b, true);
searchItemsRef.operationName = 'SearchItems';
export function searchItems(a, b) { return executeQuery(searchItemsRef(a, b)); }

