import {
    getItems,
    createItem,
    updateItem,
    deleteItem
} from '../services/api/tempItems';

import { dispatcher } from '../store';

export function performGetItems() {
    dispatcher.dispatchPromise(
        getItems,
        'GET_ITEMS',
        state => state.TempItems.items.loading
    );
}

export function performCreateItem(data) {
    dispatcher.dispatchPromise(
        createItem,
        'CREATE_ITEM',
        state => state.TempItems.createdItem.loading,
        [data]
    );
}

export function performUpdateItem(data) {
    dispatcher.dispatchPromise(
        updateItem,
        'UPDATE_ITEM',
        state => state.TempItems.updatedItem.loading,
        [data]
    );
}

export function performDeleteItem(id) {
    dispatcher.dispatchPromise(
        deleteItem,
        'DELETE_ITEM',
        state => state.TempItems.deletedItem.loading,
        [id]
    );
}
