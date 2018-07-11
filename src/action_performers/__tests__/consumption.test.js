import { dispatcher } from '../../store';
import { performGetMeterReadingsHistory, performGetMeterNumber } from '../consumption';
import { getMeterReadingsHistory } from '../../services/api/consumption';

describe('Consumption action performers', () => {
    beforeEach(() => {
        dispatcher.dispatchPromise = jest.fn();
    });

    it('should call dispatch method for getting meter readings history', () => {
        performGetMeterReadingsHistory();

        const [[method, type, loadingFunc]] = dispatcher.dispatchPromise.mock.calls;
        const loading = loadingFunc({
            Consumption: { meterReadingsHistory: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise).toHaveBeenCalledTimes(1);
        expect(method.name).toEqual('getMeterReadingsHistory');
        expect(type).toEqual('GET_METER_READINGS_HISTORY');
        expect(loading).toEqual('TEST');
    });

    it('should call dispatch method for getting meter number', () => {
        performGetMeterNumber();

        const [[method, type, loadingFunc]] = dispatcher.dispatchPromise.mock.calls;
        const loading = loadingFunc({
            Consumption: { meterNumber: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise).toHaveBeenCalledTimes(1);
        expect(method.name).toEqual('getMeterNumber');
        expect(type).toEqual('GET_METER_NUMBER');
        expect(loading).toEqual('TEST');
    });
});
