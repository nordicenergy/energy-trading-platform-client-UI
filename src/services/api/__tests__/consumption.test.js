import Axios from 'axios';
import { getMeterReadingsHistory, getMeterNumber, submitMeterReading } from '../consumption';
import moment from 'moment/moment';

const MOCK_METER_READINGS_HISTORY = {
    consumptionUnitLabel: 'kWh',
    consumptions: [
        {
            consumption: 123,
            date: 1531144080000
        },
        {
            consumption: 0,
            date: 1531244080000
        }
    ],
    isSeriesBasedOnLiveData: true
};

describe('Consumption API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
    });

    it('should provide method for getting meter readings history', async () => {
        Axios.get.mockReturnValue(Promise.resolve({ data: MOCK_METER_READINGS_HISTORY }));

        const data = await getMeterReadingsHistory();

        const todayDate = moment.utc().startOf('day');
        const tomorrowDate = todayDate.add(1, 'days').unix();
        const monthAgo = todayDate.subtract(1, 'month').unix();
        expect(Axios.get).toHaveBeenCalledWith('/api/consumption/liveMetering', {
            params: { startDate: monthAgo, endDate: tomorrowDate }
        });

        expect(data).toEqual({ data: MOCK_METER_READINGS_HISTORY });
    });

    it('should provide method for getting meter number', async () => {
        const data = await getMeterNumber();

        // TODO: Change it after explore real data from server
        expect(data).toEqual({ data: { meterNumber: 321 } });
    });

    it('should provide method for submit meter readings', async () => {
        const data = await submitMeterReading();

        // TODO: Change it after explore real data from server
        expect(data).toEqual({ data: { status: 'OK' } });
    });
});
