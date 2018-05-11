import { transactionsReducer, initialState } from '../transactions';

const { ACTIONS } = fixtures();

describe('Transactions reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_RECENT_TRANSACTIONS', () => {
            const result = transactionsReducer(initialState, ACTIONS.getRecentTransactions.pending);
            expect(result.recentTransactions.loading).toEqual(true);
            expect(result.recentTransactions.error).toEqual(null);
            expect(result.recentTransactions.data).toEqual({
                currentBalance: {},
                transactions: [],
                numberOfTransactions: 0
            });
        });
        it('should handle GET_AVAILABLE_ADDRESSES', () => {
            const result = transactionsReducer(initialState, ACTIONS.getAvailableAddresses.pending);
            expect(result.availableAddresses.loading).toEqual(true);
            expect(result.availableAddresses.error).toEqual(null);
            expect(result.availableAddresses.data).toEqual({
                addresses: []
            });
        });
    });
    describe('Error cases:', () => {
        it('should handle GET_RECENT_TRANSACTIONS', () => {
            const result = transactionsReducer(initialState, ACTIONS.getRecentTransactions.fail);
            expect(result.recentTransactions.loading).toEqual(false);
            expect(result.recentTransactions.error).toEqual('Error Message');
            expect(result.recentTransactions.data).toEqual({
                currentBalance: {},
                transactions: [],
                numberOfTransactions: 0
            });
        });
        it('should handle GET_AVAILABLE_ADDRESSES', () => {
            const result = transactionsReducer(initialState, ACTIONS.getAvailableAddresses.fail);
            expect(result.availableAddresses.loading).toEqual(false);
            expect(result.availableAddresses.error).toEqual('Error Message');
            expect(result.availableAddresses.data).toEqual({
                addresses: []
            });
        });
    });
    describe('Success cases:', () => {
        it('should handle GET_RECENT_TRANSACTIONS', () => {
            const result = transactionsReducer(initialState, ACTIONS.getRecentTransactions.success);
            expect(result.recentTransactions.loading).toEqual(false);
            expect(result.recentTransactions.error).toEqual(null);
            expect(result.recentTransactions.data).toEqual(ACTIONS.getRecentTransactions.success.payload);
        });
        it('should handle GET_AVAILABLE_ADDRESSES', () => {
            const result = transactionsReducer(initialState, ACTIONS.getAvailableAddresses.success);
            expect(result.availableAddresses.loading).toEqual(false);
            expect(result.availableAddresses.error).toEqual(null);
            expect(result.availableAddresses.data).toEqual(ACTIONS.getAvailableAddresses.success.payload);
        });
    });
});

function fixtures() {
    const ACTIONS = {
        getRecentTransactions: {
            success: {
                type: 'GET_RECENT_TRANSACTIONS',
                payload: {
                    currentBalance: {
                        balance: 20,
                        date: 1523707200
                    },
                    transactions: [
                        {
                            id: 1,
                            date: 1523707200,
                            description: 'Bought 23 kWh from Alice',
                            amount: 0.81
                        },
                        {
                            id: 2,
                            date: 1523707200,
                            description: 'Bought 23 kWh from Alice',
                            amount: 0.81
                        },
                        {
                            id: 3,
                            date: 1523707200,
                            description: 'Bought 23 kWh from Peter',
                            amount: 0.81
                        }
                    ],
                    numberOfTransactions: 3
                },
                error: null,
                loading: false,
                meta: ['testId', 0]
            },
            fail: {
                type: 'GET_RECENT_TRANSACTIONS',
                payload: null,
                error: 'Error Message',
                loading: false,
                meta: ['testId', 0]
            },
            pending: {
                type: 'GET_RECENT_TRANSACTIONS',
                payload: null,
                error: null,
                loading: true,
                meta: ['testId', 0]
            }
        },
        getAvailableAddresses: {
            success: {
                type: 'GET_AVAILABLE_ADDRESSES',
                payload: {
                    addresses: [
                        '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
                        '0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf'
                    ]
                },
                error: null,
                loading: false
            },
            fail: {
                type: 'GET_AVAILABLE_ADDRESSES',
                payload: null,
                error: 'Error Message',
                loading: false
            },
            pending: {
                type: 'GET_AVAILABLE_ADDRESSES',
                payload: null,
                error: null,
                loading: true
            }
        }
    };
    return { ACTIONS };
}
