import Axios from 'axios';
import { SESSION_API_URL, LIMIT, BLOCKCHAIN_SCANNER_URLS } from '../../constants';
import { PATHS } from '../routes';
import web3Service, { META_MASK_NETWORKS } from '../web3';
import { formatCurrency, formatDateTime, formatFloat } from '../formatter';

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
                    status: tx.blockchainStatus || '--',
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
                return Promise.all([web3Service.getCurrentBids(), web3Service.getNetworkId()]);
            }
            return [];
        })
        .then(([bids = {}, network = {}]) => {
            const { data = [] } = bids;
            const { data: { id: networkId } = {} } = network;

            const networkName = Object.keys(META_MASK_NETWORKS).find(key => META_MASK_NETWORKS[key] === networkId);
            const scannerURL = `${BLOCKCHAIN_SCANNER_URLS[networkName]}/address`;

            result.data = data.map(bid => {
                const { producers } = intermediateData;
                const producer = producers.find(({ dlAddress }) => dlAddress === bid.producer);
                return {
                    offerAddressUrl: networkName ? `${scannerURL}/${bid.producer}` : '',
                    offerAddress: bid.producer,
                    producerUrl: producer ? `${PATHS.buyEnergy.path}/${PATHS.producer.id}/${producer.id}` : null,
                    producerName: producer.name || '',
                    offerIssued: formatDateTime(bid.day),
                    offerIssuedTimestamp: parseInt(bid.day, 10),
                    validOn: '--',
                    energyOffered: '--',
                    energyAvailable: formatFloat(bid.energy / 100000),
                    energyAvailableFloat: parseFloat(bid.energy / 100000),
                    price: formatCurrency(bid.price / 1000)
                };
            });
            return result;
        });
}
