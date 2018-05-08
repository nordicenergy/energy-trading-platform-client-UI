import Axios from 'axios/index';
import { SESSION_API_URL } from '../../constants';

export function getOwnedProducerOffer(userId) {
    return Axios.get(`${SESSION_API_URL}/user/${userId}/producer/getOwnedProducer`);
}

export function addOwnedProducerOffer(producerId, offer) {
    return Axios.post(`${SESSION_API_URL}/producers/${producerId}/set`, offer);
}
