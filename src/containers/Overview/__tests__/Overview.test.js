import React from 'react';
import { Provider } from 'react-redux';
import Overview from '../Overview';
import { NavigationCard } from '../../../components/NavigationCardsPanel';
import { mountWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({
    Transactions: {
        recentTransactions: {
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
            ],
            loading: false,
            error: null
        }
    }
});

function renderComponent(context = {}) {
    return mountWithIntl(
        <Provider store={store}>
            <Overview context={context} />
        </Provider>
    );
}

describe('<Overview /> Component', () => {
    it(`should contains following controls:
        - 3 <NavigationCard /> components;
        - <div> element with class "overview-page";
        - <h1> element`, () => {
        const component = renderComponent();

        expect(component.find('div.overview-page')).toHaveLength(1);
        expect(component.find(NavigationCard)).toHaveLength(3);
    });
});
