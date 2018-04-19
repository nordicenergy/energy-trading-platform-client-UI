import React from 'react';
import { shallow } from 'enzyme';
import NumberField from '../NumberField';

function renderComponent({ label = 'Delta to Market Price', ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<NumberField label={label} {...otherProps} />);
}

describe('<NumberField /> component', () => {
    jest.useFakeTimers();

    it('should renders without errors', () => {
        renderComponent({ defaultValue: 'abc' });
    });

    it('should renders without errors', () => {
        const numberField = renderComponent({ units: 'cent' });

        expect(numberField.find('.number-field-units')).toHaveLength(1);
        expect(numberField.find('.number-field-units').text()).toBe('cent');
    });

    it('should update state when increase button was pressing', () => {
        const numberField = renderComponent();

        numberField.find('.number-field-control--plus').simulate('mouseDown');
        expect(numberField.state().valueIsIncrease).toBeTruthy();
        numberField.find('.number-field-control--plus').simulate('mouseUp');
        expect(numberField.state().valueIsIncrease).toBeFalsy();
    });

    it('should update state when decrease button was pressing', () => {
        const numberField = renderComponent({ defaultValue: '0.4' });

        numberField.find('.number-field-control--minus').simulate('mouseDown');
        expect(numberField.state().valueIsDecrease).toBeTruthy();
        numberField.find('.number-field-control--minus').simulate('mouseUp');
        expect(numberField.state().valueIsDecrease).toBeFalsy();
    });

    it('should update state when input value was changed', () => {
        const numberField = renderComponent();

        numberField.find('.number-field-input').simulate('change', {
            currentTarget: { value: 123 }
        });
        expect(numberField.state().value).toBe(123);
    });

    it('should call onChange callback when input value was changed', () => {
        const onChangeMock = jest.fn();
        const numberField = renderComponent({ onChange: onChangeMock });

        numberField.find('.number-field-input').simulate('change', {
            currentTarget: { value: 123 }
        });
        expect(onChangeMock).toHaveBeenCalledWith(123);
    });

    it('should call onChange callback when button was pressed', () => {
        const onChangeMock = jest.fn();
        const numberField = renderComponent({ onChange: onChangeMock });

        numberField.find('.number-field-control--plus').simulate('mouseDown');
        expect(onChangeMock).toHaveBeenCalledWith(0.1);
    });

    it('should return correct step', () => {
        const numberField = renderComponent();

        expect(numberField.find('.number-field-input').props().step).toBe(0.1);

        numberField.setState({ value: 15 });
        numberField.update();
        expect(numberField.find('.number-field-input').props().step).toBe(1);

        numberField.setState({ value: 100 });
        numberField.update();
        expect(numberField.find('.number-field-input').props().step).toBe(10);

        numberField.setProps({ step: 13 });
        expect(numberField.find('.number-field-input').props().step).toBe(13);
    });

    it('should change value when increase button was pressing', () => {
        jest.spyOn(window, 'setInterval').mockImplementation(jest.fn());
        const numberField = renderComponent();

        numberField.setState({ valueIsIncrease: true });
        jest.runAllTimers();
        const [[callback]] = window.setInterval.mock.calls;
        callback();
        expect(numberField.state().value).toBe(0.1);

        window.setInterval.mockRestore();
    });
});
