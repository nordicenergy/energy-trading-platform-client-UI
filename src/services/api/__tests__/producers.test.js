import Axios from 'axios';
import { getProducer } from '../producers';

// TODO remove skip after integration
describe.skip('Producers API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
    });

    it('should provide method for getting specific producer', () => {
        getProducer('testId');
        expect(Axios.get).toHaveBeenCalledWith('/api//producers/get/testId');
    });
});
