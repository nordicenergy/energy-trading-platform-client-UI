export const initialState = {
    items: { data: [], error: null, loading: false },
    createdItem: { data: {}, error: null, loading: false },
    updatedItem: { data: {}, error: null, loading: false },
    deletedItem: { data: {}, error: null, loading: false }
};

export function itemsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ITEMS':
            return {
                ...state,
                items: {
                    data: action.payload ? action.payload : state.items.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        case 'CREATE_ITEM': {
            const items = {
                ...state.items,
                data: action.payload
                    ? [action.payload, ...state.items.data]
                    : state.items.data
            };
            return {
                ...state,
                items,
                createdItem: {
                    ...state.createdItem,
                    loading: action.loading,
                    error: action.error,
                    data: action.payload
                        ? action.payload
                        : state.createdItem.data
                }
            };
        }
        case 'UPDATE_ITEM': {
            const items = {
                ...state.items,
                data: action.payload
                    ? state.items.data.map(
                          i =>
                              i.name === action.payload.name
                                  ? action.payload
                                  : i
                      )
                    : state.items.data
            };
            return {
                ...state,
                items,
                updatedItem: {
                    ...state.updatedItem,
                    loading: action.loading,
                    error: action.error,
                    data: action.payload
                        ? action.payload
                        : state.updatedItem.data
                }
            };
        }
        case 'DELETE_ITEM': {
            const [deletedId] = action.meta;
            return {
                ...state,
                items: {
                    ...state.items,
                    data: action.payload
                        ? state.items.data.filter(i => deletedId !== i.name)
                        : state.items.data
                },
                deletedItem: {
                    ...state.deletedItem,
                    loading: action.loading,
                    error: action.error,
                    data: action.payload
                        ? action.payload
                        : state.deletedItem.data
                }
            };
        }
        default:
            return state;
    }
}
