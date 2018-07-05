import Axios from 'axios';
import { login, logout, getUserData, updateUserData } from '../users';

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
        Axios.get.mockReturnValue(
            Promise.resolve({
                data: { user: {} }
            })
        );
        getUserData();

        expect(Axios.get).toHaveBeenCalledWith('/api/user/getUserData');
    });

    it('should provide possibility to update user data', () => {
        const newUserDataDummy = {
            firstName: 'Hans',
            lastName: 'Wurst',
            birthday: 1530748800,
            IBAN: 'DE00 0000 0000 0000 0000 00',
            email: 'nachrichtentechnik.kiel@googlemail.com',
            street: 'Hoppenbrook',
            postcode: '24145',
            city: 'Kiel',
            streetNumber: '5'
        };
        Axios.post.mockReturnValue(
            Promise.resolve({
                data: {
                    firstName: 'Hans',
                    lastName: 'Wurst',
                    birthday: 1530748800,
                    IBAN: 'DE00 0000 0000 0000 0000 00',
                    email: 'nachrichtentechnik.kiel@googlemail.com',
                    street: 'Hoppenbrook',
                    postcode: '24145',
                    city: 'Kiel',
                    streetNumber: '5'
                }
            })
        );
        updateUserData(newUserDataDummy);
        expect(Axios.post).toHaveBeenCalledWith('/api/user/updateUserData', newUserDataDummy);
    });
});
