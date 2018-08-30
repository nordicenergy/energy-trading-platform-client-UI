import React from 'react';
import { shallow } from 'enzyme';
import Wizard from '../../Wizard';
import ConsumptionForm from '../ConsumptionForm';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<ConsumptionForm {...props} />);
}

describe('<ConsumptionForm /> component', () => {
    beforeAll(() => {
        // Prevent displaying async-validator warn messages
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    it('should render with necessary elements', () => {
        const consumptionForm = renderComponent();

        expect(consumptionForm.find('TextField[name="usage"]')).toHaveLength(1);
        expect(consumptionForm.find('RadioButton[name="customerSpecification"]')).toHaveLength(2);
        expect(consumptionForm.find('TextField[name="counterNumber"]')).toHaveLength(1);
        expect(consumptionForm.find('DateField[name="relocationDate"]')).toHaveLength(0);
    });

    it('should render with optional fields', () => {
        const consumptionForm = renderComponent();

        consumptionForm.setProps({ formData: { customerSpecification: 'relocation_at' } });
        consumptionForm.update();

        expect(consumptionForm.find('DateField[name="relocationDate"]')).toHaveLength(1);
    });

    it('should handle `customerSpecification` change', () => {
        const setFormData = jest.fn();
        const consumptionForm = renderComponent({ setFormData });

        consumptionForm
            .find('RadioButton[name="customerSpecification"]')
            .at(0)
            .props()
            .onChange({
                target: { name: 'customerSpecification', value: 'earliest_possible_date' }
            });
        expect(setFormData).toHaveBeenCalledWith({
            customerSpecification: 'earliest_possible_date',
            relocationDate: ''
        });

        consumptionForm
            .find('RadioButton[name="customerSpecification"]')
            .at(1)
            .props()
            .onChange({
                target: { name: 'customerSpecification', value: 'relocation_at' }
            });
        expect(setFormData).toHaveBeenCalledWith({ customerSpecification: 'relocation_at' });
    });

    it('should validate all form fields', () => {
        const defaultProperties = ['usage', 'counterNumber'];
        const consumptionForm = renderComponent();

        consumptionForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        defaultProperties.forEach(property => {
            expect(consumptionForm.state().errors).toHaveProperty(property);
        });

        consumptionForm.setProps({ formData: { customerSpecification: 'relocation_at' } });
        consumptionForm.update();
        consumptionForm
            .find('form')
            .props()
            .onSubmit();
        [...defaultProperties, 'relocationDate'].forEach(property => {
            expect(consumptionForm.state().errors).toHaveProperty(property);
        });
    });
});
