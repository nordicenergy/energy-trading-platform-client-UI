import React from 'react';
import { Provider } from 'react-redux';
import Overview from '../Overview';
import NavigationCard from '../../../components/NavigationCard';
import { mountWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({});

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
        - <h1> element`, done => {
        const component = renderComponent();

        expect(component.find('div.overview-page')).toHaveLength(1);
        expect(component.find(NavigationCard)).toHaveLength(3);

        done();
    });
});
