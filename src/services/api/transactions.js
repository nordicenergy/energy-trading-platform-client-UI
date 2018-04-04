// import Axios from 'axios';
// import { SESSION_API_URL } from '../../constants';

export function getRecentTransactions() {
    return Promise.resolve({
        data: [
            {
                id: '1',
                date: 'Mar 14, 2018',
                name: 'Bought 23 kWh Alice',
                amount: '0,81€'
            },
            {
                id: '2',
                date: 'Mar 14, 2018',
                name: 'Monthly invoice',
                amount: '0,81€'
            },
            {
                id: '3',
                date: 'Mar 14, 2018',
                name: 'Bought 23 kWh from Peter',
                amount: '0,81€'
            }
        ]
    });
}
