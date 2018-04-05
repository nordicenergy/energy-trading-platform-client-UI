import Axios from 'axios';
import { SESSION_API_URL } from '../../constants';

export function login(credentials) {
    return Axios.post(`${SESSION_API_URL}/user/login`, credentials);
}

export function logout() {
    return Axios.get(`${SESSION_API_URL}/user/logout`);
}

export function getUserData() {
    // TODO replace on real api call
    // return Axios.get(`${SESSION_API_URL}/user/getUserData`);
    return Promise.resolve({
        data: {
            user: {
                id: 0,
                firstName: 'string',
                lastName: 'string',
                email: 'string',
                currentProducerName: 'Peter Producer',
                currentProducerPicture: '/plantImg/peter_producer.jpg',
                lastBillAvailable: true,
                lastBillAmount: '35.24',
                lastBillDate: 'December;',
                userStatus: 'string'
            }
        }
    });
}
