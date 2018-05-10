import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationForm from '../ConfigurationForm';

const labelsDummy = {
    title: 'Configuration',
    blockChainField: 'Blockchain',
    addressField: 'Your Address',
    addressFieldHelperText: 'Example',
    button: 'Add Your Address',
    helperText: 'Assign your address to your Lition account'
};
function renderComponent({ labels = labelsDummy, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<ConfigurationForm labels={labels} {...otherProps} />);
}

describe('<ConfigurationForm /> component', () => {
    it(`should renders:
        - h3 with form title;
        - SelectField;
        - TextField with address name;
        - Button;
        - small with helper text;`, () => {
        const configurationForm = renderComponent();

        expect(configurationForm.find('h3').text()).toBe(labelsDummy.title);
        expect(configurationForm.find('SelectField')).toHaveLength(1);
        expect(configurationForm.find('TextField[name="address"]')).toHaveLength(1);
        expect(configurationForm.find('Button')).toHaveLength(1);
        expect(configurationForm.find('.configuration-form-actions > small').text()).toBe(labelsDummy.helperText);
    });

    it('should renders with errors', () => {
        const configurationForm = renderComponent({ errors: { address: 'Enter address' } });

        expect(configurationForm.find('TextField[name="address"]').props().error).toBe('Enter address');
    });

    it('should updates state when input values was changed', () => {
        const configurationForm = renderComponent();
        const blockChainDummy = { value: 'test', name: 'Test' };

        configurationForm
            .find('SelectField')
            .props()
            .onChange(blockChainDummy);
        configurationForm
            .find('TextField')
            .props()
            .onChange({ currentTarget: { name: 'address', value: 'test address' } });
        expect(configurationForm.state()).toEqual({
            blockChain: blockChainDummy,
            address: 'test address'
        });
    });

    it('should calls onSubmit callback', () => {
        const onSubmitStub = jest.fn();
        const configurationForm = renderComponent({ onSubmit: onSubmitStub });

        configurationForm.setState({ blockChain: { value: 'test', name: 'Test' }, address: 'test address' });
        configurationForm.update();
        configurationForm.find('form').simulate('submit', new Event('submit'));
        expect(onSubmitStub).toHaveBeenCalledWith({
            blockChain: 'test',
            address: 'test address'
        });
    });
});
