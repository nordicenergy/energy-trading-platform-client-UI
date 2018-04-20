import React from 'react';
import { mount } from 'enzyme';
import DatePicker from '../DatePicker';

const labelsMock = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};
const onChangeMock = jest.fn();
const onConfirmMock = jest.fn();
function renderComponent(
    { labels = labelsMock, onChange = onChangeMock, onConfirm = onConfirmMock, ...otherProps } = {},
    mountFn = mount
) {
    return mountFn(<DatePicker labels={labels} onChange={onChange} onConfirm={onConfirm} {...otherProps} />);
}

describe('<DatePicker /> component', () => {
    afterEach(() => {
        onChangeMock.mockClear();
        onConfirmMock.mockClear();
    });

    it('should renders without errors', () => {
        const datePicker = renderComponent();
        const handlePickMeUpChange = datePicker.instance().handlePickMeUpChange;
        const destroyMock = jest.spyOn(datePicker.instance().datepicker, 'destroy').mockImplementation(jest.fn());
        const removeEventListenerMock = jest
            .spyOn(datePicker.instance().datePickerRef, 'removeEventListener')
            .mockImplementation(jest.fn());

        datePicker.unmount();
        expect(destroyMock).toHaveBeenCalled();
        expect(removeEventListenerMock).toHaveBeenCalledWith('pickmeup-change', handlePickMeUpChange);
    });

    it('should renders with correct classes', () => {
        const datePicker = renderComponent({ position: 'bottom', className: 'custom-class' });

        expect(datePicker.html().includes('date-picker--bottom')).toBeTruthy();
        expect(datePicker.html().includes('custom-class')).toBeTruthy();
    });

    it('should calls onChange callback when day was selected', () => {
        const dateMock = new Date();
        const datePicker = renderComponent();
        const eventMock = new Event('pickmeup-change');
        Object.defineProperty(eventMock, 'detail', { value: { date: dateMock } });

        datePicker.instance().datePickerRef.dispatchEvent(eventMock);
        expect(onChangeMock).toHaveBeenCalledWith(dateMock);
    });

    it('should not calls onChange callback if onChange is not a function', () => {
        const dateMock = new Date();
        const datePicker = renderComponent({ onChange: null });
        const eventMock = new Event('pickmeup-change');
        Object.defineProperty(eventMock, 'detail', { value: { date: dateMock } });

        datePicker.instance().datePickerRef.dispatchEvent(eventMock);
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it('should calls onConfirm callback when confirm button was clicked', () => {
        const dateMock = new Date();
        const datePicker = renderComponent();
        jest.spyOn(datePicker.instance().datepicker, 'get_date').mockReturnValue(dateMock);

        datePicker
            .find('button')
            .at(1)
            .simulate('click');
        expect(onConfirmMock).toHaveBeenCalledWith(dateMock);

        datePicker.instance().datepicker.get_date.mockRestore();
    });

    it('should not calls onConfirm callback if onConfirm is not a function', () => {
        const dateMock = new Date();
        const datePicker = renderComponent({ onConfirm: null });
        jest.spyOn(datePicker.instance().datepicker, 'get_date').mockReturnValue(dateMock);

        datePicker
            .find('button')
            .at(1)
            .simulate('click');
        expect(onConfirmMock).not.toHaveBeenCalled();

        datePicker.instance().datepicker.get_date.mockRestore();
    });

    it('should set new date when component was updated', () => {
        const dateMock = new Date();
        const datePicker = renderComponent();
        jest.spyOn(datePicker.instance().datepicker, 'set_date').mockImplementation(jest.fn());

        datePicker.setProps({ date: dateMock });
        expect(datePicker.instance().datepicker.set_date).toHaveBeenCalledWith(dateMock);

        datePicker.instance().datepicker.set_date.mockRestore();
    });
});
