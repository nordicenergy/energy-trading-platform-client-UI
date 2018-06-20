import {
    getRecentTransactions,
    getOpenTradePositions,
    performExactTransaction,
    getLedgers
} from '../services/api/transactions';
import web3Service from '../services/web3';

import { dispatcher } from '../store';

export function performGetRecentTransactions(userId, page) {
    dispatcher.dispatchPromise(
        getRecentTransactions,
        'GET_RECENT_TRANSACTIONS',
        state => state.Transactions.recentTransactions.loading,
        [userId, page]
    );
}

export function performGetAvailableAddresses() {
    dispatcher.dispatchPromise(
        web3Service.getUserAddresses.bind(web3Service),
        'GET_AVAILABLE_ADDRESSES',
        state => state.Transactions.availableAddresses.loading
    );
}

export function performGetOpenTradePositions(userId) {
    dispatcher.dispatchPromise(
        getOpenTradePositions,
        'GET_OPEN_TRADE_POSITIONS',
        state => state.Transactions.openTradePositions.loading,
        [userId]
    );
}

// TODO cover by unit tests
export function performPerformTransaction(tradePosition, contractAddress, ledger, ledgerAddress) {
    dispatcher.dispatchPromise(
        performExactTransaction,
        'PERFORM_TRANSACTION',
        state => state.Transactions.performedTransaction.loading,
        [tradePosition, contractAddress, ledger, ledgerAddress]
    );
}

export function performGetLedgerNetworks() {
    dispatcher.dispatchPromise(getLedgers, 'GET_LEDGERS', state => state.Transactions.ledgerNetworks.loading);
}
