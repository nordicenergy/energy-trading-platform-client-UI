import Axios from 'axios';
import { getUserData } from './users';
import { SESSION_API_URL, LIMIT } from '../../constants';

export function getProducer(id) {
    const result = { data: { producer: {} } };
    // TODO it's temporary ugly solution, please, replace by needed API call
    // return Axios.get(`${SESSION_API_URL}/producers/${id}/get`);
    return Axios.get(`${SESSION_API_URL}/producers/direct`, {
        params: { limit: 1000, offset: 0 }
    }).then(response => {
        if (response.data && Array.isArray(response.data.producers)) {
            const { producers } = response.data;
            const producer = producers.find(producer => producer.id == id) || {};
            // TODO in future need to think about Adapters
            result.data.producer = {
                ...producer,
                location: `${producer.street}, ${producer.city}, ${producer.country} ${producer.postcode}`,
                annualProduction: producer.productionOfLastDay,
                purchased: producer.energyPurchased,
                marketPrice: 2.5
            };
        }
        return result;
    });
}

export function getProducers({ page = 0 } = {}) {
    return Axios.get(`${SESSION_API_URL}/producers/direct`, {
        params: { limit: LIMIT, offset: page * LIMIT }
    });
}

export function getCurrentProducer() {
    return getUserData().then(response => {
        const { data } = response;
        return getProducer(data && data.user && data.user.currentProducerId);
    });
}
