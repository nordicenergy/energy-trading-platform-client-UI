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
        submit_meter: 'faCalculator',
        trading: 'faChartBar',
        profile: 'faUser'
    },
    onClick = () => {}
}) {
    return mount(<Breadcrumbs items={items} iconsTypes={iconsTypes} onClick={onClick} />);
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
        const onClick = jest.fn();
        const component = renderComponent({
            onClick
        });

        component
            .find('a')
            .at(1)
            .simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith('trading/wattcoin');
        component
            .find('a')
            .at(0)
            .simulate('click');
        expect(onClick).toHaveBeenCalledTimes(2);
        expect(onClick).toHaveBeenCalledWith('trading');
    });

    it('should call onClick event handler only on enter key press', () => {
        const onClick = jest.fn();
        const component = renderComponent({
            onClick
        });

        component
            .find('a')
            .at(1)
            .simulate('keyUp', { keyCode: 13 });
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith('trading/wattcoin');
        component
            .find('a')
            .at(1)
            .simulate('keyUp', { keyCode: 11 });
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
