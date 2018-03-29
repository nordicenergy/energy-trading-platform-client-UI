import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Login } from '../Login';
import { Button } from '../../../components';
import { shallowWithIntl } from '../../../services/intlTestHelper';

function renderComponent(context = {}) {
    return shallowWithIntl(<Login context={context} />);
}

describe('<Login /> Container', () => {
    it(`should contains following components:
        - <Button>;
        - <FormattedMessage> with text "Login";
        - <img> with class "login-logo"`, done => {
        const component = renderComponent();
        const text = component.debug();

        expect(component.find(Button).length).toEqual(1);
        expect(component.find(FormattedMessage).length).toEqual(1);
        expect(
            text.includes('img') && text.includes(' className="login-logo"')
        ).toEqual(true);

        done();
    });
});
