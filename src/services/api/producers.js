import Axios from 'axios';
import { SESSION_API_URL, LIMIT } from '../../constants';

export function getProducer(id) {
    // TODO replace on real api call
    // return Axios.get(`${SESSION_API_URL}/producers/get/${id}`);
    return Promise.resolve({
        data: {
            producer: {
                name: 'Peter Producer',
                price: 2.4,
                marketPrice: 2.5,
                annualProduction: 3000,
                purchased: 1300,
                capacity: 8,
                dates: 'Sep 12 - Feb 22',
                tradingStrategy: false,
                id: id,
                complete: false,
                plantType: 'solar',
                picture: null,
                // 'https://pbs.twimg.com/profile_images/929933611754708992/ioSgz49P_400x400.jpg',
                location: 'Lippendorf, Neukieritzsch',
                description: `LTN Supply & Trading is a leading European energy
                  trading house and the interface between the LTN Group's
                  operating companies and global wholesale markets for
                  energy and energy-related raw materials in both their
                  physical and/or derivative forms.`
            }
        }
    });
}

export function getProducers({ page = 0 } = {}) {
    return Axios.get(`${SESSION_API_URL}/producers/direct`, {
        params: { limit: LIMIT, offset: page * LIMIT }
    });
}

export function getCurrentProducer() {
    // TODO replace on real api call
    // return Axios.get(`${SESSION_API_URL}/user/getUserData`).then(response => {
    //     if (
    //         response.data &&
    //         response.data.user &&
    //         response.data.user.currentProducerId
    //     ) {
    //         const producerId = response.data.user.currentProducerId;
    //         return Axios.get(`${SESSION_API_URL}/producers/${producerId}/get`);
    //     }
    // });

    return Promise.resolve({
        data: {
            producer: {
                id: 3,
                name: 'Peter Producer',
                description: 'Green plant close to Hamburg run by a farmer, John Doe',
                picture: '/plantImg/peter_producer.jpg',
                capacity: 600,
                price: 6.4,
                plantType: 'solar',
                tradingStrategy: false,
                complete: false,
                productionOfLastDay: 240,
                street: 'Sesame Street',
                postcode: '12345',
                city: 'Berlin',
                country: 'DE',
                energyPurchased: 2400
            }
        }
    });
}
