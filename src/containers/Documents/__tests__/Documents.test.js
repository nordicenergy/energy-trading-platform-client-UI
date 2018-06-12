import React from 'react';
import { Provider } from 'react-redux';
import DocumentsContainer from '../Documents';
import { mountWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({});

function renderContainer() {
    return mountWithIntl(
        <Provider store={store}>
            <DocumentsContainer context={{}} />
        </Provider>
    );
}

describe('<Documents /> Component', () => {
    it(`should contains following controls:
        - h1 with correct tittle`, () => {
        const component = renderContainer();

        expect(component.find('h1')).toHaveLength(1);
        expect(component.find('h1').text()).toEqual('Documents page');
    });
});
