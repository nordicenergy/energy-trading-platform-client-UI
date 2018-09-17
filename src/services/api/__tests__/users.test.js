import Axios from 'axios';
import {
    create,
    login,
    logout,
    getUserData,
    updateUserData,
    resetUserPassword,
    createResetPasswordToken,
    verifyResetPasswordToken
} from '../users';

describe('Users API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
        jest.spyOn(Axios, 'post').mockImplementation(jest.fn);
        jest.spyOn(Axios, 'patch').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
        Axios.post.mockRestore();
        Axios.patch.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
        Axios.post.mockClear();
        Axios.patch.mockClear();
    });

    it('should provide method for registration', () => {
        const userData = { firstName: 'John', lastName: 'Doe', username: 'test', password: 'qwerty123' };
        create(userData);

        expect(Axios.post).toHaveBeenCalledWith('/api/user/create?lang=en', userData);
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
        expect(Axios.patch).toHaveBeenCalledWith('/api/user/updateUserData', newUserDataDummy);
    });

    it('should provide possibility to reset user password', () => {
        const newPasswordDataDummy = {
            newPassword: 'test',
            resetToken: 'token'
        };
        Axios.patch.mockReturnValue(
            Promise.resolve({
                updated: true
            })
        );
        resetUserPassword(newPasswordDataDummy.resetToken, newPasswordDataDummy.newPassword);
        const [[url, data]] = Axios.patch.mock.calls;
        expect(url).toBe('/api/user/resetPassword');
        expect(data).toEqual(newPasswordDataDummy);
    });

    it('should provide possibility to create reset password token', () => {
        const request = {
            email: 'jhon.doe@test.com'
        };
        Axios.post.mockReturnValue(
            Promise.resolve({
                created: true
            })
        );
        createResetPasswordToken(request.email);
        expect(Axios.post).toHaveBeenCalledWith('/api/user/resetPasswordToken?lang=en', request);
    });

    it('should provide possibility to verify reset password token', () => {
        Axios.get.mockReturnValue(
            Promise.resolve({
                valid: true
            })
        );
        verifyResetPasswordToken('testToken');
        expect(Axios.get).toHaveBeenCalledWith('/api/user/resetPasswordToken/testToken', {
            headers: { 'Cache-Control': 'no-cache' }
        });
    });
});
