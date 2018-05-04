import Axios from 'axios';
import { SESSION_API_URL, LIMIT } from '../../constants';
import { PATHS } from '../routes';

export function getRecentTransactions(userId, page = 0) {
    const currentBalance = {};

    return Axios.get(`${SESSION_API_URL}/user/${userId}/transactions/getBalance`)
        .then(response => {
            const { balance, lastUpdatedAt } = response.data;
            currentBalance.balance = balance || 0;
            currentBalance.date = lastUpdatedAt || Date.now();

            return Axios.get(`${SESSION_API_URL}/user/${userId}/transactions/getHistory`, {
                params: { limit: LIMIT, offset: page * LIMIT }
            });
        })
        .then(response => {
            response.data.currentBalance = currentBalance;
            const { transactions = [] } = response.data;
            transactions.forEach(tx => {
                tx.details = {
                    hash: tx.transactionHash || '--',
                    price: tx.price || 0,
                    amount: tx.energyAmount || 0,
                    from: tx.producerName || '--',
                    fromUrl: tx.producerID
                        ? `${PATHS.buyEnergy.path}/${PATHS.producer.id}/${tx.producerID}`
                        : '#producer',
                    url: tx.detailsLink || '#details'
                };
            });
            response.data.transactions = transactions;
            return response;
        });
}
