import Axios from 'axios';
import { getProducer, getCurrentProducer, getProducers } from '../producers';
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

    // TODO remove skip after integration
    it.skip('should provide method for getting current producer', async () => {
        Axios.get.mockReturnValue(
            Promise.resolve({
                data: { user: { currentProducerId: 'TEST' } }
            })
        );

        await getCurrentProducer();
        expect(Axios.get).toHaveBeenCalledTimes(2);

        const [firstCallUrl] = Axios.get.mock.calls[0];
        const [secondCallUrl] = Axios.get.mock.calls[1];
        expect(firstCallUrl).toBe('/api/user/getUserData');
        expect(secondCallUrl).toBe('/api/producers/TEST/get');

        Axios.get.mockClear();
        Axios.get.mockReturnValue(Promise.resolve({}));

        await getCurrentProducer();
        expect(Axios.get).toHaveBeenCalledTimes(1);
        expect(Axios.get).toHaveBeenCalledWith('/api/user/getUserData');

        Axios.get.mockImplementation(jest.fn);
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
