// import Axios from 'axios';
// import { SESSION_API_URL } from '../../constants';
import { adaptTransactionsData } from '../adapters/transactions/transactions';

export function getRecentTransactions(userId) {
    // return Axios.get(`/user/${userId}/transactions/getHistory?limit=10`);
    return Promise.resolve({
        data: {
            numberOfTransactions: 42,
            currentBalance: {
                date: 1523717181229,
                amount: 1.04
            },
            transactions: [
                {
                    id: 0,
                    date: 1523717181229,
                    energyAmount: 10.81,
                    producerID: 25,
                    transactionAmount: 0.81
                },
                {
                    id: 1,
                    date: 1523717181229,
                    energyAmount: 10.81,
                    producerID: 24,
                    transactionAmount: 1.04
                },
                {
                    id: 2,
                    date: 1523717181229,
                    energyAmount: 10.81,
                    producerID: 23,
                    transactionAmount: 1.85
                },
                {
                    id: 3,
                    date: 1523717181229,
                    energyAmount: 10.81,
                    producerID: 22,
                    transactionAmount: 1.04
                }
            ]
        }
    }).then(response => {
        const { data = {} } = response;
        return adaptTransactionsData(data);
    });
}
