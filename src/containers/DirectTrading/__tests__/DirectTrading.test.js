import React from 'react';
import { Provider } from 'react-redux';
import DirectTradingContainer, { DirectTrading } from '../DirectTrading';
import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

import * as notificationActions from '../../../action_performers/notifications';
import * as txActions from '../../../action_performers/transactions';
import * as appActions from '../../../action_performers/app';

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
        appActions.performSetupLoaderVisibility = jest.fn();
        notificationActions.performPushNotification = jest.fn();
    });

    it(`should contains following controls:
        - 1 <section> element with "direct-trading-page";
        - 1 <h1> element;`, () => {
        const component = renderContainer();

        expect(component.find('section.direct-trading-page')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
        // TODO add Alert, OpenTradePositionsTable and ConfigurationForm check
    });

    it('should renders with ConfigurationForm', () => {
        const component = renderComponent();

        component.setState({ isMetaMaskInstalled: true, isConfigured: false });
        component.update();
        expect(component.find('ConfigurationForm')).toHaveLength(1);
    });

    it('should renders with TradePositionsList', () => {
        const component = renderComponent();

        component.setState({ isMetaMaskInstalled: true, isConfigured: true });
        component.update();
        expect(component.find('TradePositionsList')).toHaveLength(1);
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

    it('should reset formData when back link was clicked', () => {
        const component = renderComponent();

        component.setState({
            isMetaMaskInstalled: true,
            isConfigured: true,
            formData: { blockChain: 'ethereum', address: 'abc' }
        });
        component.update();
        component
            .find('TradePositionsList')
            .props()
            .onBackClick();

        expect(component.instance().state.formData).toEqual({ blockChain: 'ethereum', address: '' });
    });

    it('should not calls performGetOpenTradePositions if formData is not valid', () => {
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        const component = renderContainer();

        component.setState({ isMetaMaskInstalled: true, isConfigured: false });
        component
            .find('ConfigurationForm')
            .props()
            .onSubmit({ blockChain: 'test', address: '' });

        expect(txActions.performGetOpenTradePositions).not.toHaveBeenCalled();
        console.warn.mockRestore();
    });

    it('should calls performGetOpenTradePositions if formData not valid', () => {
        const component = renderContainer();

        component.setState({ isMetaMaskInstalled: true, isConfigured: false });
        component
            .find('ConfigurationForm')
            .props()
            .onSubmit({ blockChain: 'test', address: 'abc' });

        expect(txActions.performGetOpenTradePositions).toHaveBeenCalledWith('abc');
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

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const directTrading = renderComponent();

        directTrading.setProps({ loading: true });
        directTrading.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
        const [[firstCallArg], [secondCallArg]] = appActions.performSetupLoaderVisibility.mock.calls;
        expect(firstCallArg).toBeTruthy();
        expect(secondCallArg).toBeFalsy();
    });
});
