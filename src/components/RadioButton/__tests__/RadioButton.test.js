import React from 'react';
import { shallow } from 'enzyme';
import RadioButton from '../RadioButton';

function renderComponent({ id = 'test', name = 'test', ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<RadioButton id={id} name={name} {...otherProps} />);
}

describe('<RadioButton /> component', () => {
    it('should render with necessary elements', () => {
        const radioButton = renderComponent({ label: 'Test' });

        expect(radioButton.find('.radio-button')).toHaveLength(1);
        expect(radioButton.find('input[type="radio"].radio-button-native-control')).toHaveLength(1);
        expect(radioButton.find('.radio-button-control')).toHaveLength(1);
        expect(radioButton.contains(<span className="radio-button-label">Test</span>)).toBeTruthy();
    });

    it('should render with asterisk if radio button is required', () => {
        const radioButton = renderComponent({ label: 'Required', required: true });

        expect(radioButton.find('.radio-button-asterisk')).toHaveLength(1);
    });

    it('should not throw an error if `onChange` property is not given', () => {
        const radioButton = renderComponent();

        expect(() => {
            radioButton.instance().props.onChange(new Event('change'));
        }).not.toThrow();
    });

    it("should update component's state and call `onChange` callback", () => {
        const onChangeStub = jest.fn();
        const eventStub = { target: { name: 'test', checked: true } };
        const radioButton = renderComponent({ onChange: onChangeStub });

        radioButton.find('.radio-button-native-control').simulate('change', eventStub);
        radioButton.update();

        expect(radioButton.instance().state.checked).toBeTruthy();
        expect(onChangeStub).toHaveBeenCalledWith(eventStub);
    });
});
