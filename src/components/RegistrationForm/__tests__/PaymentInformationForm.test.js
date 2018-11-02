import React from 'react';
import { shallow } from 'enzyme';
import Wizard from '../../Wizard';
import PaymentInformationForm from '../PaymentInformationForm';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<PaymentInformationForm {...props} />);
}

describe('<PaymentInformationForm /> component', () => {
    beforeAll(() => {
        // Prevent displaying async-validator warn messages
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    it('should render with necessary elements', () => {
        const paymentInformationForm = renderComponent();

        expect(paymentInformationForm.find('RadioButton[name="paymentMethod"]')).toHaveLength(3);
        expect(paymentInformationForm.find('IBANField[name="iban"]')).toHaveLength(1);
        expect(paymentInformationForm.find('TextField[name="alternativeAccountHolder"]')).toHaveLength(1);
        expect(paymentInformationForm.find('Checkbox[name="sepaApproval"]')).toHaveLength(1);
    });

    it('should render with optional fields', () => {
        const paymentInformationForm = renderComponent();

        paymentInformationForm.setProps({ formData: { paymentMethod: 'remittance' } });
        paymentInformationForm.update();

        expect(paymentInformationForm.find('TextField[name="iban"]')).toHaveLength(0);
        expect(paymentInformationForm.find('TextField[name="alternativeAccountHolder"]')).toHaveLength(0);
        expect(paymentInformationForm.find('Checkbox[name="sepaApproval"]')).toHaveLength(0);
    });

    it('should handle `paymentMethod` change', () => {
        const setFormData = jest.fn();
        const paymentInformationForm = renderComponent({ setFormData });

        paymentInformationForm
            .find('RadioButton[name="paymentMethod"]')
            .at(0)
            .props()
            .onChange({
                target: { name: 'paymentMethod', value: 'debit' }
            });
        expect(setFormData).toHaveBeenCalledWith({ paymentMethod: 'debit' });

        paymentInformationForm
            .find('RadioButton[name="paymentMethod"]')
            .at(1)
            .props()
            .onChange({
                target: { name: 'paymentMethod', value: 'remittance' }
            });
        expect(setFormData).toHaveBeenCalledWith({
            paymentMethod: 'remittance',
            iban: '',
            alternativeAccountHolder: '',
            sepaApproval: false
        });
    });

    it('should validate all form fields', () => {
        const paymentInformationForm = renderComponent();

        paymentInformationForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        ['iban', 'sepaApproval'].forEach(property => {
            expect(paymentInformationForm.state().errors).toHaveProperty(property);
        });

        paymentInformationForm.setProps({ formData: { paymentMethod: 'debit', iban: 'ABC', sepaApproval: false } });
        paymentInformationForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        ['iban', 'sepaApproval'].forEach(property => {
            expect(paymentInformationForm.state().errors).toHaveProperty(property);
        });

        paymentInformationForm.setProps({
            formData: { paymentMethod: 'debit', iban: 'DE89370400440532013000', sepaApproval: true }
        });
        paymentInformationForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        expect(paymentInformationForm.state().errors).toEqual({});

        paymentInformationForm.setProps({ formData: { paymentMethod: 'remittance' } });
        paymentInformationForm.update();
        paymentInformationForm
            .find('form')
            .props()
            .onSubmit();
        expect(paymentInformationForm.state().errors).toEqual({});
    });
});
