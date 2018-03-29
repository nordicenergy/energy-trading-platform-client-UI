import React from 'react';
import { RestorePassword } from '../RestorePassword';
import { shallowWithIntl } from '../../../services/intlTestHelper';

const historyMock = {
    push: jest.fn()
};
function renderComponent({ history = historyMock } = {}, context = {}) {
    return shallowWithIntl(
        <RestorePassword history={history} context={context} />
    );
}

describe('<Login /> Container', () => {
    it(`should renders with:
        - restore password form
        - logo
        - illustration`, () => {
        const component = renderComponent();

        expect(component.find('RestorePasswordForm')).toHaveLength(1);
        expect(component.find('Logo')).toHaveLength(1);
        expect(component.find('Illustration')).toHaveLength(1);
    });

    it('should opens login page after login link was clicked', () => {
        const component = renderComponent();

        component
            .find('RestorePasswordForm')
            .props()
            .onLoginLinkClick();
        expect(historyMock.push).toHaveBeenCalledWith('/login');
    });

    it('should opens login after send button was clicked', () => {
        const component = renderComponent();

        component
            .find('RestorePasswordForm')
            .props()
            .onSubmit();
        expect(historyMock.push).toHaveBeenCalledWith('/login');
    });
});
