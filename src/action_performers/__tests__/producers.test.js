import { dispatcher } from '../../store';
import { performGetProducer, performGetCurrentProducer, performGetProducers } from '../producers';

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

    it('should call dispatch method for get current producer', () => {
        performGetCurrentProducer();

        const [method, type, loadingFunc, meta] = dispatcher.dispatchPromise.mock.calls[0];
        const loading = loadingFunc({
            Producers: { currentProducer: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise).toHaveBeenCalledTimes(1);
        expect(method.name).toEqual('getCurrentProducer');
        expect(type).toEqual('GET_CURRENT_PRODUCER');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual([]);
    });

    it('should call dispatch method for get producers list', () => {
        const queryParamsMock = { page: 5 };

        performGetProducers(queryParamsMock);

        const [method, type, loadingFunc, meta] = dispatcher.dispatchPromise.mock.calls[0];
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
