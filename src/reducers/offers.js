export const initialState = {
    ownedProducerOffer: { data: { producer: {} }, error: null, loading: false }
};

export function offersReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_OWNED_PRODUCER_OFFER':
            return {
                ...state,
                ownedProducerOffer: {
                    data: action.payload ? action.payload : state.ownedProducerOffer.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        case 'ADD_OWNED_PRODUCER_OFFER':
            return {
                ...state,
                ownedProducerOffer: {
                    data: action.payload ? action.payload : state.ownedProducerOffer.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        default:
            return state;
    }
}
