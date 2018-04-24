export const initialState = {
    data: [],
    error: null,
    loading: false
};

export function aboutUsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ABOUT_US_INFO':
            return {
                data: action.payload ? action.payload : initialState.data,
                error: action.error,
                loading: action.loading
            };
        default:
            return state;
    }
}
