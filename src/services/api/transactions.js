import Axios from 'axios';
import { SESSION_API_URL, LIMIT } from '../../constants';

export function getRecentTransactions(userId) {
    return Axios.get(`${SESSION_API_URL}/user/${userId}/transactions/getHistory`, {
        params: { limit: LIMIT, offset: 0 }
    });
}
