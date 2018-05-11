import {
    getProducer,
    getCurrentProducer,
    getProducers,
    selectProducer,
    getProducerHistory
} from '../services/api/producers';

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

export function performSelectProducer(id) {
    dispatcher.dispatchPromise(selectProducer, 'SELECT_PRODUCER', state => state.Producers.selectedProducer.loading, [
        id
    ]);
}

export function performGetProducerHistory(producerId) {
    dispatcher.dispatchPromise(
        getProducerHistory,
        'GET_PRODUCER_HISTORY',
        state => state.Producers.producerHistory.loading,
        [producerId]
    );
}
