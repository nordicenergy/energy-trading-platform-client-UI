export const initialState = {
    documents: { data: [], error: null, loading: false }
};

export function documentsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOCUMENTS': {
            const payload = action && action.payload;
            return {
                ...state,
                documents: {
                    data: payload ? payload.documents : state.documents.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }

        default:
            return state;
    }
}
