import Axios from 'axios';
import { dispatcher } from '../store';
import { getToken } from './browserStorage';
import history from './history';

export default function configureAxios() {
    const token = getToken();

    if (token) {
        dispatcher.dispatchAction('LOGIN', null, null, false);
    }

    Axios.interceptors.response.use(null, error => {
        if (error.response && error.response.status === 401) {
            dispatcher.dispatchAction('LOGIN', null, error.response, false);
            return dispatcher.dispatchAction('LOGOUT', {}, null, false);
        }
        if (error.response && error.response.status === 403) {
            return history.push('/');
        }
        throw error;
    });

    // @TODO do not need if we use cookie with httpOnly
    Axios.interceptors.request.use(data => {
        const config = { ...data };

        const accessToken = getToken();

        if (accessToken) {
            if (!config.headers) {
                config.headers = {};
            }

            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    });
}
