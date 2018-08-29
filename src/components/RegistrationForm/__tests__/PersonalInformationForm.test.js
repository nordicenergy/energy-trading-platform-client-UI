import React from 'react';
import { shallow } from 'enzyme';
import Wizard from '../../Wizard';
import PersonalInformationForm from '../PersonalInformationForm';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<PersonalInformationForm {...props} />);
}

describe('<PersonalInformationForm /> component', () => {
    beforeAll(() => {
        // Prevent displaying async-validator warn messages
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    it('should render with necessary elements', () => {
        const personalInformationForm = renderComponent();

        expect(personalInformationForm.find('TextField[name="email"]')).toHaveLength(1);
        expect(personalInformationForm.find('DateField[name="birthday"]')).toHaveLength(1);
        expect(personalInformationForm.find('TextField[name="phoneAreaCode"]')).toHaveLength(1);
        expect(personalInformationForm.find('TextField[name="phone"]')).toHaveLength(1);
    });

    it('should validate default field', () => {
        const personalInformationForm = renderComponent();

        personalInformationForm
            .find('TextField[name="email"]')
            .props()
            .onBlur({
                target: { name: 'email', value: '' }
            });
        expect(personalInformationForm.state().errors).toHaveProperty('email');
    });

    it('should validate all form fields', () => {
        const personalInformationForm = renderComponent();

        personalInformationForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        ['email', 'birthday'].forEach(property => {
            expect(personalInformationForm.state().errors).toHaveProperty(property);
        });

        personalInformationForm
            .find('form')
            .props()
            .onSubmit();
        ['email', 'birthday'].forEach(property => {
            expect(personalInformationForm.state().errors).toHaveProperty(property);
        });
    });
});
