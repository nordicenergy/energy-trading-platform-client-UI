import * as persistenceStore from '../../services/browserStorage';
import { usersReducer, initialState } from '../users';

const { ACTIONS } = fixtures();

describe('Users reducer:', () => {
    beforeEach(() => {
        persistenceStore.setToken = jest.fn();
        persistenceStore.clearToken = jest.fn();
    });

    describe('Pending cases:', () => {
        it('should handle LOGIN', () => {
            const result = usersReducer(initialState, ACTIONS.login.pending);
            expect(result.login.loading).toEqual(true);
            expect(result.login.error).toEqual(null);
            expect(result.login.data).toEqual({});
            expect(persistenceStore.setToken.mock.calls.length).toEqual(0);
        });

        it('should handle LOGOUT', () => {
            const result = usersReducer(initialState, ACTIONS.logout.pending);
            expect(result.logout.loading).toEqual(true);
            expect(result.logout.error).toEqual(null);
            expect(result.logout.data).toEqual({});
            expect(persistenceStore.clearToken.mock.calls.length).toEqual(0);
        });

        it('should handle GET_USER_DATA', () => {
            const result = usersReducer(initialState, ACTIONS.getUserData.pending);
            expect(result.profile.loading).toEqual(true);
            expect(result.profile.error).toEqual(null);
            expect(result.profile.data).toEqual({ user: {} });
        });

        it('should handle UPDATE_USER_DATA', () => {
            const result = usersReducer(initialState, ACTIONS.updateUserData.pending);
            expect(result.profile.loading).toEqual(true);
            expect(result.profile.error).toEqual(null);
            expect(result.profile.data).toEqual({ user: {} });
        });
    });

    describe('Error cases:', () => {
        it('should handle LOGIN', () => {
            const result = usersReducer(initialState, ACTIONS.login.fail);
            expect(result.login.loading).toEqual(false);
            expect(result.login.error).toEqual(ACTIONS.login.fail.error);
            expect(result.login.data).toEqual({});
            expect(persistenceStore.setToken.mock.calls.length).toEqual(0);
        });

        it('should handle LOGOUT', () => {
            const result = usersReducer(initialState, ACTIONS.logout.fail);
            expect(result.logout.loading).toEqual(false);
            expect(result.logout.error).toEqual('Error Message');
            expect(result.logout.data).toEqual({});
            expect(persistenceStore.clearToken.mock.calls.length).toEqual(1);
        });

        it('should handle GET_USER_DATA', () => {
            const result = usersReducer(initialState, ACTIONS.getUserData.fail);
            expect(result.profile.loading).toEqual(false);
            expect(result.profile.error).toEqual('Error Message');
            expect(result.profile.data).toEqual({ user: {} });
        });

        it('should handle UPDATE_USER_DATA', () => {
            const result = usersReducer(initialState, ACTIONS.updateUserData.fail);
            expect(result.profile.loading).toEqual(false);
            expect(result.profile.error).toEqual('Error Message');
            expect(result.profile.data).toEqual({ user: {} });
        });
    });

    describe('Success cases:', () => {
        it('should handle LOGIN', () => {
            const result = usersReducer(initialState, ACTIONS.login.success);
            expect(result.login.loading).toEqual(false);
            expect(result.login.error).toEqual(null);
            expect(result.login.data).toEqual(ACTIONS.login.success.payload);
            expect(persistenceStore.setToken.mock.calls.length).toEqual(1);
            const [[token]] = persistenceStore.setToken.mock.calls;
            expect(token).toEqual(ACTIONS.login.success.payload.authentication.authenticationToken);
        });

        it('should handle LOGOUT', () => {
            const result = usersReducer(initialState, ACTIONS.logout.success);
            expect(result.logout.loading).toEqual(false);
            expect(result.logout.error).toEqual(null);
            expect(result.logout.data).toEqual(ACTIONS.logout.success.payload);
            expect(persistenceStore.clearToken.mock.calls.length).toEqual(1);
        });

        it('should handle GET_USER_DATA', () => {
            const result = usersReducer(initialState, ACTIONS.getUserData.success);
            expect(result.profile.loading).toEqual(false);
            expect(result.profile.error).toEqual(null);
            expect(result.profile.data).toEqual(ACTIONS.getUserData.success.payload);
        });

        it('should handle UPDATE_USER_DATA', () => {
            const result = usersReducer(initialState, ACTIONS.updateUserData.success);
            expect(result.profile.loading).toEqual(false);
            expect(result.profile.error).toEqual(null);
            expect(result.profile.data).toEqual({ user: ACTIONS.updateUserData.success.payload });
        });
    });
});

function fixtures() {
    const ACTIONS = {
        login: {
            success: {
                type: 'LOGIN',
                payload: {
                    authentication: {
                        authenticationToken: 'DC124947VDE435FVA&23',
                        expiresAt: 999999
                    }
                },
                error: null,
                loading: false
            },
            fail: {
                type: 'LOGIN',
                payload: null,
                error: {
                    message: 'Error message',
                    code: -1,
                    extra: null
                },
                loading: false
            },
            pending: {
                type: 'LOGIN',
                payload: null,
                error: null,
                loading: true
            }
        },
        logout: {
            success: {
                type: 'LOGOUT',
                payload: { status: 'ok' },
                error: null,
                loading: false
            },
            fail: {
                type: 'LOGOUT',
                payload: null,
                error: 'Error Message',
                loading: false
            },
            pending: {
                type: 'LOGOUT',
                payload: null,
                error: null,
                loading: true
            }
        },
        getUserData: {
            success: {
                type: 'GET_USER_DATA',
                payload: {
                    user: {
                        id: 0,
                        firstName: 'string',
                        lastName: 'string',
                        email: 'string',
                        currentProducerId: '1234567',
                        currentProducerName: 'Peter Producer',
                        currentProducerPicture: '/plantImg/peter_producer.jpg',
                        lastBillAvailable: true,
                        lastBillAmount: '35.24',
                        lastBillDate: 'December;',
                        userStatus: 'string'
                    }
                },
                error: null,
                loading: false
            },
            fail: {
                type: 'GET_USER_DATA',
                payload: null,
                error: 'Error Message',
                loading: false
            },
            pending: {
                type: 'GET_USER_DATA',
                payload: null,
                error: null,
                loading: true
            }
        },
        updateUserData: {
            success: {
                type: 'UPDATE_USER_DATA',
                payload: {
                    id: 0,
                    firstName: 'string',
                    address: 'Huyssenallee 2, 45128 Essen',
                    dateOfBirth: 'Jan 11, 1987',
                    name: 'John Smith',
                    email: 'johnsmith@gmail.com',
                    bankAccountNumber: '11122333455556666666',
                    lastName: 'string',
                    currentProducerId: '1234567',
                    currentProducerName: 'Peter Producer',
                    currentProducerPicture: '/plantImg/peter_producer.jpg',
                    lastBillAvailable: true,
                    lastBillAmount: '35.24',
                    lastBillDate: 'December;',
                    userStatus: 'string'
                },
                error: null,
                loading: false
            },
            fail: {
                type: 'UPDATE_USER_DATA',
                payload: null,
                error: 'Error Message',
                loading: false
            },
            pending: {
                type: 'UPDATE_USER_DATA',
                payload: null,
                error: null,
                loading: true
            }
        }
    };
    return { ACTIONS };
}
