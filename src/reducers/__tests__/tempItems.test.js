import { itemsReducer, initialState } from '../tempItems';

const { ITEMS, ACTIONS } = fixtures();
const DIRTY_STATE = {
    ...initialState,
    items: { ...initialState.items, data: ITEMS }
};

describe('Test items reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_ITEMS', done => {
            const result = itemsReducer(initialState, ACTIONS.getItems.pending);
            expect(result.items.loading).toEqual(true);
            expect(result.items.error).toEqual(null);
            expect(result.items.data.length).toEqual(0);

            done();
        });
        it('should handle CREATE_ITEM', done => {
            const result = itemsReducer(
                DIRTY_STATE,
                ACTIONS.createItem.pending
            );
            expect(result.createdItem.loading).toEqual(true);
            expect(result.createdItem.error).toEqual(null);
            expect(result.createdItem.data).toEqual({});
            expect(result.items.data.length).toEqual(5);

            done();
        });
        it('should handle UPDATE_ITEM', done => {
            const result = itemsReducer(
                DIRTY_STATE,
                ACTIONS.updatedItem.pending
            );
            expect(result.updatedItem.loading).toEqual(true);
            expect(result.updatedItem.error).toEqual(null);
            expect(result.updatedItem.data).toEqual({});
            expect(result.items.data.length).toEqual(5);

            done();
        });
        it('should handle DELETE_ITEM', done => {
            const result = itemsReducer(
                DIRTY_STATE,
                ACTIONS.deletedItem.pending
            );
            expect(result.deletedItem.loading).toEqual(true);
            expect(result.deletedItem.error).toEqual(null);
            expect(result.deletedItem.data).toEqual({});
            expect(result.items.data.length).toEqual(5);

            done();
        });
    });
    describe('Error cases:', () => {
        it('should handle GET_ITEMS', done => {
            const result = itemsReducer(initialState, ACTIONS.getItems.fail);
            expect(result.items.loading).toEqual(false);
            expect(result.items.error).toEqual('Error Message');
            expect(result.items.data.length).toEqual(0);

            done();
        });
        it('should handle CREATE_ITEM', done => {
            const result = itemsReducer(DIRTY_STATE, ACTIONS.createItem.fail);
            expect(result.createdItem.loading).toEqual(false);
            expect(result.createdItem.error).toEqual('Error Message');
            expect(result.createdItem.data).toEqual({});
            expect(result.items.data.length).toEqual(5);

            done();
        });
        it('should handle UPDATE_ITEM', done => {
            const result = itemsReducer(DIRTY_STATE, ACTIONS.updatedItem.fail);
            expect(result.updatedItem.loading).toEqual(false);
            expect(result.updatedItem.error).toEqual('Error Message');
            expect(result.updatedItem.data).toEqual({});
            expect(result.items.data.length).toEqual(5);

            done();
        });
        it('should handle DELETE_ITEM', done => {
            const result = itemsReducer(DIRTY_STATE, ACTIONS.deletedItem.fail);
            expect(result.deletedItem.loading).toEqual(false);
            expect(result.deletedItem.error).toEqual('Error Message');
            expect(result.deletedItem.data).toEqual({});
            expect(result.items.data.length).toEqual(5);

            done();
        });
    });
    describe('Success cases:', () => {
        it('should handle GET_ITEMS', done => {
            const result = itemsReducer(initialState, ACTIONS.getItems.success);
            expect(result.items.loading).toEqual(false);
            expect(result.items.error).toEqual(null);
            expect(result.items.data.length).toEqual(5);

            done();
        });
        it('should handle CREATE_ITEM', done => {
            const result = itemsReducer(
                DIRTY_STATE,
                ACTIONS.createItem.success
            );
            expect(result.createdItem.loading).toEqual(false);
            expect(result.createdItem.error).toEqual(null);
            expect(result.createdItem.data.name).toEqual('created item');
            expect(result.items.data.length).toEqual(6);

            done();
        });
        it('should handle UPDATE_ITEM', done => {
            const result = itemsReducer(
                DIRTY_STATE,
                ACTIONS.updatedItem.success
            );
            expect(result.updatedItem.loading).toEqual(false);
            expect(result.updatedItem.error).toEqual(null);
            expect(result.updatedItem.data.name).toEqual('item 5');
            expect(result.items.data.length).toEqual(5);

            done();
        });
        it('should handle DELETE_ITEM', done => {
            const result = itemsReducer(
                DIRTY_STATE,
                ACTIONS.deletedItem.success
            );
            expect(result.deletedItem.loading).toEqual(false);
            expect(result.deletedItem.error).toEqual(null);
            expect(result.deletedItem.data.name).toEqual('item 5');
            expect(result.items.data.length).toEqual(4);

            done();
        });
    });
});

function fixtures() {
    const ITEMS = [
        { name: 'item 1' },
        { name: 'item 2' },
        { name: 'item 3' },
        { name: 'item 4' },
        { name: 'item 5' }
    ];

    const ACTIONS = {
        getItems: {
            success: {
                type: 'GET_ITEMS',
                payload: [...ITEMS],
                error: null,
                loading: false
            },
            fail: {
                type: 'GET_ITEMS',
                payload: null,
                error: 'Error Message',
                loading: false
            },
            pending: {
                type: 'GET_ITEMS',
                payload: null,
                error: null,
                loading: true
            }
        },
        createItem: {
            success: {
                type: 'CREATE_ITEM',
                payload: { name: 'created item' },
                error: null,
                loading: false
            },
            fail: {
                type: 'CREATE_ITEM',
                payload: null,
                error: 'Error Message',
                loading: false
            },
            pending: {
                type: 'CREATE_ITEM',
                payload: null,
                error: null,
                loading: true
            }
        },
        updatedItem: {
            success: {
                type: 'UPDATE_ITEM',
                payload: { name: 'item 5' },
                error: null,
                loading: false
            },
            fail: {
                type: 'UPDATE_ITEM',
                payload: null,
                error: 'Error Message',
                loading: false
            },
            pending: {
                type: 'UPDATE_ITEM',
                payload: null,
                error: null,
                loading: true
            }
        },
        deletedItem: {
            success: {
                type: 'DELETE_ITEM',
                payload: { name: 'item 5' },
                error: null,
                loading: false,
                meta: ['item 5']
            },
            fail: {
                type: 'DELETE_ITEM',
                payload: null,
                error: 'Error Message',
                loading: false,
                meta: ['item 5']
            },
            pending: {
                type: 'DELETE_ITEM',
                payload: null,
                error: null,
                loading: true,
                meta: ['item 5']
            }
        }
    };
    return { ACTIONS, ITEMS };
}
