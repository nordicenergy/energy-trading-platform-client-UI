import { transactionsReducer, initialState } from '../transactions';

const { ACTIONS } = fixtures();

describe('Transactions reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_RECENT_TRANSACTIONS', done => {
            const result = transactionsReducer(
                initialState,
                ACTIONS.getRecentTransactions.pending
            );
            expect(result.recentTransactions.loading).toEqual(true);
            expect(result.recentTransactions.error).toEqual(null);
            expect(result.recentTransactions.data).toEqual([]);

            done();
        });
    });
    describe('Error cases:', () => {
        it('should handle GET_RECENT_TRANSACTIONS', done => {
            const result = transactionsReducer(
                initialState,
                ACTIONS.getRecentTransactions.fail
            );
            expect(result.recentTransactions.loading).toEqual(false);
            expect(result.recentTransactions.error).toEqual('Error Message');
            expect(result.recentTransactions.data).toEqual([]);

            done();
        });
    });
    describe('Success cases:', () => {
        it('should handle GET_RECENT_TRANSACTIONS', done => {
            const result = transactionsReducer(
                initialState,
                ACTIONS.getRecentTransactions.success
            );
            expect(result.recentTransactions.loading).toEqual(false);
            expect(result.recentTransactions.error).toEqual(null);
            expect(result.recentTransactions.data).toEqual(
                ACTIONS.getRecentTransactions.success.payload
            );

            done();
        });
    });
});

function fixtures() {
    const ACTIONS = {
        getRecentTransactions: {
            success: {
                type: 'GET_RECENT_TRANSACTIONS',
                payload: [
                    {
                        id: '1',
                        date: 'Mar 14, 2018',
                        name: 'Bought 23 kWh Alice',
                        amount: '0,81€'
                    },
                    {
                        id: '2',
                        date: 'Mar 14, 2018',
                        name: 'Monthly invoice',
                        amount: '0,81€'
                    },
                    {
                        id: '3',
                        date: 'Mar 14, 2018',
                        name: 'Bought 23 kWh from Peter',
                        amount: '0,81€'
                    }
                ],
                error: null,
                loading: false
            },
            fail: {
                type: 'GET_RECENT_TRANSACTIONS',
                payload: null,
                error: 'Error Message',
                loading: false
            },
            pending: {
                type: 'GET_RECENT_TRANSACTIONS',
                payload: null,
                error: null,
                loading: true
            }
        }
    };
    return { ACTIONS };
}
