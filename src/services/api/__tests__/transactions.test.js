import Axios from 'axios';
import { getRecentTransactions } from '../transactions';

describe('Transactions API Service', () => {
    beforeEach(done => {
        Axios.get = jest.fn();
        done();
    });
    it('should provide method for getting recent transactions', async () => {
        Axios.get
            .mockReturnValueOnce(Promise.resolve({ data: { balance: 20, lastUpdatedAt: 12345678 } }))
            .mockReturnValue(Promise.resolve({ data: { transactions: [{ test: 'test' }] } }));

        const response = await getRecentTransactions('testId');
        const [[balanceUrl], [historyUrl, historyParams]] = Axios.get.mock.calls;

        expect(balanceUrl).toEqual('/api/user/testId/transactions/getBalance');
        expect(historyUrl).toEqual('/api/user/testId/transactions/getHistory');
        expect(historyParams).toEqual({ params: { limit: 10, offset: 0 } });
        expect(response.data).toEqual({
            currentBalance: { balance: 20, date: 12345678 },
            transactions: [{ test: 'test' }]
        });
    });
});
