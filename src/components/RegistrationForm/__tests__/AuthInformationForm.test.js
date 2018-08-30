import React from 'react';
import { shallow } from 'enzyme';
import Wizard from '../../Wizard';
import AuthInformationForm from '../AuthInformationForm';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<AuthInformationForm {...props} />);
}

describe('<AuthInformationForm /> component', () => {
    beforeAll(() => {
        // Prevent displaying async-validator warn messages
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    it('should render with necessary elements', () => {
        const authInformationForm = renderComponent();

        expect(authInformationForm.find('TextField[name="username"]')).toHaveLength(1);
        expect(authInformationForm.find('TextField[name="password"]')).toHaveLength(1);
        expect(authInformationForm.find('TextField[name="passwordConfirmation"]')).toHaveLength(1);
    });

    it('should validate all form fields', () => {
        const authInformationForm = renderComponent();

        authInformationForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        ['password', 'passwordConfirmation'].forEach(property => {
            expect(authInformationForm.state().errors).toHaveProperty(property);
        });

        authInformationForm.setProps({ formData: { password: 'qw123' } });
        authInformationForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        ['password', 'passwordConfirmation'].forEach(property => {
            expect(authInformationForm.state().errors).toHaveProperty(property);
        });

        authInformationForm.setProps({ formData: { password: 'qwertyui' } });
        authInformationForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        ['password', 'passwordConfirmation'].forEach(property => {
            expect(authInformationForm.state().errors).toHaveProperty(property);
        });

        authInformationForm.setProps({ formData: { password: '12345678' } });
        authInformationForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        ['password', 'passwordConfirmation'].forEach(property => {
            expect(authInformationForm.state().errors).toHaveProperty(property);
        });

        authInformationForm.setProps({ formData: { password: 'qwerty123', passwordConfirmation: '123qwerty' } });
        authInformationForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        ['passwordConfirmation'].forEach(property => {
            expect(authInformationForm.state().errors).toHaveProperty(property);
        });

        authInformationForm.setProps({
            formData: {
                username: 'testuser',
                password: 'qwerty123',
                passwordConfirmation: 'qwerty123'
            }
        });
        authInformationForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        expect(authInformationForm.state().errors).toEqual({});
    });
});
