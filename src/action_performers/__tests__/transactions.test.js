import { dispatcher } from '../../store';

import {
    performGetAvailableAddresses,
    performGetRecentTransactions,
    performGetOpenTradePositions
} from '../transactions';
import { getOpenTradePositions } from '../../services/api/transactions';

describe('Transactions action performers', () => {
    beforeEach(() => {
        dispatcher.dispatchPromise = jest.fn();
    });

    it('should call dispatch method for getting recent transactions', () => {
        performGetRecentTransactions('testId', 1);

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            Transactions: { recentTransactions: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('getRecentTransactions');
        expect(type).toEqual('GET_RECENT_TRANSACTIONS');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(['testId', 1]);
    });

    it('should call dispatch method for getting available addresses', () => {
        performGetAvailableAddresses();

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            Transactions: { availableAddresses: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('bound getUserAddresses');
        expect(type).toEqual('GET_AVAILABLE_ADDRESSES');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(undefined);
    });

    it('should call dispatch method for getting open trade positions', () => {
        performGetOpenTradePositions(1);

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            Transactions: { openTradePositions: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('getOpenTradePositions');
        expect(type).toEqual('GET_OPEN_TRADE_POSITIONS');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual([1]);
    });
});
