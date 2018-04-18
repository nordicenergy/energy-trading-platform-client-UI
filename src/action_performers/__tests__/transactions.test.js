import { dispatcher } from '../../store';

import { performGetRecentTransactions } from '../transactions';

describe('Transactions action performers', () => {
    beforeEach(() => {
        dispatcher.dispatchPromise = jest.fn();
    });

    it('should call dispatch method for getting recent transactions', () => {
        performGetRecentTransactions('testId');

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            Transactions: { recentTransactions: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('getRecentTransactions');
        expect(type).toEqual('GET_RECENT_TRANSACTIONS');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(['testId']);
    });
});
