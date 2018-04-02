import React from 'react';
import { RestorePassword } from '../RestorePassword';
import { shallowWithIntl } from '../../../services/intlTestHelper';

const historyMock = {
    push: jest.fn()
};
const routerMock = {
    history: historyMock
};
function renderComponent(props = {}, context = { router: routerMock }) {
    return shallowWithIntl(<RestorePassword {...props} />, { context });
}

describe('<RestorePassword /> Container', () => {
    beforeEach(() => {
        historyMock.push.mockClear();
    });

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
            .onSubmit('user@example.com');
        expect(historyMock.push).toHaveBeenCalledWith('/login');
    });

    it('should validate email', () => {
        const component = renderComponent();
        // Disable console warning for the test.
        const consoleWarnSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(jest.fn());

        component
            .find('RestorePasswordForm')
            .props()
            .onSubmit();
        expect(historyMock.push).not.toHaveBeenCalled();
        expect(component.state().errors).toHaveProperty('email');

        consoleWarnSpy.mockRestore();
    });
});
