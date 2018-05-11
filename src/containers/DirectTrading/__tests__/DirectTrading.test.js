import React from 'react';
import { Provider } from 'react-redux';
import DirectTradingContainer, { DirectTrading } from '../DirectTrading';
import { Loader } from '../../../components';
import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

import * as notificationActions from '../../../action_performers/notifications';
import * as txActions from '../../../action_performers/transactions';

const context = {
    intl: {
        formatMessage: jest.fn()
    },
    router: {
        history: { push: jest.fn() }
    }
};

const mockStore = configureMockStore();
const store = mockStore({
    Transactions: {
        openTradePositions: {
            data: [],
            loading: false,
            error: null
        },
        availableAddresses: {
            data: {
                addresses: ['0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', '0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf']
            },
            loading: false,
            error: null
        }
    }
});

const props = {
    openTradePositions: [],
    availableAddresses: ['0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', '0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf'],
    loading: false,
    error: null
};

function renderContainer() {
    return mountWithIntl(
        <Provider store={store}>
            <DirectTradingContainer context={context} />
        </Provider>
    );
}

function renderComponent() {
    return shallowWithIntl(<DirectTrading {...props} context={context} />);
}

describe('<DirectTrading /> Component', () => {
    beforeEach(() => {
        context.router.history.push = jest.fn();
        context.intl.formatMessage = jest.fn();

        txActions.performGetAvailableAddresses = jest.fn();
        txActions.performGetOpenTradePositions = jest.fn();
        notificationActions.performPushNotification = jest.fn();
    });

    it(`should contains following controls:
        - 1 <Loader /> component;
        - 1 <section> element with "direct-trading-page";
        - 1 <h1> element;`, () => {
        const component = renderContainer();

        expect(component.find('section.direct-trading-page')).toHaveLength(1);
        expect(component.find(Loader)).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
        // TODO add Alert, OpenTradePositionsTable and ConfigurationForm check
    });

    it('should returns correct props map', () => {
        const stateDummy = {
            Transactions: {
                openTradePositions: {
                    data: [],
                    error: null,
                    loading: false
                },
                availableAddresses: {
                    data: { addresses: 'test_data' },
                    error: 'test_error',
                    loading: 'test_loading'
                }
            }
        };
        const props = DirectTrading.mapStateToProps(stateDummy);
        expect(props).toEqual({
            openTradePositions: [],
            availableAddresses: 'test_data',
            error: 'test_error',
            loading: 'test_loading'
        });
    });

    it('should perform related actions on did mount step', () => {
        const component = renderComponent();
        expect(txActions.performGetAvailableAddresses.mock.calls.length).toEqual(1);
        expect(txActions.performGetOpenTradePositions.mock.calls.length).toEqual(0);

        component.setState({ isConfigured: true });
        expect(txActions.performGetOpenTradePositions.mock.calls.length).toEqual(1);

        component.setProps({ error: { message: 'Error Message' } });
        expect(notificationActions.performPushNotification.mock.calls.length).toEqual(1);
        const [[error]] = notificationActions.performPushNotification.mock.calls;
        expect(error).toEqual({ message: 'Error Message', type: 'error' });
    });
});
