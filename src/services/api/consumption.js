import Axios from 'axios';
import { SESSION_API_URL } from '../../constants';

export function getMeterReadingsHistory(page) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            data: {
                count: 40,
                readings: [
                    {
                        id: '17007',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17008',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17007',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17008',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17007',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17008',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17007',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17008',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17007',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17008',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17007',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17008',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17007',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17008',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17007',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17008',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17007',
                        date: '2018-09-30',
                        value: '123456.0000'
                    },
                    {
                        id: '17008',
                        date: '2018-09-30',
                        value: '123456.0000'
                    }
                ]
            }
        }),3000);
    });
}

export function submitMeterReading(meterReading) {
    return Axios.post(`${SESSION_API_URL}/consumption/saveMetering`, {
        readingValue: meterReading.meterReadings,
        readAt: meterReading.date
    });
}

export function getMeterNumber() {
    return Axios.get(`${SESSION_API_URL}/consumption/getMeterNumber`).then(res => {
        return { data: res.data };
    });
}
