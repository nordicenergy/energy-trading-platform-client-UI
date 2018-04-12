import Axios from 'axios';
import { getProducer, getProducers } from '../producers';
import { LIMIT } from '../../../constants';

describe('Producers API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
    });

    // TODO remove skip after integration
    it.skip('should provide method for getting specific producer', () => {
        getProducer('testId');
        expect(Axios.get).toHaveBeenCalledWith('/api//producers/get/testId');
    });

    it('should provide method for getting producers list', () => {
        getProducers();
        expect(Axios.get).toHaveBeenCalledWith(
            '/api/producers/direct',
            expect.objectContaining({
                params: {
                    limit: LIMIT,
                    offset: 0
                }
            })
        );
        Axios.get.mockClear();

        getProducers({ page: 5 });
        expect(Axios.get).toHaveBeenCalledWith(
            '/api/producers/direct',
            expect.objectContaining({
                params: {
                    limit: LIMIT,
                    offset: LIMIT * 5
                }
            })
        );
    });
});
