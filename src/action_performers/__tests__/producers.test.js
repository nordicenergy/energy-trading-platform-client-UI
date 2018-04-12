import { dispatcher } from '../../store';
import { performGetProducer, performGetProducers } from '../producers';

describe('Producers action performers', () => {
    beforeEach(() => {
        dispatcher.dispatchPromise = jest.fn();
    });

    it('should call dispatch method for get specific producer', () => {
        performGetProducer('testId');

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            Producers: { producer: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise).toHaveBeenCalledTimes(1);
        expect(method.name).toEqual('getProducer');
        expect(type).toEqual('GET_PRODUCER');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(['testId']);
    });

    it('should call dispatch method for get producers list', () => {
        const queryParamsMock = { page: 5 };

        performGetProducers(queryParamsMock);

        const [
            method,
            type,
            loadingFunc,
            meta
        ] = dispatcher.dispatchPromise.mock.calls[0];
        const loading = loadingFunc({
            Producers: { producer: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise).toHaveBeenCalledTimes(1);
        expect(method.name).toEqual('getProducers');
        expect(type).toEqual('GET_PRODUCERS');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual([queryParamsMock]);
    });
});
