import Axios from 'axios';
import { getItems, createItem, deleteItem, updateItem } from '../tempItems';

describe('Test Item API Service', () => {
    beforeEach(done => {
        Axios.get = jest.fn();
        Axios.post = jest.fn();
        Axios.put = jest.fn();
        Axios.delete = jest.fn();
        done();
    });

    it('should provide method for getting items', () => {
        getItems();
        const [call] = Axios.get.mock.calls;
        const [url] = call;

        expect(url).toEqual('/api/v1/items');
    });

    it('should provide method for creating new item', () => {
        createItem({ name: 'test' });
        const [call] = Axios.post.mock.calls;
        const [url, request] = call;

        expect(url).toEqual('/api/v1/items');
        expect(request.name).toEqual('test');
    });

    it('should provide method for deleting item', () => {
        updateItem({ name: 'test' });
        const [call] = Axios.put.mock.calls;
        const [url, request] = call;

        expect(url).toEqual('/api/v1/items');
        expect(request.name).toEqual('test');
    });

    it('should provide method for updating item', () => {
        deleteItem('1');
        const [call] = Axios.delete.mock.calls;

        const [url] = call;
        expect(url).toEqual('/api/v1/items/1');
    });
});
