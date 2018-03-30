import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<Button {...props}>Test</Button>);
}

describe('<Button /> Component', () => {
    it('should renders without errors', () => {
        const component = renderComponent();

        expect(component.hasClass('button')).toBeTruthy();
        expect(component.hasClass('button-primary')).toBeTruthy();
    });

    it('should renders with success styles', () => {
        const component = renderComponent({ type: 'success' });

        expect(component.hasClass('button')).toBeTruthy();
        expect(component.hasClass('button-success')).toBeTruthy();
    });
});
