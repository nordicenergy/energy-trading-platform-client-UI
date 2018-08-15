import { setToken, clearToken } from '../services/browserStorage';

export const initialState = {
    login: { data: {}, error: null, loading: false },
    logout: { data: {}, error: null, loading: false },
    profile: { data: { user: {} }, error: null, loading: false },
    resetPassword: { data: {}, error: null, loading: false },
    createdPasswordToken: { data: {}, error: null, loading: false },
    verifiedPasswordToken: { data: {}, error: null, loading: false }
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN': {
            const payload = action && action.payload;
            const authentication = payload && payload.authentication;

            if (authentication && authentication.authenticationToken) {
                setToken(authentication.authenticationToken);
            }
            return {
                ...state,
                login: {
                    data: payload ? payload : state.login.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'LOGOUT': {
            if (!action.loading) {
                clearToken();
            }
            return {
                ...state,
                logout: {
                    data: action.payload ? action.payload : state.logout.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'GET_USER_DATA': {
            return {
                ...state,
                profile: {
                    data: action.payload ? action.payload : state.profile.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'UPDATE_USER_DATA': {
            const updatedProfileData = action.payload ? action.payload : state.profile.data.user;
            return {
                ...state,
                profile: {
                    data: {
                        user: {
                            ...state.profile.data.user,
                            ...updatedProfileData
                        }
                    },
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'RESET_USER_PASSWORD': {
            return {
                ...state,
                resetPassword: {
                    data: action.payload ? action.payload : state.resetPassword.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'CREATE_RESET_PASSWORD_TOKEN': {
            return {
                ...state,
                createdPasswordToken: {
                    data: action.payload ? action.payload : state.createdPasswordToken.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'VERIFY_RESET_PASSWORD_TOKEN': {
            return {
                ...state,
                verifiedPasswordToken: {
                    data: action.payload ? action.payload : state.verifiedPasswordToken.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        default:
            return state;
    }
}
