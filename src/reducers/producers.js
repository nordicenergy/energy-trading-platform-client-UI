export const initialState = {
    producer: { data: {}, error: null, loading: false },
    currentProducer: { data: {}, error: null, loading: false },
    producers: {
        data: {
            total: 0,
            entries: []
        },
        error: null,
        loading: false
    }
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
        case 'GET_CURRENT_PRODUCER': {
            const payload = action && action.payload;

            return {
                ...state,
                currentProducer: {
                    data: payload
                        ? payload.producer
                        : state.currentProducer.data,
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
                    data: {
                        total: payload
                            ? payload.numberOfProducers
                            : state.producers.data.total,
                        entries: payload
                            ? [
                                  ...state.producers.data.entries,
                                  ...payload.producers
                              ]
                            : state.producers.data.entries
                    },
                    loading: action.loading,
                    error: action.error && action.error.data
                }
            };
        }
        default:
            return state;
    }
}
