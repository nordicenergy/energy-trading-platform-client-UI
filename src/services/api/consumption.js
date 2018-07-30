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
    // TODO: Ues real endpoint and data
    return Promise.resolve({ data: { status: 'OK', meterReading } });
}

export function getMeterNumber() {
    // TODO: Ues real endpoint and data
    return Promise.resolve({ data: { meterNumber: 321 } });
}
