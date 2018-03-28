// import Axios from 'axios';
// import { SESSION_API_URL } from '../../constants';

export function login(/* credentials */) {
    // TODO
    // return Axios.post(`${SESSION_API_URL}/user/login`, credentials);
    return Promise.resolve({
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
        },
        authentication: {
            authenticationToken: 'DC124947VDE435FVA&23',
            expiresAt: 'UTC timestamp'
        }
    });
}

export function logout() {
    // TODO
    // return Axios.get(`${SESSION_API_URL}/user/logout`);
    return Promise.resolve({});
}

export function getUserData() {
    // TODO
    // return Axios.get(`${SESSION_API_URL}/user/getUserData`);
    return Promise.resolve({
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
    });
}
