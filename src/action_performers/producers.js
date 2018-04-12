import { getProducer, getProducers } from '../services/api/producers';

import { dispatcher } from '../store';

export function performGetProducer(id) {
    dispatcher.dispatchPromise(
        getProducer,
        'GET_PRODUCER',
        state => state.Producers.producer.loading,
        [id]
    );
}

export function performGetProducers(queryParams) {
    dispatcher.dispatchPromise(
        getProducers,
        'GET_PRODUCERS',
        state => state.Producers.producer.loading,
        [queryParams]
    );
}
