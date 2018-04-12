import React from 'react';
import { shallow } from 'enzyme';
import OptionLinks from '../OptionLinks';

const linksMock = [
    { link: '#trade-directly-on-market', caption: 'Trade Directly On Market' },
    { link: '#lition-energy-exchange', caption: 'Lition energy exchange' }
];

function renderComponent(
    { links = linksMock, ...otherProps } = {},
    mountFn = shallow
) {
    return mountFn(<OptionLinks links={links} {...otherProps} />);
}

describe('<OptionLinks /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });
});
