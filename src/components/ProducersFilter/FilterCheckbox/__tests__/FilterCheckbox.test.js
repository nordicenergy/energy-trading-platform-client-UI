import React from 'react';
import { shallow } from 'enzyme';
import FilterCheckbox from '../FilterCheckbox';

const onChangeMock = jest.fn();
function renderComponent(
    { type = 'default', label = 'all', onChange = onChangeMock, ...otherProps } = {},
    mountFn = shallow
) {
    return mountFn(<FilterCheckbox type={type} label={label} onChange={onChange} {...otherProps} />);
}

describe('<FilterCheckbox /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });

    it('should renders correct icon', () => {
        const filterComponent = renderComponent();

        expect(filterComponent.html().includes('id="otherIcon"')).toBeTruthy();
        filterComponent.setProps({ type: 'wind' });
        expect(filterComponent.html().includes('id="windIcon"')).toBeTruthy();
        filterComponent.setProps({ type: 'solar' });
        expect(filterComponent.html().includes('id="solarIcon"')).toBeTruthy();
        filterComponent.setProps({ type: 'biomass' });
        expect(filterComponent.html().includes('id="biomassIcon"')).toBeTruthy();
    });

    it('should calls onChange callback', () => {
        const filterCheckbox = renderComponent();

        filterCheckbox.find('input').simulate('change');
        expect(onChangeMock).toHaveBeenCalled();
    });
});
