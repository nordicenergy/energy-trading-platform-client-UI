import React from 'react';
import { shallow } from 'enzyme';
import Wizard from '../../Wizard';
import DeliveryAddressForm from '../DeliveryAddressForm';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<DeliveryAddressForm {...props} />);
}

describe('<DeliveryAddressForm /> component', () => {
    beforeAll(() => {
        // Prevent displaying async-validator warn messages
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    it('should render with necessary elements', () => {
        const deliveryAddressForm = renderComponent();

        expect(deliveryAddressForm.find('TextField[name="company"]')).toHaveLength(0);
        expect(deliveryAddressForm.find('TextField[name="legalForm"]')).toHaveLength(0);
        expect(deliveryAddressForm.find('RadioButton[name="business"]')).toHaveLength(2);
        expect(deliveryAddressForm.find('SelectField[name="salutation"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="firstName"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="lastName"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="postcode"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="city"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="street"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="streetNumber"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('RadioButton[name="billingAlternativeAddress"]')).toHaveLength(2);
        expect(deliveryAddressForm.find('TextField[name="billingCompany"]')).toHaveLength(0);
        expect(deliveryAddressForm.find('TextField[name="billingLegalForm"]')).toHaveLength(0);
        expect(deliveryAddressForm.find('SelectField[name="billingSalutation"]')).toHaveLength(0);
        expect(deliveryAddressForm.find('TextField[name="billingFirstName"]')).toHaveLength(0);
        expect(deliveryAddressForm.find('TextField[name="billingSurname"]')).toHaveLength(0);
        expect(deliveryAddressForm.find('TextField[name="billingZip"]')).toHaveLength(0);
        expect(deliveryAddressForm.find('TextField[name="billingCity"]')).toHaveLength(0);
        expect(deliveryAddressForm.find('TextField[name="billingStreet"]')).toHaveLength(0);
        expect(deliveryAddressForm.find('TextField[name="billingHouseNumber"]')).toHaveLength(0);
    });

    it('should render with billing fields', () => {
        const deliveryAddressForm = renderComponent();

        deliveryAddressForm.setProps({ formData: { billingAlternativeAddress: true } });
        deliveryAddressForm.update();

        expect(deliveryAddressForm.find('SelectField[name="billingSalutation"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="billingFirstName"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="billingSurname"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="billingZip"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="billingCity"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="billingStreet"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="billingHouseNumber"]')).toHaveLength(1);
    });

    it('should render with company fields fields', () => {
        const deliveryAddressForm = renderComponent();

        deliveryAddressForm.setProps({ formData: { business: true, billingAlternativeAddress: true } });
        deliveryAddressForm.update();

        expect(deliveryAddressForm.find('TextField[name="company"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="legalForm"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="billingCompany"]')).toHaveLength(1);
        expect(deliveryAddressForm.find('TextField[name="billingLegalForm"]')).toHaveLength(1);
    });

    it('should handle `business` change', () => {
        const setFormData = jest.fn();
        const deliveryAddressForm = renderComponent({ setFormData });

        deliveryAddressForm
            .find('RadioButton[name="business"]')
            .at(1)
            .props()
            .onChange({
                target: { name: 'business', value: 'yes' }
            });
        expect(setFormData).toHaveBeenCalledWith({ business: true });

        deliveryAddressForm
            .find('RadioButton[name="business"]')
            .at(0)
            .props()
            .onChange({
                target: { name: 'business', value: 'no' }
            });
        expect(setFormData).toHaveBeenCalledWith({
            business: false,
            company: '',
            legalForm: '',
            billingCompany: '',
            billingLegalForm: ''
        });
    });

    it('should handle `billingAlternativeAddress` change', () => {
        const setFormData = jest.fn();
        const deliveryAddressForm = renderComponent({ setFormData });

        deliveryAddressForm
            .find('RadioButton[name="billingAlternativeAddress"]')
            .at(1)
            .props()
            .onChange({
                target: { name: 'billingAlternativeAddress', value: 'yes' }
            });
        expect(setFormData).toHaveBeenCalledWith({ billingAlternativeAddress: true });

        deliveryAddressForm
            .find('RadioButton[name="billingAlternativeAddress"]')
            .at(0)
            .props()
            .onChange({
                target: { name: 'billingAlternativeAddress', value: 'no' }
            });
        expect(setFormData).toHaveBeenCalledWith({
            billingAlternativeAddress: false,
            billingCompany: '',
            billingLegalForm: '',
            billingSalutation: '1',
            billingSurname: '',
            billingFirstName: '',
            billingZip: '',
            billingCity: '',
            billingStreet: '',
            billingHouseNumber: ''
        });
    });

    it('should validate all form fields', () => {
        const defaultProperties = ['firstName', 'lastName', 'postcode', 'city', 'street', 'streetNumber'];
        const deliveryAddressForm = renderComponent();

        deliveryAddressForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        defaultProperties.forEach(property => {
            expect(deliveryAddressForm.state().errors).toHaveProperty(property);
        });

        deliveryAddressForm.setProps({ formData: { business: true } });
        deliveryAddressForm.update();
        deliveryAddressForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        [...defaultProperties, 'company', 'legalForm'].forEach(property => {
            expect(deliveryAddressForm.state().errors).toHaveProperty(property);
        });

        deliveryAddressForm.setProps({ formData: { business: true, billingAlternativeAddress: true } });
        deliveryAddressForm.update();
        deliveryAddressForm
            .find('form')
            .props()
            .onSubmit();
        [
            ...defaultProperties,
            'company',
            'legalForm',
            'billingCompany',
            'billingLegalForm',
            'billingFirstName',
            'billingSurname',
            'billingZip',
            'billingCity',
            'billingStreet',
            'billingHouseNumber'
        ].forEach(property => {
            expect(deliveryAddressForm.state().errors).toHaveProperty(property);
        });
    });
});
