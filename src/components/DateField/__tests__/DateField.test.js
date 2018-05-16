import React from 'react';
import { mount } from 'enzyme';
import { KEYBOARD_KEY_VALUES } from '../../../constants';
import DateField from '../DateField';

const onChangeStub = jest.fn();
function renderComponent({ label = 'test', name = 'test', onChange = onChangeStub, ...otherProps } = {}) {
    const dateField = mount(<DateField label={label} name={name} onChange={onChange} {...otherProps} />);

    jest.spyOn(dateField.instance().dateFieldRef, 'getBoundingClientRect').mockReturnValue({ top: 450 });
    return dateField;
}

describe('<DateField /> component', () => {
    afterEach(() => {
        onChangeStub.mockClear();
    });

    it('should renders without errors', () => {
        renderComponent({ value: Date.now() });
    });

    it('should shows and hides <DatePicker />', () => {
        const dateField = renderComponent();

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
    });

    it('should correct calculates correct <DatePicker /> position', () => {
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

    it('should resets value and calls onChange callback when remove date', () => {
        const dateDummy = new Date();
        const timestamp = parseInt(dateDummy.getTime() / 1000, 10);
        const dateField = renderComponent({ defaultValue: timestamp });

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
        const dateDummy = new Date();
        const timestamp = parseInt(dateDummy.getTime() / 1000, 10);
        const dateField = renderComponent({});

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
        const dateDummy = new Date();
        const timestamp = parseInt(dateDummy.getTime() / 1000, 10);
        const dateField = renderComponent({ defaultValue: timestamp });

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
        const dateDummy = new Date();
        const newDateDummy = new Date(1970, 0, 1);
        const timestamp = parseInt(dateDummy.getTime() / 1000, 10);
        const dateField = renderComponent({ defaultValue: timestamp });

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

    it('should not calls onChange callback if onChange is not a function', () => {
        let dateDummy = new Date();
        const dateField = renderComponent({ onChange: null });

        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        dateField
            .find('DatePicker')
            .props()
            .onChange(dateDummy);
        dateField
            .find('DatePicker')
            .props()
            .onConfirm(dateDummy);
        dateField
            .find('DatePicker')
            .props()
            .onCancel();
    });
});
