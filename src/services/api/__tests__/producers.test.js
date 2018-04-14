import Axios from 'axios';
import { getProducer, getCurrentProducer, selectProducer, getProducers, getProducerHistory } from '../producers';
import { LIMIT } from '../../../constants';

describe('Producers API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
        jest.spyOn(Axios, 'post').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
        Axios.post.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
        Axios.post.mockClear();
    });

    it('should provide method for getting specific producer', () => {
        Axios.get.mockReturnValue(Promise.resolve({ data: { producers: [] } }));

        getProducer('testId');

        expect(Axios.get).toHaveBeenCalledWith('/api/producers/direct', { params: { limit: 1000, offset: 0 } });
        // TODO will be replaced by
        // expect(Axios.get).toHaveBeenCalledWith('/api//producers/get/testId');
    });

    // TODO uncomment after completing end-point
    it.skip('should provide method for getting producer history', () => {
        Axios.get.mockReturnValue(jest.fn);

        getProducerHistory('testId');

        expect(Axios.get).toHaveBeenCalledWith('/api/producers/testId/offer/history', {
            params: { limit: 10, offset: 0 }
        });
    });

    it('should provide method for selecting producer', () => {
        Axios.post.mockReturnValue(jest.fn);

        selectProducer('testId');

        expect(Axios.post).toHaveBeenCalledWith('/api/producers/select', {
            producerID: 'testId'
        });
    });

    it('should provide method for getting current producer', async () => {
        Axios.get.mockReturnValue(
            Promise.resolve({
                data: { user: { currentProducerId: 'TEST' } }
            })
        );

        await getCurrentProducer();
        expect(Axios.get).toHaveBeenCalledTimes(2);

        const [[firstCallUrl], [secondCallUrl]] = Axios.get.mock.calls;
        expect(firstCallUrl).toBe('/api/user/getUserData');
        expect(secondCallUrl).toBe('/api/producers/direct');
        // TODO will be replaced by
        // expect(secondCallUrl).toBe('/api/producers/TEST/get');
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
