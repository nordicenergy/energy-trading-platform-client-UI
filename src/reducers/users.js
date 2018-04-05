import { setToken, clearToken } from '../services/browserStorage';

export const initialState = {
    login: { data: {}, error: null, loading: false },
    logout: { data: {}, error: null, loading: false },
    profile: { data: {}, error: null, loading: false }
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN': {
            const payload = action && action.payload;
            if (payload && payload.authenticationToken) {
                setToken(payload.authenticationToken);
            }
            return {
                ...state,
                login: {
                    data: payload ? payload : state.login.data,
                    loading: action.loading,
                    error: action.error && action.error.data
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
        default:
            return state;
    }
}
