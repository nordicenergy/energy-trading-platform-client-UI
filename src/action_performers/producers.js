import { getProducer, getCurrentProducer, getProducers } from '../services/api/producers';

import { dispatcher } from '../store';

export function performGetProducer(id) {
    dispatcher.dispatchPromise(getProducer, 'GET_PRODUCER', state => state.Producers.producer.loading, [id]);
}

export function performGetCurrentProducer() {
    dispatcher.dispatchPromise(
        getCurrentProducer,
        'GET_CURRENT_PRODUCER',
        state => state.Producers.currentProducer.loading,
        []
    );
}

export function performGetProducers(queryParams) {
    dispatcher.dispatchPromise(getProducers, 'GET_PRODUCERS', state => state.Producers.producer.loading, [queryParams]);
}
