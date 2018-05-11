import Axios from 'axios';
import { SESSION_API_URL, LIMIT } from '../../constants';
import { PATHS } from '../routes';
import web3Service from '../web3';

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

// FIXME cover by unit tests, rewrite to async/await
export function getOpenTradePositions(/* address, abi */) {
    const intermediateData = { producers: [] };
    const result = { data: [] };

    return Axios.get(`${SESSION_API_URL}/producers/direct`, {
        params: { limit: 1000, offset: 0 }
    })
        .then(response => {
            if (response.data && Array.isArray(response.data.producers)) {
                const { producers } = response.data;
                intermediateData.producers = producers;
                return web3Service.getCurrentBids();
            }
            return [];
        })
        .then((bids = {}) => {
            const { data = [] } = bids;
            result.data = data.map(bid => {
                const { producers } = intermediateData;
                const position = {};
                position.offerAddress = bid.producer;
                position.producerName = (producers.find(p => p.dlAddress === bid.producer) || {}).name || '';
                position.offerIssued = bid.day;
                position.validOn = '';
                position.energyOffered = '';
                position.energyAvailable = bid.energy;
                position.price = bid.price;
                return position;
            });
            return result;
        });
}
