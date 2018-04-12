export const initialState = {
    producer: { data: {}, error: null, loading: false },
    producers: { data: [], error: null, loading: false }
};

export function producersReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCER': {
            const payload = action && action.payload;
            return {
                ...state,
                producer: {
                    data: payload ? payload.producer : state.producer.data,
                    loading: action.loading,
                    error: action.error && action.error.data
                }
            };
        }
        case 'GET_PRODUCERS': {
            const payload = action && action.payload;

            return {
                ...state,
                producers: {
                    data: payload
                        ? [...state.producers.data, ...payload.producers]
                        : state.producers.data,
                    loading: action.loading,
                    error: action.error && action.error.data
                }
            };
        }
        default:
            return state;
    }
}
