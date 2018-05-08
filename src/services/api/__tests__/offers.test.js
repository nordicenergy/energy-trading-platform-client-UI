import Axios from 'axios';
import { addOwnedProducerOffer, getOwnedProducerOffer } from '../offers';

describe('Owned Producers Offers API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
        jest.spyOn(Axios, 'post').mockImplementation(jest.fn);
    });

    it('should provide method for getting owned producer info', () => {
        getOwnedProducerOffer('testId');
        expect(Axios.get).toHaveBeenCalledWith('/api/user/testId/producer/getOwnedProducer');
    });

    it('should provide method for adding offer of owned producer', () => {
        addOwnedProducerOffer('testId', { id: 'testOfferId' });
        expect(Axios.post).toHaveBeenCalledWith('/api/producers/testId/set', { id: 'testOfferId' });
    });
});
