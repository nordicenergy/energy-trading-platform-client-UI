import Axios from 'axios';
import { login, logout, getUserData } from '../users';

describe('Users API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
        jest.spyOn(Axios, 'post').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
        Axios.post.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
        Axios.post.mockClear();
    });

    it('should provide method for login', () => {
        login({ username: 'test', password: 'password' });

        expect(Axios.post).toHaveBeenCalledWith(
            '/api/user/login',
            expect.objectContaining({
                username: 'test',
                password: 'password'
            })
        );
    });

    it('should provide method for logout', () => {
        logout();

        expect(Axios.get).toHaveBeenCalledWith('/api/user/logout');
    });

    it('should provide method for getting user', () => {
        getUserData();

        expect(Axios.get).toHaveBeenCalledWith('/api/user/getUserData');
    });
});
