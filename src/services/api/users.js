import Axios from 'axios';
import { SESSION_API_URL } from '../../constants';

export function login(credentials) {
    return Axios.post(`${SESSION_API_URL}/user/login`, credentials);
}

export function logout() {
    return Axios.get(`${SESSION_API_URL}/user/logout`);
}

export function getUserData() {
    return Axios.get(`${SESSION_API_URL}/user/getUserData`).then(response => {
        // TODO: remove after date format will be unix timestamp
        const { data = {} } = response;
        const { user = {} } = data;
        const birthdayData = user.birthday || '';
        const [day, month, year] = birthdayData.split('.');
        const formattedBirthdayData = new Date(`${year}-${month}-${day}`);
        return {
            data: {
                user: {
                    ...user,
                    birthday: formattedBirthdayData.getTime()
                }
            }
        };
    });
}

export function updateUserData(userData) {
    // TODO replace on real api call
    return Promise.resolve({
        data: {
            user: userData
        }
    });
}
