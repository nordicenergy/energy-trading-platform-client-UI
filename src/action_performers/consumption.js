import { getMeterReadingsHistory, getMeterNumber } from '../services/api/consumption';

import { dispatcher } from '../store';

export function performGetMeterReadingsHistory() {
    dispatcher.dispatchPromise(
        getMeterReadingsHistory,
        'GET_METER_READINGS_HISTORY',
        state => state.Consumption.meterReadingsHistory.loading
    );
}

export function performGetMeterNumber() {
    dispatcher.dispatchPromise(getMeterNumber, 'GET_METER_NUMBER', state => state.Consumption.meterNumber.loading);
}
