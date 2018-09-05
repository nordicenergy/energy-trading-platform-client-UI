import React from 'react';
import Validator from 'async-validator';
import pick from 'lodash.pick';
import { shallow } from 'enzyme';
import AbstractForm from '../AbstractForm';
import TextField from '../../TextField';
import SelectField from '../../SelectField';
import DateField from '../../DateField';
import Checkbox from '../../Checkbox';

class TestForm extends AbstractForm {
    prepareValidator(fieldName) {
        const validationScheme = {
            textField: { required: true, message: 'textField is required' },
            dateField: { required: true, message: 'dateField is required' },
            selectField: { required: true, message: 'selectField is required' }
        };

        if (fieldName) {
            return new Validator(pick(validationScheme, fieldName));
        }

        return new Validator(validationScheme);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    required
                    name="textField"
                    label="Text field"
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                />
                <SelectField
                    name="selectField"
                    label="Select field"
                    options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
                    onChange={this.handleSelectChange}
                />
                <DateField
                    name="dateField"
                    label="Date field"
                    onFocus={this.handleDateFieldFocus}
                    onBlur={this.handleDateFieldBlur}
                    onChange={this.handleDateChange}
                />
                <Checkbox name="checkbox" label="Checkbox" onChange={this.handleCheckboxChange} />
            </form>
        );
    }
}

function renderComponent({ formData = { textField: '' }, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<TestForm formData={formData} {...otherProps} />);
}

describe('AbstractForm', () => {
    beforeAll(() => {
        // Prevent displaying async-validator warn messages
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    it('should not throws error if `setFormData` is not given', () => {
        const testForm = renderComponent();

        expect(() => {
            testForm.instance().props.setFormData();
        }).not.toThrow();
    });

    it('should not throws error if `onSubmit` is not given', () => {
        const testForm = renderComponent();

        expect(() => {
            testForm.instance().props.onSubmit();
        }).not.toThrow();
    });

    it('should not throws error if `onCancel` is not given', () => {
        const testForm = renderComponent();

        expect(() => {
            testForm.instance().props.onCancel();
        }).not.toThrow();
    });

    it('should call `setFormData` callback', () => {
        const setFormData = jest.fn();
        const testForm = renderComponent({ setFormData });

        testForm
            .find('TextField')
            .props()
            .onChange({ target: { name: 'textField', value: 'text test' } });
        expect(setFormData).lastCalledWith({ textField: 'text test' });

        testForm
            .find('SelectField')
            .props()
            .onChange({ name: 'selectField', value: 'select test' });
        expect(setFormData).lastCalledWith({ selectField: 'select test' });

        testForm
            .find('DateField')
            .props()
            .onChange({ name: 'dateField', value: '123' });
        expect(setFormData).lastCalledWith({ dateField: '123' });

        testForm
            .find('Checkbox')
            .props()
            .onChange({ target: { name: 'checkbox', value: 'test', checked: false } });
        expect(setFormData).lastCalledWith({ checkbox: false });
    });

    it('should validate `TextField` when the field is blurred', () => {
        const testForm = renderComponent();

        testForm
            .find('TextField')
            .props()
            .onBlur({ target: { name: 'textField', value: '' } });
        expect(testForm.state().errors).toEqual({ textField: 'textField is required' });
    });

    it('should validate `DateField` when the field is blurred', () => {
        const testForm = renderComponent();

        testForm
            .find('DateField')
            .props()
            .onBlur({ name: 'dateField', value: '' });
        expect(testForm.state().errors).toEqual({ dateField: 'dateField is required' });
    });

    it('should clear error for `TextField` when the field is focused', () => {
        const testForm = renderComponent();

        testForm.setState({ errors: { textField: 'test error', selectField: 'test error' } });
        testForm
            .find('TextField')
            .props()
            .onFocus({ target: { name: 'textField', value: '' } });
        expect(testForm.state().errors).toEqual({ selectField: 'test error' });
    });

    it('should clear error for `DateField` when the field is focused', () => {
        const testForm = renderComponent();

        testForm.setState({ errors: { dateField: 'test error' } });
        testForm
            .find('DateField')
            .props()
            .onFocus({ name: 'dateField', value: '' });
        expect(testForm.state().errors).toEqual({});
    });

    it('should validate all fields when the forms is submitted', () => {
        const testForm = renderComponent();

        testForm
            .find('form')
            .props()
            .onSubmit({ preventDefault: jest.fn() });
        expect(testForm.state().errors).toEqual({
            textField: 'textField is required',
            dateField: 'dateField is required',
            selectField: 'selectField is required'
        });

        testForm.setProps({ formData: { textField: 'text', dateField: '123', selectField: '1' } });
        testForm
            .find('form')
            .props()
            .onSubmit();
        expect(testForm.state().errors).toEqual({});
    });
});
