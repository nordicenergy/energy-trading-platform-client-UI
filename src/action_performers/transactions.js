import { getRecentTransactions } from '../services/api/transactions';

import { dispatcher } from '../store';

export function performGetRecentTransactions() {
    dispatcher.dispatchPromise(
        getRecentTransactions,
        'GET_RECENT_TRANSACTIONS',
        state => state.Transactions.recentTransactions.loading
    );
}
