export const initialState = {
    login: { data: {}, error: null, loading: false },
    logout: { data: {}, error: null, loading: false },
    profile: { data: {}, error: null, loading: false }
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: {
                    data: action.payload ? action.payload : state.login.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        case 'LOGOUT': {
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
