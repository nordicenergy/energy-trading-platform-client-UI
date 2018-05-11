import React from 'react';
import TermsAndConditionsContainer from '../TermsAndConditions';
import { mountWithIntl } from '../../../services/intlTestHelper';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const context = {
    intl: {
        formatMessage: jest.fn()
    }
};

const mockStore = configureMockStore();
const store = mockStore({});

function renderContainer(mountFn = mountWithIntl) {
    return mountFn(
        <Provider store={store}>
            <TermsAndConditionsContainer context={context} />
        </Provider>
    );
}

describe('<TermsAndConditions /> Component', () => {
    it(`should contains following controls:
        - <div> with class "terms-and-conditions-page";
        - 1 <h1>`, () => {
        const component = renderContainer();

        expect(component.find('.terms-and-conditions-page')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
    });
});
