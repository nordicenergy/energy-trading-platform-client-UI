import Axios from 'axios';
import { dispatcher } from '../store';
import { getToken } from './browserStorage';

export default function configureAxios() {
    const token = getToken();
    // TODO will be implemented
    if (token) {
        dispatcher.dispatchAction('LOGIN', { id: token }, null, false);
    }

    Axios.interceptors.response.use(null, error => {
        if (error.response && error.response.status === 401) {
            dispatcher.dispatchAction('LOGIN', null, error.response, false);
        }
        if (error.response && error.response.status === 403) {
            //TODO go to home page
        }
        throw error;
    });

    // @TODO do not need if we use cookie with httpOnly
    Axios.interceptors.request.use(data => {
        const config = { ...data };

        const accessToken = getToken();

        if (accessToken) {
            config.headers.Authorization = accessToken;
        }

        return config;
    });
}
