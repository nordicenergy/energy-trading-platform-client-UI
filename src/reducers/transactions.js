export const initialState = {
    recentTransactions: {
        data: { currentBalance: {}, transactions: [], numberOfTransactions: 0 },
        error: null,
        loading: false
    },
    availableAddresses: {
        data: {
            addresses: []
        },
        error: null,
        loading: false
    },
    openTradePositions: {
        data: [],
        error: null,
        loading: false
    },
    performedTransaction: {
        data: {},
        error: null,
        loading: false
    },
    ledgerNetworks: {
        data: {},
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
        case 'GET_AVAILABLE_ADDRESSES': {
            return {
                ...state,
                availableAddresses: {
                    data: action.payload ? action.payload : state.availableAddresses.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'GET_OPEN_TRADE_POSITIONS': {
            return {
                ...state,
                openTradePositions: {
                    data: action.payload ? action.payload : state.openTradePositions.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'PERFORM_TRANSACTION': {
            const [{ offerAddress, offerIssuedTimestamp }] = action.meta;
            const openTradePositionsList = state.openTradePositions.data;
            const performedTransactionIndex = openTradePositionsList.findIndex(
                position =>
                    position.offerAddress === offerAddress && position.offerIssuedTimestamp === offerIssuedTimestamp
            );
            const updatedOpenTradePositions =
                performedTransactionIndex >= 0 && action.payload
                    ? [
                          ...openTradePositionsList.slice(0, performedTransactionIndex),
                          {
                              ...openTradePositionsList[performedTransactionIndex],
                              txHash: action.payload.txHash,
                              txHashUrl: action.payload.txHashUrl
                          },
                          ...openTradePositionsList.slice(performedTransactionIndex + 1)
                      ]
                    : openTradePositionsList;
            return {
                ...state,
                openTradePositions: {
                    ...state.openTradePositions,
                    data: updatedOpenTradePositions
                },
                performedTransaction: {
                    data: action.payload ? action.payload : state.performedTransaction.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'GET_LEDGERS':
            return {
                ...state,
                ledgerNetworks: {
                    data: action.payload ? action.payload : state.ledgerNetworks.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        default:
            return state;
    }
}
