import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../Spinner';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<Spinner {...props} />);
}

describe('<Spinner /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });
});
