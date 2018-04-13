import React from 'react';
import { shallow, mount } from 'enzyme';
import DateField from '../DateField';

const onFocusMock = jest.fn();
const onBlurMock = jest.fn();
const onChangeMock = jest.fn();
function renderComponent(
    { label = 'Test', onFocus = onFocusMock, onBlur = onBlurMock, onChange = onChangeMock, ...otherProps } = {},
    mountFn = mount
) {
    return mountFn(<DateField {...otherProps} label={label} onFocus={onFocus} onBlur={onBlur} />);
}

describe('<DateField /> component', () => {
    beforeEach(() => {
        onFocusMock.mockClear();
        onBlurMock.mockClear();
        onChangeMock.mockClear();
    });

    it(`should renders:
        - label
        - input`, () => {
        const dateField = renderComponent();

        expect(dateField.find('.date-picker-field-label')).toHaveLength(1);
        expect(dateField.find('.date-picker-field-label').text()).toBe('Test');
        expect(dateField.find('.date-picker-field input')).toHaveLength(1);
    });

    it('should renders with helper text', () => {
        const helperTextMock = 'Test helper text';
        const dateField = renderComponent({ helperText: helperTextMock });

        expect(dateField.find('.date-picker-field-helper-text')).toHaveLength(1);
        expect(dateField.find('.date-picker-field-helper-text').text()).toBe(helperTextMock);
    });

    it('should renders with error', () => {
        const errorMock = 'Test error';
        const dateField = renderComponent({ error: errorMock }, shallow);

        expect(dateField.hasClass('date-picker-field--error')).toBeTruthy();
        expect(dateField.find('.date-picker-field-error')).toHaveLength(1);
        expect(dateField.find('.date-picker-field-error').text()).toBe(errorMock);
    });

    it('should calls onFocus callback when field was focused', () => {
        const dateField = renderComponent();

        dateField.find('.date-picker-field input').simulate('focus');
        expect(onFocusMock).toHaveBeenCalled();
    });

    it('should calls onBlur callback when field was blurred', () => {
        const dateField = renderComponent();

        dateField.find('.date-picker-field input').simulate('blur');
        expect(onBlurMock).toHaveBeenCalled();
    });
});
