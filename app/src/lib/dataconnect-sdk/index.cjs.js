const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'app-connector',
  service: 'my-firebase-app',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

function makeRef(type, opName, dcOrVars, vars, hasVars) {
  const { dc, vars: v } = validateArgs(connectorConfig, dcOrVars, vars, hasVars);
  dc._useGeneratedSdk();
  return type === 'q' ? queryRef(dc, opName, v) : mutationRef(dc, opName, v);
}

/* --- Mutations --- */
const upsertUserRef = (a, b) => makeRef('m', 'UpsertUser', a, b, true);
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;
exports.upsertUser = function upsertUser(a, b) { return executeMutation(upsertUserRef(a, b)); };

const createItemRef = (a, b) => makeRef('m', 'CreateItem', a, b, true);
createItemRef.operationName = 'CreateItem';
exports.createItemRef = createItemRef;
exports.createItem = function createItem(a, b) { return executeMutation(createItemRef(a, b)); };

const updateItemRef = (a, b) => makeRef('m', 'UpdateItem', a, b, true);
updateItemRef.operationName = 'UpdateItem';
exports.updateItemRef = updateItemRef;
exports.updateItem = function updateItem(a, b) { return executeMutation(updateItemRef(a, b)); };

const deleteItemRef = (a, b) => makeRef('m', 'DeleteItem', a, b, true);
deleteItemRef.operationName = 'DeleteItem';
exports.deleteItemRef = deleteItemRef;
exports.deleteItem = function deleteItem(a, b) { return executeMutation(deleteItemRef(a, b)); };

const addFavoriteItemRef = (a, b) => makeRef('m', 'AddFavoriteItem', a, b, true);
addFavoriteItemRef.operationName = 'AddFavoriteItem';
exports.addFavoriteItemRef = addFavoriteItemRef;
exports.addFavoriteItem = function addFavoriteItem(a, b) { return executeMutation(addFavoriteItemRef(a, b)); };

const removeFavoriteItemRef = (a, b) => makeRef('m', 'RemoveFavoriteItem', a, b, true);
removeFavoriteItemRef.operationName = 'RemoveFavoriteItem';
exports.removeFavoriteItemRef = removeFavoriteItemRef;
exports.removeFavoriteItem = function removeFavoriteItem(a, b) { return executeMutation(removeFavoriteItemRef(a, b)); };

/* --- Queries --- */
const listItemsRef = (a, b) => makeRef('q', 'ListItems', a, b, false);
listItemsRef.operationName = 'ListItems';
exports.listItemsRef = listItemsRef;
exports.listItems = function listItems(a, b) { return executeQuery(listItemsRef(a, b)); };

const getItemByIdRef = (a, b) => makeRef('q', 'GetItemById', a, b, true);
getItemByIdRef.operationName = 'GetItemById';
exports.getItemByIdRef = getItemByIdRef;
exports.getItemById = function getItemById(a, b) { return executeQuery(getItemByIdRef(a, b)); };

const getCurrentUserRef = (a, b) => makeRef('q', 'GetCurrentUser', a, b, false);
getCurrentUserRef.operationName = 'GetCurrentUser';
exports.getCurrentUserRef = getCurrentUserRef;
exports.getCurrentUser = function getCurrentUser(a, b) { return executeQuery(getCurrentUserRef(a, b)); };

const getIfFavoritedItemRef = (a, b) => makeRef('q', 'GetIfFavoritedItem', a, b, true);
getIfFavoritedItemRef.operationName = 'GetIfFavoritedItem';
exports.getIfFavoritedItemRef = getIfFavoritedItemRef;
exports.getIfFavoritedItem = function getIfFavoritedItem(a, b) { return executeQuery(getIfFavoritedItemRef(a, b)); };

const searchItemsRef = (a, b) => makeRef('q', 'SearchItems', a, b, true);
searchItemsRef.operationName = 'SearchItems';
exports.searchItemsRef = searchItemsRef;
exports.searchItems = function searchItems(a, b) { return executeQuery(searchItemsRef(a, b)); };
