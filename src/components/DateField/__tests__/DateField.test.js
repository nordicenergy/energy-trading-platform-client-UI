import React from 'react';
import { mount } from 'enzyme';
import { KEYBOARD_KEY_VALUES } from '../../../constants';
import DateField from '../DateField';

function renderComponent({ label = 'test', name = 'test', ...otherProps } = {}) {
    const dateField = mount(<DateField label={label} name={name} {...otherProps} />);

    jest.spyOn(dateField.instance().dateFieldRef, 'getBoundingClientRect').mockReturnValue({ top: 450 });
    return dateField;
}

describe('<DateField /> component', () => {
    it('should renders without errors', () => {
        renderComponent({ value: Date.now() });
    });

    it('should shows and hides <DatePicker />', () => {
        const dateField = renderComponent();

        // Close on cancel button click
        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        expect(dateField.find('DatePicker')).toHaveLength(1);
        dateField
            .find('DatePicker')
            .props()
            .onCancel();
        dateField.update();
        expect(dateField.find('DatePicker')).toHaveLength(0);

        // Close on confirm button click
        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        dateField
            .find('DatePicker')
            .props()
            .onConfirm(new Date());
        dateField.update();
        expect(dateField.find('DatePicker')).toHaveLength(0);

        // Close on Backspace key press
        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        dateField
            .find('TextField')
            .props()
            .onKeyDown({ key: KEYBOARD_KEY_VALUES.BACKSPACE });
        dateField.update();
        expect(dateField.find('DatePicker')).toHaveLength(0);

        // Close on click outside of <DatePicker /> component
        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        document.body.dispatchEvent(new MouseEvent('click'));
        dateField.update();
        expect(dateField.find('DatePicker')).toHaveLength(0);
    });

    it('should calculate correct <DatePicker /> position', () => {
        const dateField = renderComponent({ value: Date.now() });

        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        expect(dateField.find('DatePicker').props().position).toBe('top');

        jest.spyOn(dateField.instance().dateFieldRef, 'getBoundingClientRect').mockReturnValue({ top: 200 });
        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        expect(dateField.find('DatePicker').props().position).toBe('bottom');
    });

    it('should not throw an error if `onChange` property is not given', () => {
        const dateField = renderComponent({ onChange: undefined });

        expect(() => {
            dateField.instance().props.onChange();
        }).not.toThrow();
    });

    it('should resets value and calls onChange callback when remove date', () => {
        const onChangeStub = jest.fn();
        const dateDummy = new Date();
        const timestamp = parseInt(dateDummy.getTime() / 1000, 10);
        const dateField = renderComponent({ defaultValue: timestamp, onChange: onChangeStub });

        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();

        dateField
            .find('TextField')
            .props()
            .onKeyDown({ key: 'KeyQ' });
        expect(onChangeStub).not.toHaveBeenCalled();

        dateField
            .find('TextField')
            .props()
            .onKeyDown({ key: KEYBOARD_KEY_VALUES.DELETE });
        expect(dateField.state().value).toBe('');
        expect(onChangeStub).toHaveBeenCalledWith({ name: 'test', value: '' });
    });

    it('should updates state and calls onChange callback when select date', () => {
        const onChangeStub = jest.fn();
        const dateDummy = new Date();
        const timestamp = parseInt(dateDummy.getTime() / 1000, 10);
        const dateField = renderComponent({ onChange: onChangeStub });

        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        dateField
            .find('DatePicker')
            .props()
            .onChange(dateDummy);
        expect(dateField.state().value).toEqual(timestamp);
        expect(onChangeStub).toHaveBeenCalledWith({ name: 'test', value: timestamp });
    });

    it('should calls onChange callback when confirm selected date', () => {
        const onChangeStub = jest.fn();
        const dateDummy = new Date();
        const timestamp = parseInt(dateDummy.getTime() / 1000, 10);
        const dateField = renderComponent({ defaultValue: timestamp, onChange: onChangeStub });

        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        dateField
            .find('DatePicker')
            .props()
            .onConfirm(dateDummy);
        expect(onChangeStub).toHaveBeenCalledWith({ name: 'test', value: timestamp });
    });

    it('should calls onChange callback with initialValue when cancel selected date', () => {
        const onChangeStub = jest.fn();
        const dateDummy = new Date();
        const newDateDummy = new Date(1970, 0, 1);
        const timestamp = parseInt(dateDummy.getTime() / 1000, 10);
        const dateField = renderComponent({ defaultValue: timestamp, onChange: onChangeStub });

        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        dateField
            .find('DatePicker')
            .props()
            .onChange(newDateDummy);
        dateField
            .find('DatePicker')
            .props()
            .onCancel();
        expect(dateField.state().value).toBe(timestamp);
        expect(onChangeStub).toHaveBeenCalledWith({ name: 'test', value: timestamp });
    });

    it('should not throw an error if `onFocus` property is not given', () => {
        const dateField = renderComponent();

        expect(() => {
            dateField.instance().props.onFocus();
        }).not.toThrow();
    });

    it('should call `onFocus` callback', () => {
        const timestamp = parseInt(Date.now() / 1000, 10);
        const onFocusStub = jest.fn();
        const dateField = renderComponent({ onFocus: onFocusStub, value: timestamp });

        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();

        expect(onFocusStub).toHaveBeenCalledWith({ name: 'test', value: timestamp });
    });

    it('should not throw an error if `onBlur` property is not given', () => {
        const dateField = renderComponent();

        expect(() => {
            dateField.instance().props.onBlur();
        }).not.toThrow();
    });

    it('should call `onBlur` callback', () => {
        const timestamp = parseInt(Date.now() / 1000, 10);
        const onBlurStub = jest.fn();
        const dateField = renderComponent({ onBlur: onBlurStub, value: timestamp });

        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        document.body.dispatchEvent(new MouseEvent('click'));
        dateField.update();

        expect(onBlurStub).toHaveBeenCalledWith({ name: 'test', value: timestamp });
    });
});
