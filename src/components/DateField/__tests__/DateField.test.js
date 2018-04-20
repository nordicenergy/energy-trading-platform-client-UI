import React from 'react';
import { shallow, mount } from 'enzyme';
import DateField from '../DateField';

const onChangeMock = jest.fn();
function renderComponent({ onChange = onChangeMock, ...otherProps } = {}, mountFn = mount) {
    return mountFn(<DateField {...otherProps} onChange={onChange} />);
}

describe('<DateField /> component', () => {
    afterEach(() => {
        onChangeMock.mockClear();
    });

    it('should renders without errors', () => {
        renderComponent({ value: new Date() });
    });

    it('should calculate date picker position', () => {
        const dateField = renderComponent({ value: new Date() });

        jest.spyOn(dateField.instance().dateFieldRef, 'getBoundingClientRect').mockReturnValue({ top: 400 });
        dateField
            .find('TextField')
            .props()
            .onFocus();
        expect(dateField.state().datePickerPosition).toBe('top');
        dateField.instance().dateFieldRef.getBoundingClientRect.mockRestore();

        jest.spyOn(dateField.instance().dateFieldRef, 'getBoundingClientRect').mockReturnValue({ top: 200 });
        dateField
            .find('TextField')
            .props()
            .onFocus();
        expect(dateField.state().datePickerPosition).toBe('bottom');
        dateField.instance().dateFieldRef.getBoundingClientRect.mockRestore();
    });

    it('should display date picker', () => {
        const dateField = renderComponent();

        dateField
            .find('TextField')
            .props()
            .onFocus();
        dateField.update();
        expect(dateField.find('DatePicker')).toHaveLength(1);
    });

    it('should update state and calls onChange callback', () => {
        let dateMock = new Date();
        const dateField = renderComponent({}, shallow);

        dateField.setState({ hasFocus: true });
        dateField.update();
        dateField
            .find('DatePicker')
            .props()
            .onChange(dateMock);
        expect(dateField.state().value).toEqual(dateMock);
        expect(onChangeMock).toHaveBeenCalledWith(dateMock);

        onChangeMock.mockClear();
        dateMock = new Date();
        dateField
            .find('DatePicker')
            .props()
            .onConfirm(dateMock);
        expect(dateField.state().value).toEqual(dateMock);
        expect(dateField.state().hasFocus).toBeFalsy();
        expect(onChangeMock).toHaveBeenCalledWith(dateMock);
    });

    it('should not calls onChange callback', () => {
        const dateField = renderComponent({}, shallow);

        dateField.setState({ hasFocus: true });
        dateField
            .find('DatePicker')
            .props()
            .onCancel();
        expect(dateField.state().hasFocus).toBeFalsy();
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it('should not calls onChange callback if onChange is not a function', () => {
        let dateMock = new Date();
        const dateField = renderComponent({ onChange: null }, shallow);

        dateField.setState({ hasFocus: true });
        dateField.update();
        dateField
            .find('DatePicker')
            .props()
            .onChange(dateMock);
        expect(onChangeMock).not.toHaveBeenCalled();
    });
});
