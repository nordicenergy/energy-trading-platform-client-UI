import React from 'react';
import { shallow } from 'enzyme';
import RegistrationForm from '../RegistrationForm';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<RegistrationForm {...props} />);
}

describe('<RegistrationForm /> component', () => {
    it('should render with necessary elements', () => {
        const registrationForm = renderComponent();

        expect(registrationForm.find('Wizard')).toHaveLength(1);
        expect(registrationForm.find('DeliveryAddressForm')).toHaveLength(1);
        expect(registrationForm.find('ConsumptionForm')).toHaveLength(0);
        expect(registrationForm.find('PersonalInformationForm')).toHaveLength(0);
        expect(registrationForm.find('PaymentInformationForm')).toHaveLength(0);
        expect(registrationForm.find('AuthInformationForm')).toHaveLength(0);
        expect(registrationForm.find('TermsAndConditionsForm')).toHaveLength(0);
    });

    it('should go to next step', () => {
        const registrationForm = renderComponent();

        [
            { succeedSteps: [1], nextNumber: 2, component: 'DeliveryAddressForm', nextComponent: 'ConsumptionForm' },
            {
                succeedSteps: [1, 2],
                nextNumber: 3,
                component: 'ConsumptionForm',
                nextComponent: 'PersonalInformationForm'
            },
            {
                succeedSteps: [1, 2, 3],
                nextNumber: 4,
                component: 'PersonalInformationForm',
                nextComponent: 'PaymentInformationForm'
            },
            {
                succeedSteps: [1, 2, 3, 4],
                nextNumber: 5,
                component: 'PaymentInformationForm',
                nextComponent: 'AuthInformationForm'
            },
            {
                succeedSteps: [1, 2, 3, 4, 5],
                nextNumber: 6,
                component: 'AuthInformationForm',
                nextComponent: 'TermsAndConditionsForm'
            }
        ].forEach(({ nextNumber, succeedSteps, component, nextComponent }) => {
            registrationForm
                .find(component)
                .props()
                .onSubmit();
            registrationForm.update();
            expect(registrationForm.state().activeStep).toBe(nextNumber);
            expect(registrationForm.state().succeedSteps).toEqual(succeedSteps);
            expect(registrationForm.find(nextComponent)).toHaveLength(1);
        });
    });

    it('should go to previous step', () => {
        const registrationForm = renderComponent();
        const succeedSteps = [1, 2, 3, 4, 5];
        registrationForm.setState({
            activeStep: 6,
            succeedSteps
        });
        registrationForm.update();

        registrationForm
            .find('TermsAndConditionsForm')
            .props()
            .onCancel();
        registrationForm.update();

        [
            { number: 5, component: 'AuthInformationForm' },
            { number: 4, component: 'PaymentInformationForm' },
            { number: 3, component: 'PersonalInformationForm' },
            { number: 2, component: 'ConsumptionForm' }
        ].forEach(({ number, component }) => {
            expect(registrationForm.state().activeStep).toBe(number);
            expect(registrationForm.state().succeedSteps).toEqual(succeedSteps);
            expect(registrationForm.find(component)).toHaveLength(1);

            registrationForm
                .find(component)
                .props()
                .onCancel();
            registrationForm.update();
        });
    });

    it('should update form data for steps', () => {
        const registrationForm = renderComponent();

        [
            { number: 1, component: 'DeliveryAddressForm', formData: { firstName: 'test', lastName: 'test' } },
            { number: 2, component: 'ConsumptionForm', formData: { usage: 9999 } },
            { number: 3, component: 'PersonalInformationForm', formData: { email: 'test@example.com' } },
            { number: 4, component: 'PaymentInformationForm', formData: {} },
            { number: 5, component: 'AuthInformationForm', formData: { password: 'qwerty123' } },
            { number: 6, component: 'TermsAndConditionsForm', formData: { message: 'test message' } }
        ].forEach(({ number, component, formData }) => {
            registrationForm.setState({ activeStep: number });
            registrationForm.update();
            registrationForm
                .find(component)
                .props()
                .setFormData(formData);

            expect(registrationForm.state().stepsFormData).toEqual({
                ...registrationForm.state().stepsFormData,
                [number]: {
                    ...registrationForm.state().stepsFormData[number],
                    ...formData
                }
            });
        });
    });

    it('should not throw error if `onSubmit` is not given', () => {
        const registrationForm = renderComponent();

        expect(() => {
            registrationForm.instance().props.onSubmit();
        }).not.toThrow();
    });

    it('should call `onSubmit` callback with form data', () => {
        const onSubmit = jest.fn();
        const registrationForm = renderComponent({ onSubmit });

        registrationForm.setState({ activeStep: 6, succeedSteps: [1, 2, 3, 4, 5] });
        registrationForm.update();
        registrationForm
            .find('TermsAndConditionsForm')
            .props()
            .onSubmit();

        expect(onSubmit).toHaveBeenCalledWith({
            ...registrationForm.state().stepsFormData[1],
            ...registrationForm.state().stepsFormData[2],
            ...registrationForm.state().stepsFormData[3],
            ...registrationForm.state().stepsFormData[4],
            ...registrationForm.state().stepsFormData[5],
            ...registrationForm.state().stepsFormData[6]
        });
    });
});
