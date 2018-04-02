import React from 'react';
import { Login } from '../Login';
import { shallowWithIntl } from '../../../services/intlTestHelper';
import * as userActionPerformers from '../../../action_performers/users';

const historyMock = {
    push: jest.fn()
};
const routerMock = {
    history: historyMock
};
function renderComponent(props = {}, context = { router: routerMock }) {
    return shallowWithIntl(<Login {...props} />, { context });
}

describe('<Login /> Container', () => {
    it(`should renders with:
        - login form
        - logo
        - illustration`, () => {
        const component = renderComponent();

        expect(component.find('LoginForm')).toHaveLength(1);
        expect(component.find('Logo')).toHaveLength(1);
        expect(component.find('Illustration')).toHaveLength(1);
    });

    it('should map state properties', () => {
        const stateMock = {
            Users: {
                login: {
                    loading: true,
                    data: { foo: 'bar' }
                }
            }
        };
        const props = Login.mapStateToProps(stateMock);

        expect(props.loading).toEqual(stateMock.Users.login.loading);
        expect(props.login).toEqual(stateMock.Users.login.data);
    });

    it('should opens restore password page after forgot password link was clicked', () => {
        const component = renderComponent();

        component
            .find('LoginForm')
            .props()
            .onForgotPasswordLinkClick();
        expect(historyMock.push).toHaveBeenCalledWith('/restore-password');
    });

    it('should validate credentials', () => {
        const component = renderComponent();
        const credentialsMock = {
            username: '',
            password: ''
        };
        // Disable console warning for the test.
        const consoleWarnSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(jest.fn());
        const performLoginSpy = jest
            .spyOn(userActionPerformers, 'performLogin')
            .mockImplementation(jest.fn());

        component
            .find('LoginForm')
            .props()
            .onSubmit(credentialsMock);
        expect(performLoginSpy).not.toHaveBeenCalled();
        expect(component.state().errors).toHaveProperty('username');
        expect(component.state().errors).toHaveProperty('password');

        consoleWarnSpy.mockRestore();
        performLoginSpy.mockRestore();
    });

    it('should calls performLogin after form was submitted', () => {
        const component = renderComponent();
        const credentialsMock = {
            username: 'test-username',
            password: 'qwerty'
        };
        const performLoginSpy = jest
            .spyOn(userActionPerformers, 'performLogin')
            .mockImplementation(jest.fn());

        component
            .find('LoginForm')
            .props()
            .onSubmit(credentialsMock);
        expect(performLoginSpy).toHaveBeenCalledWith(
            credentialsMock.username,
            credentialsMock.password
        );

        performLoginSpy.mockRestore();
    });
});
