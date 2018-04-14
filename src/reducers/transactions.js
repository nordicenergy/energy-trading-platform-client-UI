export const initialState = {
    recentTransactions: { data: { currentBalance: {}, transactions: [] }, error: null, loading: false }
};

export function transactionsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECENT_TRANSACTIONS':
            return {
                ...state,
                recentTransactions: {
                    data: action.payload ? action.payload : state.recentTransactions.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        default:
            return state;
    }
}
