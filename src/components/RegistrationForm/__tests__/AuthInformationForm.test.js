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

    it('should validate default field', () => {
        const authInformationForm = renderComponent();

        authInformationForm
            .find('TextField[name="password"]')
            .props()
            .onBlur({
                target: { name: 'password', value: '' }
            });
        expect(authInformationForm.state().errors).toHaveProperty('password');
    });

    it('should check if passwords are same', () => {
        const authInformationForm = renderComponent();

        authInformationForm.setProps({ formData: { password: 'qwerty123' } });
        authInformationForm
            .find('TextField[name="passwordConfirmation"]')
            .props()
            .onBlur({
                target: { name: 'passwordConfirmation', value: '123qwerty' }
            });
        expect(authInformationForm.state().errors).toHaveProperty('passwordConfirmation');
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
    });
});
