import React from 'react';
import { shallow } from 'enzyme';
import AuthScreen from '../AuthScreen';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(
        <AuthScreen {...props}>
            <div>Auth screen content</div>
        </AuthScreen>
    );
}

describe('<AuthScreen /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });
});
