import Axios from 'axios';
import moment from 'moment/moment';
import { SESSION_API_URL } from '../../constants';

export function getMeterReadingsHistory() {
    const todayDate = moment.utc().startOf('day');
    const tomorrowDate = todayDate.add(1, 'days').unix();
    const monthAgo = todayDate.subtract(1, 'month').unix();

    return Axios.get(`${SESSION_API_URL}/consumption/liveMetering`, {
        params: { startDate: monthAgo, endDate: tomorrowDate }
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
