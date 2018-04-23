import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../TextField';

const onChangeMock = jest.fn();
const onFocusMock = jest.fn();
const onBlurMock = jest.fn();
function renderComponent(
    { label = 'Test', onChange = onChangeMock, onFocus = onFocusMock, onBlur = onBlurMock, ...otherProps } = {},
    mountFn = shallow
) {
    return mountFn(<TextField {...otherProps} label={label} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />);
}

describe('<TextField /> component', () => {
    beforeEach(() => {
        onChangeMock.mockClear();
        onFocusMock.mockClear();
        onBlurMock.mockClear();
    });

    it(`should renders:
        - label
        - input`, () => {
        const textField = renderComponent();

        expect(textField.find('.text-field-label')).toHaveLength(1);
        expect(textField.find('.text-field-label').text()).toBe('Test');
        expect(textField.find('.text-field-input')).toHaveLength(1);
    });

    it('should renders with helper text', () => {
        const helperTextMock = 'Test helper text';
        const textField = renderComponent({ helperText: helperTextMock });

        expect(textField.find('.text-field-helper-text')).toHaveLength(1);
        expect(textField.find('.text-field-helper-text').text()).toBe(helperTextMock);
    });

    it('should renders with addon', () => {
        const addonMock = 'Test addon';
        const textField = renderComponent({ addon: addonMock });

        expect(textField.find('.text-field-addon')).toHaveLength(1);
        expect(textField.find('.text-field-addon').text()).toBe(addonMock);
    });

    it('should renders with error', () => {
        const errorMock = 'Test error';
        const textField = renderComponent({ error: errorMock });

        expect(textField.hasClass('text-field--error')).toBeTruthy();
        expect(textField.find('.text-field-error')).toHaveLength(1);
        expect(textField.find('.text-field-error').text()).toBe(errorMock);
    });

    it('should adds class when field in focus', () => {
        const textField = renderComponent();

        textField.find('.text-field-input').simulate('focus');
        expect(textField.hasClass('text-field--focused')).toBeTruthy();
    });

    it('should calls onFocus callback when field was focused', () => {
        const textField = renderComponent();

        textField.find('.text-field-input').simulate('focus');
        expect(onFocusMock).toHaveBeenCalled();
    });

    it('should not calls onFocus if onFocus is not a function', () => {
        const textField = renderComponent({ onFocus: null });

        textField.find('.text-field-input').simulate('focus');
    });

    it('should calls onBlur callback when field was blurred', () => {
        const textField = renderComponent();

        textField.find('.text-field-input').simulate('blur');
        expect(onBlurMock).toHaveBeenCalled();
    });

    it('should not calls onBlur if onBlur is not a function', () => {
        const textField = renderComponent({ onBlur: null });

        textField.find('.text-field-input').simulate('blur');
    });

    it('should calls onChange callback when input value was changed', () => {
        const textField = renderComponent();
        const eventMock = {
            currentTarget: {
                value: 'test'
            }
        };

        textField.find('.text-field-input').simulate('change', eventMock);
        expect(onChangeMock).toHaveBeenCalledWith(eventMock);
    });

    it('should not calls onChange if onChange is not a function', () => {
        const textField = renderComponent({ onChange: null });
        const eventMock = {
            currentTarget: {
                value: 'test'
            }
        };

        textField.find('.text-field-input').simulate('change', eventMock);
        expect(onChangeMock).not.toHaveBeenCalled();
    });
});
