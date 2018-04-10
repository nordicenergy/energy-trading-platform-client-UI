// import Axios from 'axios';
// import { SESSION_API_URL } from '../../constants';

export function getProducer(id) {
    // TODO replace on real api call
    // return Axios.get(`${SESSION_API_URL}/producers/get/${id}`);
    return Promise.resolve({
        data: {
            producer: {
                name: 'Peter Producer',
                price: 2.4,
                annualProduction: 3000,
                purchased: 1300,
                capacity: 8,
                dates: 'Sep 12 - Feb 22',
                tradingStrategy: false,
                id: id,
                complete: false,
                plantType: 'solar',
                picture:
                    'https://pbs.twimg.com/profile_images/929933611754708992/ioSgz49P_400x400.jpg',
                location: 'Lippendorf, Neukieritzsch',
                description: `LTN Supply & Trading is a leading European energy
                  trading house and the interface between the LTN Group's
                  operating companies and global wholesale markets for
                  energy and energy-related raw materials in both their
                  physical and/or derivative forms.`
            }
        }
    });
}
