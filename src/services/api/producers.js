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
            // eslint-disable-next-line
            const producer = producers.find(producer => producer.id == id) || {};
            // TODO in future need to think about Adapters
            result.data.producer = {
                ...producer,
                location: `${producer.street}, ${producer.city}, ${producer.postcode} (${producer.country})`,
                annualProduction: producer.productionOfLastDay,
                purchased: producer.energyPurchased,
                marketPrice: 2.5,
                ethereumAddress: producer.dlAddress
            };
        }
        return result;
    });
}

export function getProducerHistory(/* producerId, { page = 0 } = {} */) {
    return Promise.resolve({
        data: {
            strategies: [
                {
                    date: 'Sep 12',
                    value: 'Change amount of energy 3000 kWh'
                },
                {
                    date: 'Feb 22',
                    value: 'Price change 2.4 ct/kWh'
                },
                {
                    date: 'Feb 12',
                    value: 'Change amount of energy 2300 kWh'
                },
                {
                    date: 'Jan 14',
                    value: 'Price change 3 ct/kWh'
                }
            ]
        }
    });
    // return Axios.get(`${SESSION_API_URL}/producers/${producerId}/offer/history`, {
    //     params: { limit: LIMIT, offset: page * LIMIT }
    // });
}

export function selectProducer(producerId) {
    return Axios.post(`${SESSION_API_URL}/producers/select`, { producerID: producerId });
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
