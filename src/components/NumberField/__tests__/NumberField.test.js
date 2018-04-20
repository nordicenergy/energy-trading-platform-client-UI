import React from 'react';
import { shallow } from 'enzyme';
import NumberField from '../NumberField';

function renderComponent({ label = 'Delta to Market Price', ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<NumberField label={label} {...otherProps} />);
}

describe('<NumberField /> component', () => {
    it('should renders without errors', () => {
        renderComponent({ defaultValue: 'abc' });
    });

    it('should renders without errors', () => {
        const numberField = renderComponent({ units: 'cent' });

        expect(numberField.find('.number-field-units')).toHaveLength(1);
        expect(numberField.find('.number-field-units').text()).toBe('cent');
    });

    it('should updates state when input value was changed', () => {
        const numberField = renderComponent();

        numberField.find('.number-field-input').simulate('change', {
            currentTarget: { value: 123 }
        });
        expect(numberField.state().value).toBe(123);
    });

    it('should calls onChange callback when input value was changed', () => {
        const onChangeMock = jest.fn();
        const numberField = renderComponent({ onChange: onChangeMock });

        numberField.find('.number-field-input').simulate('change', {
            currentTarget: { value: 123 }
        });
        expect(onChangeMock).toHaveBeenCalledWith(123);
    });

    it('should returns correct step', () => {
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

    it('should updates state when some button was pressed', () => {
        const numberField = renderComponent({ defaultValue: '1' });

        numberField
            .find('LongPressButton')
            .at(1)
            .props()
            .onPress();
        expect(numberField.state().value).toBe(1.1);
        numberField
            .find('LongPressButton')
            .at(0)
            .props()
            .onPress();
        expect(numberField.state().value).toBe(1);
    });

    it('should calls onChange callback when some button was pressed', () => {
        const onChangeMock = jest.fn();
        const numberField = renderComponent({ onChange: onChangeMock });

        numberField
            .find('LongPressButton')
            .at(1)
            .props()
            .onPress();
        expect(onChangeMock).toHaveBeenCalledWith(0.1);
    });

    it.skip('should changes value when increase button was pressing', () => {
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
