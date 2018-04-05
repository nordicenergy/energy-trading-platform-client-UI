import React from 'react';
import { Provider } from 'react-redux';
import { mountWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

import { EnergyAmountGraph } from '../../../components';
import Trading from '../Trading';

const mockStore = configureMockStore();
const store = mockStore({
    App: { breadCrumbs: { data: [] } }
});

function renderComponent() {
    const match = { path: '/trading' };
    return mountWithIntl(
        <Provider store={store}>
            <Trading store={store} match={match} />
        </Provider>
    );
}

describe('<Trading /> Container', () => {
    it(`should contains following controls:
        - <div> with class "trading-page";
        - <EnergyAmountGraph>;
        - <h1> with header text;`, () => {
        const component = renderComponent();

        expect(component.find('div.trading-page').length).toEqual(1);
        expect(component.find(EnergyAmountGraph).length).toEqual(1);
        expect(component.find('h1').length).toEqual(2); // + Amount Energy Graph header
        expect(
            component
                .find('h1')
                .at(0)
                .text()
        ).toEqual('Trading');
    });
});
