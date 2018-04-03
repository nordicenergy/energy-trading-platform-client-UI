import React from 'react';
import Breadcrumbs from '../Breadcrumbs';
import Logo from '../../Logo';
import { mount } from 'enzyme';

function renderComponent({
    items = [
        {
            id: 'trading',
            label: 'Trading',
            path: 'trading'
        },
        {
            id: 'wattcoin',
            label: 'Wattcoin',
            path: 'trading/wattcoin'
        }
    ],
    iconsTypes = {
        '': 'faHome',
        documents: 'faBook',
        submit_metric: 'faCalculator',
        trading: 'faChartBar',
        profile: 'faUser'
    },
    navigateTo = () => {}
}) {
    return mount(
        <Breadcrumbs
            items={items}
            iconsTypes={iconsTypes}
            navigateTo={navigateTo}
        />
    );
}

describe('<Breadcrumbs /> Component', () => {
    it(`should contains following controls:
        - 2 <a> elements;
        - 2 <div> elements with class "breadcrumb-item";
        - <div> elements with class "breadcrumb-arrow"`, () => {
        const component = renderComponent({});

        expect(component.find('a').length).toBe(2);
        expect(component.find('div.breadcrumb-item').length).toBe(2);
        expect(component.find('div.breadcrumb-arrow').length).toBe(1);
    });

    it('should call onClick event handler', () => {
        const navigateTo = jest.fn();
        const component = renderComponent({
            navigateTo
        });

        component
            .find('a')
            .at(1)
            .simulate('click');
        expect(navigateTo).toHaveBeenCalledTimes(1);
        expect(navigateTo).toHaveBeenCalledWith('trading/wattcoin');
        component
            .find('a')
            .at(0)
            .simulate('click');
        expect(navigateTo).toHaveBeenCalledTimes(2);
        expect(navigateTo).toHaveBeenCalledWith('trading');
    });
});
