import React from 'react';
import { shallow } from 'enzyme';
import FilterCheckbox from '../FilterCheckbox';

const stubs = {
    onChangeMock: jest.fn()
};
function renderComponent(
    { type = 'default', label = 'all', onChange = stubs.onChangeMock, ...otherProps } = {},
    mountFn = shallow
) {
    return mountFn(<FilterCheckbox type={type} label={label} onChange={onChange} {...otherProps} />);
}

describe('<FilterCheckbox /> component', () => {
    beforeEach(() => {
        stubs.onChangeMock = jest.fn();
    });

    afterEach(() => {
        stubs.onChangeMock.mockClear();
    });

    it('should renders without errors', () => {
        renderComponent();
    });

    it('should renders correct icon', () => {
        const filterComponent = renderComponent();

        expect(filterComponent.html().includes('class="other-energy-icon"')).toBeTruthy();
        filterComponent.setProps({ type: 'wind' });
        expect(filterComponent.html().includes('class="wind-energy-icon"')).toBeTruthy();
        filterComponent.setProps({ type: 'solar' });
        expect(filterComponent.html().includes('class="solar-energy-icon"')).toBeTruthy();
        filterComponent.setProps({ type: 'biomass' });
        expect(filterComponent.html().includes('class="biomass-energy-icon"')).toBeTruthy();
    });

    it('should calls onChange callback', () => {
        const filterCheckbox = renderComponent();

        filterCheckbox.find('input').simulate('change');
        expect(stubs.onChangeMock).toHaveBeenCalled();
    });

    it('should calls onChange callback only on enter key press', () => {
        const filterCheckbox = renderComponent();

        filterCheckbox.find('.filter-checkbox').simulate('keyUp', { keyCode: 13 });
        expect(stubs.onChangeMock).toHaveBeenCalledTimes(1);

        filterCheckbox.find('.filter-checkbox').simulate('keyUp', { keyCode: 11 });
        expect(stubs.onChangeMock).toHaveBeenCalledTimes(1);
    });
});
