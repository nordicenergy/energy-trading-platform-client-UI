import { dispatcher } from '../../store';

import {
    performGetItems,
    performCreateItem,
    performUpdateItem,
    performDeleteItem
} from '../tempItems';

describe('Test item action performers', () => {
    beforeEach(done => {
        dispatcher.dispatchPromise = jest.fn();
        done();
    });

    it('should call dispatch method for get test items', done => {
        performGetItems();

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            TempItems: { items: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('getItems');
        expect(type).toEqual('GET_ITEMS');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(undefined);

        done();
    });

    it('should call dispatch method for create new test item', done => {
        const data = { name: 'new item' };
        performCreateItem(data);

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            TempItems: { createdItem: { loading: 'TEST' } }
        });
        const [item] = meta;

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('createItem');
        expect(type).toEqual('CREATE_ITEM');
        expect(loading).toEqual('TEST');
        expect(item).toEqual(data);

        done();
    });

    it('should call dispatch method for update test item', done => {
        const data = { name: 'updated item' };
        performUpdateItem(data);

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            TempItems: { updatedItem: { loading: 'TEST' } }
        });
        const [item] = meta;

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('updateItem');
        expect(type).toEqual('UPDATE_ITEM');
        expect(loading).toEqual('TEST');
        expect(item).toEqual(data);

        done();
    });

    it('should call dispatch method for delete test item', done => {
        const id = '1';
        performDeleteItem(id);

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            TempItems: { deletedItem: { loading: 'TEST' } }
        });
        const [itemId] = meta;

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('deleteItem');
        expect(type).toEqual('DELETE_ITEM');
        expect(loading).toEqual('TEST');
        expect(itemId).toEqual(id);

        done();
    });
});
