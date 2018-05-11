import React from 'react';
import { shallow } from 'enzyme';
import ProducersFilter from '../ProducersFilter';

const labelsMock = {
    helpMessage: 'Filter by',
    defaultOption: 'All'
};
const optionsMock = [
    {
        name: 'wind',
        label: 'Wind',
        type: 'wind'
    },
    {
        name: 'solar',
        label: 'Solar',
        type: 'solar'
    },
    {
        name: 'biomass',
        label: 'Biomass',
        type: 'biomass'
    }
];
function renderComponent({ labels = labelsMock, options = optionsMock, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<ProducersFilter labels={labelsMock} options={options} {...otherProps} />);
}

describe('<ProducersFilter /> component', () => {
    it('should renders without errors', () => {
        const producersFilter = renderComponent();
        expect(producersFilter.find('FilterCheckbox')).toHaveLength(4);
    });

    it('should opens options list', () => {
        const producersFilter = renderComponent();

        producersFilter.find('.producers-filter-open-button').simulate('click');
        producersFilter.update();
        expect(
            producersFilter.find('.producers-filter-backdrop').hasClass('producers-filter-backdrop--visible')
        ).toBeTruthy();
        producersFilter.find('.producers-filter-close-button').simulate('click');
        producersFilter.update();
        expect(
            producersFilter.find('.producers-filter-backdrop').hasClass('producers-filter-backdrop--visible')
        ).toBeFalsy();
    });

    it('should update state when filter checkbox was clicked', () => {
        const producersFilter = renderComponent();

        producersFilter.setState({ value: ['wind', 'solar'] });
        producersFilter
            .find('FilterCheckbox[name="reset"]')
            .props()
            .onChange({
                target: { name: 'all' }
            });
        expect(producersFilter.state().value).toEqual([]);

        producersFilter
            .find('FilterCheckbox[name="wind"]')
            .props()
            .onChange({
                target: { name: 'wind' }
            });
        expect(producersFilter.state().value).toEqual(['wind']);

        producersFilter.setState({ value: ['wind', 'solar'] });
        producersFilter
            .find('FilterCheckbox[name="solar"]')
            .props()
            .onChange({
                target: { name: 'solar' }
            });
        expect(producersFilter.state().value).toEqual(['wind']);

        producersFilter
            .find('FilterCheckbox[name="wind"]')
            .props()
            .onChange({
                target: { name: 'wind' }
            });
        expect(producersFilter.state().value).toEqual([]);
    });

    it('should calls onChange callback when value was changed', () => {
        const onChangeMock = jest.fn();
        const producersFilter = renderComponent({ defaultValue: null, value: [], onChange: onChangeMock });

        producersFilter
            .find('FilterCheckbox[name="wind"]')
            .props()
            .onChange({
                target: { name: 'wind' }
            });
        expect(onChangeMock).toHaveBeenCalledWith(['wind']);

        onChangeMock.mockClear();
        producersFilter
            .find('FilterCheckbox[name="reset"]')
            .props()
            .onChange({
                target: { name: 'all' }
            });
        expect(onChangeMock).toHaveBeenCalledWith([]);
    });
});
