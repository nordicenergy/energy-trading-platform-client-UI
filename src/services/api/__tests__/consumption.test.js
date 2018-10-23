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

const MOCK_METER_NUMBER = {
    meterNumber: 12345678
};

const MOCK_READING_VALUE = { readingValue: 1111 };

describe('Consumption API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
        jest.spyOn(Axios, 'post').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
    });

    it('should provide method for getting meter readings history', async () => {
        Axios.get.mockReturnValueOnce(Promise.resolve({ data: MOCK_METER_READINGS_HISTORY }));

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
        Axios.get.mockReturnValueOnce(Promise.resolve({ data: MOCK_METER_NUMBER }));
        const data = await getMeterNumber();

        expect(data).toEqual({ data: MOCK_METER_NUMBER });
    });

    it('should provide method for submit meter readings', async () => {
        Axios.post.mockReturnValueOnce(Promise.resolve({ data: MOCK_READING_VALUE }));
        const data = await submitMeterReading({ meterReadings: MOCK_READING_VALUE.readingValue, date: '2018-08-29' });

        expect(data).toEqual({ data: MOCK_READING_VALUE });
    });
});
