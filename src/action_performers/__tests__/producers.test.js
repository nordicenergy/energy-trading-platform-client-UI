import { dispatcher } from '../../store';
import { performGetProducer } from '../producers';

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

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('getProducer');
        expect(type).toEqual('GET_PRODUCER');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(['testId']);
    });
});
