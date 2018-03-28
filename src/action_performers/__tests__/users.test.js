import { dispatcher } from '../../store';

import { performLogin, performLogout, performGetUserData } from '../users';

describe('Users action performers', () => {
    beforeEach(done => {
        dispatcher.dispatchPromise = jest.fn();
        done();
    });

    it('should call dispatch method for user login', done => {
        performLogin({ username: 'test', password: 'test' });

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            Users: { login: { loading: 'TEST' } }
        });
        const [credentials] = meta;

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('login');
        expect(type).toEqual('LOGIN');
        expect(loading).toEqual('TEST');
        expect(credentials).toEqual({ username: 'test', password: 'test' });

        done();
    });

    it('should call dispatch method for user logout', done => {
        performLogout();

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            Users: { logout: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('logout');
        expect(type).toEqual('LOGOUT');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(undefined);

        done();
    });

    it('should call dispatch method for get user data', done => {
        performGetUserData();

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            Users: { profile: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('getUserData');
        expect(type).toEqual('GET_USER_DATA');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(undefined);

        done();
    });
});
