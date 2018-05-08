import { dispatcher } from '../store';
import { addOwnedProducerOffer, getOwnedProducerOffer } from '../services/api/offers';

export function performGetOwnedProducerOffer(userId) {
    dispatcher.dispatchPromise(
        getOwnedProducerOffer,
        'GET_OWNED_PRODUCER_OFFER',
        state => state.Offer.ownedProducerOffer.loading,
        [userId]
    );
}

export function performAddOwnedProducerOffer(producerId, offer) {
    dispatcher.dispatchPromise(
        addOwnedProducerOffer,
        'ADD_OWNED_PRODUCER_OFFER',
        state => state.Offer.ownedProducerOffer.loading,
        [producerId, offer]
    );
}
