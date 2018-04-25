export const initialState = {
    recentTransactions: {
        data: { currentBalance: {}, transactions: [], numberOfTransactions: 0 },
        error: null,
        loading: false
    }
};

export function transactionsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECENT_TRANSACTIONS': {
            const { payload, meta } = action;
            const [, page] = meta;

            return {
                ...state,
                recentTransactions: {
                    data: payload
                        ? {
                              ...payload,
                              transactions: page
                                  ? [...state.recentTransactions.data.transactions, ...payload.transactions]
                                  : payload.transactions
                          }
                        : state.recentTransactions.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        default:
            return state;
    }
}
