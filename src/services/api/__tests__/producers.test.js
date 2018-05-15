import Axios from 'axios';
import {
    getProducer,
    getCurrentProducer,
    selectProducer,
    getProducers,
    getProducerHistory,
    getOwnedProducerOffer,
    addOwnedProducerOffer,
    getCurrentMarketPrice,
    getOwnedProducerOffersHistory
} from '../producers';
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

    it('should provide method for getting specific producer', async () => {
        Axios.get.mockReturnValue(
            Promise.resolve({
                data: {
                    producer: {
                        street: 'October',
                        postcode: '230000',
                        city: 'Seit',
                        country: 'Zakovia',
                        productionOfLastDay: 200,
                        energyPurchased: 100,
                        dlAddress: '0x1'
                    }
                }
            })
        );

        const producer = await getProducer('testId');
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/testId/get');
        expect(producer).toEqual({
            data: {
                producer: {
                    annualProduction: 200,
                    city: 'Seit',
                    country: 'Zakovia',
                    dlAddress: '0x1',
                    energyPurchased: 100,
                    ethereumAddress: '0x1',
                    location: 'October, 230000 Seit, Zakovia',
                    postcode: '230000',
                    productionOfLastDay: 200,
                    purchased: 100,
                    street: 'October'
                }
            }
        });
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
        expect(secondCallUrl).toBe('/api/producers/TEST/get');
    });

    it('should provide method for getting producers list', () => {
        getProducers();
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/direct?', {
            params: {
                limit: LIMIT,
                offset: 0
            }
        });
        Axios.get.mockClear();

        getProducers({ page: 5 });
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/direct?', {
            params: {
                limit: LIMIT,
                offset: LIMIT * 5
            }
        });
    });

    it('should provide method for getting producers list', () => {
        getProducers({ filter: ['test1', 'test2'] });
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/direct?type=test1&type=test2', {
            params: {
                limit: LIMIT,
                offset: 0
            }
        });
    });

    it('should provide method for getting owned producer offer info', () => {
        getOwnedProducerOffer('testId');
        expect(Axios.get).toHaveBeenCalledWith('/api/user/testId/producer/getOwnedProducer');
    });

    it('should provide method for adding offer of owned producer', () => {
        addOwnedProducerOffer('testId', { id: 'testOfferId' });
        expect(Axios.post).toHaveBeenCalledWith('/api/producers/testId/set', { id: 'testOfferId' });
    });

    it('should provide method for getting current market price', () => {
        getCurrentMarketPrice();
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/1/get');
    });

    it('should provide method for getting owned producer offers history', () => {
        getOwnedProducerOffersHistory('testId');
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/testId/offer/history');
    });
});
