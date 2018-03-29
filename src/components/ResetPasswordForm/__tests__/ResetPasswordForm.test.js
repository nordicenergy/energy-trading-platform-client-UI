import React from 'react';
import { shallow } from 'enzyme';
import ResetPasswordForm from '../ResetPasswordForm';

const labelsMock = {
    formTitle: {
        id: 'resetPasswordForm.doc.formTitle',
        defaultMessage: 'Restore password'
    },
    emailField: {
        id: 'resetPasswordForm.doc.emailField',
        defaultMessage: 'Enter Your Email'
    },
    sendButton: {
        id: 'resetPasswordForm.doc.sendButton',
        defaultMessage: 'Send'
    },
    loginLink: {
        id: 'resetPasswordForm.doc.loginLink',
        defaultMessage: 'Login'
    }
};
const onSubmitMock = jest.fn();
const onLoginLinkClickMock = jest.fn();
function renderComponent(
    {
        labels = labelsMock,
        onSubmit = onSubmitMock,
        onLoginLinkClick = onLoginLinkClickMock
    } = {},
    mountFn = shallow
) {
    return mountFn(
        <ResetPasswordForm
            labels={labels}
            onSubmit={onSubmit}
            onLoginLinkClick={onLoginLinkClick}
        />
    );
}

describe('<ResetPasswordForm /> component', () => {
    it(`should renders:
        - form title
        - email field
        - send button
        - login link`, () => {
        const component = renderComponent();

        expect(component.find('h3.reset-password-form-title')).toHaveLength(1);
        expect(component.find('TextField.email-field')).toHaveLength(1);
        expect(component.find('Button')).toHaveLength(1);
        expect(component.find('a.login-link')).toHaveLength(1);
    });

    it('should update state if email field value changed', () => {
        const component = renderComponent();

        component
            .find('TextField.email-field')
            .props()
            .onChange({
                currentTarget: {
                    name: 'email',
                    value: 'email@example.com'
                }
            });
        expect(component.state().email).toBe('email@example.com');
    });

    it('should calls onSubmit callback when form was submitted', () => {
        const component = renderComponent();

        component
            .find('form')
            .simulate('submit', { preventDefault: () => null });
        expect(onSubmitMock).toHaveBeenCalledWith(component.state().email);
    });

    it('should calls onLoginLinkClick callback when login link was clicked', () => {
        const component = renderComponent();

        component
            .find('.login-link')
            .simulate('click', { preventDefault: () => null });
        expect(onLoginLinkClickMock).toHaveBeenCalled();
    });
});
