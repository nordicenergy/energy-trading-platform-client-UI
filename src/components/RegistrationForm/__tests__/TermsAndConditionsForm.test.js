import React from 'react';
import { shallow } from 'enzyme';
import Wizard from '../../Wizard';
import TermsAndConditionsForm from '../TermsAndConditionsForm';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<TermsAndConditionsForm {...props} />);
}

describe('<TermsAndConditionsForm /> component', () => {
    beforeAll(() => {
        // Prevent displaying async-validator warn messages
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    it('should render with necessary elements', () => {
        const termAndConditionsForm = renderComponent();

        expect(termAndConditionsForm.find('TextField[name="message"]')).toHaveLength(1);
        expect(termAndConditionsForm.find('Checkbox[name="agbApproval"]')).toHaveLength(1);
        expect(termAndConditionsForm.find('Checkbox[name="enableNotifications"]')).toHaveLength(1);
    });

    it('should validate all form fields', () => {
        const termAndConditionsForm = renderComponent();

        termAndConditionsForm
            .find(Wizard.Content)
            .props()
            .onNextButtonClick();
        ['agbApproval'].forEach(property => {
            expect(termAndConditionsForm.state().errors).toHaveProperty(property);
        });
    });
});
