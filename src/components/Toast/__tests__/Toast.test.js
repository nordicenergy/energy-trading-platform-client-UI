import React from 'react';
import { shallow } from 'enzyme';
import Toast from '../Toast';

function renderComponent({ message = 'Test message', ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<Toast message={message} {...otherProps} />);
}

describe('<Toast /> component', () => {
    it(`should renders:
        - icon
        - message`, () => {
        const toast = renderComponent();

        expect(toast.find('.toast-icon')).toHaveLength(1);
        expect(toast.find('.toast-message')).toHaveLength(1);
        expect(toast.find('.toast-message').text()).toBe('Test message');
    });

    it('should renders with error type', () => {
        const toast = renderComponent({ type: 'error' });

        expect(toast.hasClass('toast--error')).toBeTruthy();
    });
});
