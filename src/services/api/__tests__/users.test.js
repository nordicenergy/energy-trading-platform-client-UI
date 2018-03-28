import Axios from 'axios';
import { login, logout, getUserData } from '../users';

// TODO remove skip after API integration
describe.skip('Users API Service', () => {
    beforeEach(done => {
        Axios.get = jest.fn();
        Axios.post = jest.fn();
        done();
    });

    it('should provide method for login', () => {
        login({ username: 'test', password: 'password' });
        const [call] = Axios.post.mock.calls;
        const [url, credentials] = call;

        expect(url).toEqual('/api/v1/user/login');
        expect(credentials).toEqual({ username: 'test', password: 'password' });
    });

    it('should provide method for logout', () => {
        logout();
        const [call] = Axios.get.mock.calls;
        const [url] = call;

        expect(url).toEqual('/api/v1/user/logout');
    });

    it('should provide method for getting user', () => {
        getUserData();
        const [call] = Axios.get.mock.calls;
        const [url] = call;

        expect(url).toEqual('/api/v1/user/getUserData');
    });
});
