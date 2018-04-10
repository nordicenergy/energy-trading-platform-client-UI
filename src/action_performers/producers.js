import { getProducer } from '../services/api/producers';

import { dispatcher } from '../store';

export function performGetProducer(id) {
    dispatcher.dispatchPromise(
        getProducer,
        'GET_PRODUCER',
        state => state.Producers.producer.loading,
        [id]
    );
}
