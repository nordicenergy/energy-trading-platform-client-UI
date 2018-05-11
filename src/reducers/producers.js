export const initialState = {
    producer: { data: {}, error: null, loading: false },
    currentProducer: { data: {}, error: null, loading: false },
    producerHistory: { data: [], error: null, loading: false },
    selectedProducer: { data: {}, error: null, loading: false },
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
                    error: action.error
                }
            };
        }
        case 'GET_PRODUCER_HISTORY': {
            const payload = action && action.payload;
            return {
                ...state,
                producerHistory: {
                    data: payload ? payload.strategies : state.producerHistory.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'SELECT_PRODUCER': {
            const payload = action && action.payload;
            const [id] = action.meta;
            return {
                ...state,
                selectedProducer: {
                    data: payload ? { ...payload, id } : state.selectedProducer.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'GET_CURRENT_PRODUCER': {
            const payload = action && action.payload;

            return {
                ...state,
                currentProducer: {
                    data: payload ? payload.producer : state.currentProducer.data,
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        case 'GET_PRODUCERS': {
            const { payload = {} } = action || {};
            const { producers = [] } = payload || {};
            const [metaData = {}] = action.meta || [];
            const newEntries = metaData.page ? [...state.producers.data.entries, ...producers] : producers;
            return {
                ...state,
                producers: {
                    data: {
                        total: payload ? payload.numberOfProducers : state.producers.data.total,
                        entries: payload ? newEntries : state.producers.data.entries
                    },
                    loading: action.loading,
                    error: action.error
                }
            };
        }
        default:
            return state;
    }
}
