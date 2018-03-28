import React from 'react';
import App from '../App';
import { shallowWithIntl } from '../../../services/intlTestHelper';

function renderComponent(context = {}) {
    return shallowWithIntl(<App context={context} />);
}

describe('Main <App /> Component', () => {
    it(`should contains following controls:
        - <div> with class "app";`, done => {
        const component = renderComponent();
        const text = component.debug();

        expect(text.includes('div className="app"')).toEqual(true);

        done();
    });
});
