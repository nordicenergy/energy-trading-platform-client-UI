import React from 'react';
import { Provider } from 'react-redux';
import Overview from '../Overview';
import { NavigationCard } from '../../../components/NavigationCardsPanel';
import { mountWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

const context = {
    intl: { formatMessage: jest.fn() },
    router: {
        history: { push: jest.fn() }
    }
};

const mockStore = configureMockStore();
const store = mockStore({
    Users: {
        profile: {
            data: {
                user: {
                    id: 1
                }
            }
        }
    },
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

function renderComponent() {
    return mountWithIntl(
        <Provider store={store}>
            <Overview context={context} />
        </Provider>,
        { context, childContextTypes: context }
    );
}

describe('<Overview /> Component', () => {
    beforeEach(() => {
        context.router.history.push = jest.fn();
    });

    it(`should contains following controls:
        - 3 <NavigationCard /> components;
        - <div> element with class "overview-page";
        - <h1> element`, () => {
        const component = renderComponent();

        expect(component.find('div.overview-page')).toHaveLength(1);
        expect(component.find(NavigationCard)).toHaveLength(3);
    });

    it('should handle navigating to wattcoin page', () => {
        const component = renderComponent();

        const table = component.find('RecentTransactions').at(0);
        table.props().onButtonClick();

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/trading/wattcoin');
    });
});
