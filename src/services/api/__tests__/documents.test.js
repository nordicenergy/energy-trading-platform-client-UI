import Axios from 'axios';
import { getDocuments } from '../documents';

describe('Documents API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
    });

    // TODO uncomment after completing end-point
    it.skip('should provide method for getting documents', () => {
        Axios.get.mockReturnValue(jest.fn);

        getDocuments();

        expect(Axios.get).toHaveBeenCalledWith('/api/documents');
    });
});
