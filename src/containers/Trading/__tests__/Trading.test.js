import React from 'react';
import { Provider } from 'react-redux';
import { mountWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

import {
    EnergyAmountGraph,
    WattcoinTable,
    NavigationCardsPanel
} from '../../../components';
import Trading from '../Trading';

const mockStore = configureMockStore();
const store = mockStore({});

function renderComponent() {
    return mountWithIntl(
        <Provider store={store}>
            <Trading store={store} />
        </Provider>
    );
}

describe('<Trading /> Container', () => {
    it(`should contains following controls:
        - <div> with class "trading-page";
        - <NavigationCardsPanel>;
        - <WattcoinTable>;
        - <EnergyAmountGraph>;
        - <h1> with header text;`, () => {
        const component = renderComponent();

        expect(component.find('div.trading-page').length).toEqual(1);
        expect(component.find(NavigationCardsPanel).length).toEqual(1);
        expect(component.find(WattcoinTable).length).toEqual(1);
        expect(component.find(EnergyAmountGraph).length).toEqual(1);
        const headers = component.find('h1');
        expect(headers.length).toEqual(2); // + Amount Energy Graph header
        expect(headers.at(0).text()).toEqual('Trading');
    });
});
