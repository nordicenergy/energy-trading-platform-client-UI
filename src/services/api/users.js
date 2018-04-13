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
                firstName: 'John',
                lastName: 'Smith',
                email: 'johnsmith@gmail.com',
                currentProducerId: '1234567',
                currentProducerName: 'Peter Producer',
                currentProducerPicture: '/plantImg/peter_producer.jpg',
                lastBillAvailable: true,
                lastBillAmount: '35.24',
                lastBillDate: 'December;',
                userStatus: 'string',
                street: 'Sesame Street',
                postcode: '12345',
                city: 'Berlin',
                country: 'Germany',
                birthday: '1985-12-31',
                IBAN: 'DE00 0000 0000 0000 0000 00',
                BIC: 'BELADEBEXXX',
                streetNumber: '11'
            }
        }
    });
}

export function updateUserData(userData) {
    // TODO replace on real api call
    return Promise.resolve({
        data: {
            user: {
                id: 0,
                firstName: 'John',
                lastName: 'Smith',
                email: 'johnsmith@gmail.com',
                currentProducerId: 25,
                lastBillAvailable: true,
                lastBillAmount: '35.24',
                lastBillDate: 'December;',
                userStatus: 'string',
                street: 'Sesame Street',
                postcode: '12345',
                city: 'Berlin',
                country: 'Germany',
                birthday: '31.12.1985',
                IBAN: 'DE00 0000 0000 0000 0000 00',
                BIC: 'BELADEBEXXX',
                streetNumber: '11',
                ...userData
            }
        }
    });
}
