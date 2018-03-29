import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../Logo';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<Logo />);
}

describe('<Logo /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });

    it('should render small logo', () => {
        const component = renderComponent({ size: 'small' });
        component.hasClass('logo-small');
    });
});
