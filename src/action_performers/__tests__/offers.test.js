import { performAddOwnedProducerOffer, performGetOwnedProducerOffer } from '../offers';
import { dispatcher } from '../../store';

describe('Producers action performers', () => {
    beforeEach(() => {
        dispatcher.dispatchPromise = jest.fn();
    });

    it('should call dispatch method for getting owned producer', () => {
        performGetOwnedProducerOffer('testId');

        const [[method, type, loadingFunc, meta]] = dispatcher.dispatchPromise.mock.calls;
        const loading = loadingFunc({
            Offer: { ownedProducerOffer: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise).toHaveBeenCalledTimes(1);
        expect(method.name).toEqual('getOwnedProducerOffer');
        expect(type).toEqual('GET_OWNED_PRODUCER_OFFER');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(['testId']);
    });

    it('should call dispatch method for adding owned producer offer', () => {
        performAddOwnedProducerOffer('testId', { id: 'testId' });

        const [[method, type, loadingFunc, meta]] = dispatcher.dispatchPromise.mock.calls;
        const loading = loadingFunc({
            Offer: { ownedProducerOffer: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise).toHaveBeenCalledTimes(1);
        expect(method.name).toEqual('addOwnedProducerOffer');
        expect(type).toEqual('ADD_OWNED_PRODUCER_OFFER');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(['testId', { id: 'testId' }]);
    });
});
