import { getRecentTransactions, getOpenTradePositions } from '../services/api/transactions';
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
        web3Service.getAddresses.bind(web3Service),
        'GET_AVAILABLE_ADDRESSES',
        state => state.Transactions.availableAddresses.loading
    );
}

export function performGetOpenTradePositions() {
    dispatcher.dispatchPromise(
        getOpenTradePositions,
        'GET_OPEN_TRADE_POSITIONS',
        state => state.Transactions.openTradePositions.loading
    );
}

// TODO cover by unit tests
export function performPerformTransaction(tradePosition) {
    dispatcher.dispatchPromise(
        web3Service.performTransaction.bind(web3Service),
        'PERFORM_TRANSACTION',
        state => state.Transactions.performedTransaction.loading,
        [tradePosition]
    );
}
