import Axios from 'axios';
import { getRecentTransactions } from '../transactions';

// TODO remove skip after API integration
describe.skip('Transactions API Service', () => {
    beforeEach(done => {
        Axios.get = jest.fn();
        done();
    });
    it('should provide method for getting recent transactions', () => {
        getRecentTransactions();
        const [call] = Axios.get.mock.calls;
        const [url] = call;

        expect(url).toEqual('/api/v1/user/getRecentTransactions');
    });
});
