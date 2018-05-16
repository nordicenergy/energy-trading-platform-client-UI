import React from 'react';
import { shallowWithIntl } from '../../../services/intlTestHelper';

import { EnergyAmountGraph, WattcoinTable, NavigationCardsPanel } from '../../../components';
import { Trading } from '../Trading';

const context = {
    intl: { formatMessage: jest.fn() },
    router: {
        history: { push: jest.fn() }
    }
};

function renderComponent() {
    return shallowWithIntl(<Trading />);
}

describe('<Trading /> Container', () => {
    beforeEach(() => {
        context.router.history.push = jest.fn();
        context.intl.formatMessage = jest.fn();
        context.intl.formatMessage.mockReturnValue('test');
    });

    it(`should contains following controls:
        - <section> with class "trading-page";
        - <NavigationCardsPanel>;
        - <WattcoinTable>;
        - <EnergyAmountGraph>;
        - <h1> with header text;`, () => {
        const component = renderComponent();

        expect(component.find('section.trading-page').length).toEqual(1);
        expect(component.find(NavigationCardsPanel).length).toEqual(1);
        expect(component.find(WattcoinTable).length).toEqual(1);
        expect(component.find(EnergyAmountGraph).length).toEqual(1);
        const headers = component.find('h1');
        expect(headers.length).toEqual(1);
        expect(headers.at(0).text()).toEqual('Trading');
    });

    it('should setup correctly map state to props translations', () => {
        const component = renderComponent(context);
        component.setContext(context);

        expect(context.intl.formatMessage.mock.calls.length).toEqual(13);
    });

    it('should setup correct translations', () => {
        const props = Trading.mapStateToProps({});

        expect(props).toEqual({});
    });

    it('should setup correct callbacks and handle related events for wattcoin table', () => {
        const component = renderComponent(context);
        component.setContext(context);

        const table = component.find(WattcoinTable).at(0);
        table.props().onMoreClick();

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/show_transactions');
        expect(table.props().labels).toEqual({
            button: 'test',
            caption: 'test',
            energyType: 'test',
            producer: 'test',
            received: 'test',
            sent: 'test',
            total: 'test',
            trx: 'test'
        });
        expect(table.props().data).toEqual({
            count: { received: 6, sent: 3, trx: 5 },
            producer: 'Peter Producer',
            total: 0.03,
            type: 'Solar panels'
        });
    });

    it('should provide possibility to navigate to needed route', () => {
        const component = renderComponent();
        component.setContext(context);

        component
            .find(NavigationCardsPanel)
            .at(0)
            .props()
            .onCardClick('/testRoute');
        expect(context.router.history.push).toHaveBeenCalledWith('/testRoute');
    });
});
