import Axios from 'axios';
import { SESSION_API_URL, LIMIT } from '../../constants';

export function getRecentTransactions(userId) {
    const currentBalance = {};

    return Axios.get(`${SESSION_API_URL}/user/${userId}/transactions/getBalance`)
        .then(response => {
            const { balance, lastUpdatedAt } = response.data;
            currentBalance.balance = balance || 0;
            currentBalance.date = lastUpdatedAt || Date.now();

            return Axios.get(`${SESSION_API_URL}/user/${userId}/transactions/getHistory`, {
                params: { limit: LIMIT, offset: 0 }
            });
        })
        .then(response => {
            response.data.currentBalance = currentBalance;
            return response;
        });
}
