import React from 'react';
import NavigationCard from '../NavigationCard';
import { mount } from 'enzyme';

function renderComponent(props) {
    return mount(<NavigationCard {...props} />);
}

describe('<MenuItem /> Component', () => {
    it(`should contains following controls:
        - <img /> element;
        - card title element with class "nav-card-title";`, () => {
        const props = {
            title: 'My Producer',
            type: 'myProducer',
            onCardClickHandler: () => {}
        };
        const component = renderComponent(props);

        expect(component.find('img')).toHaveLength(1);
        expect(component.find('p.nav-card-title')).toHaveLength(1);
        expect(component.find('p.nav-card-title').text()).toEqual(
            'My Producer'
        );
        expect(
            component.find('img').filterWhere(item => {
                return item.prop('src').includes('my-producer-icon.svg');
            })
        ).toHaveLength(1);
    });

    it(`should call onCardClickHandler`, () => {
        const onCardClickHandler = jest.fn();
        const props = {
            title: 'My Producer',
            type: 'myProducer',
            onCardClickHandler
        };
        const component = renderComponent(props);

        component.find('.nav-card-container').simulate('click');
        expect(onCardClickHandler).toHaveBeenCalled();
    });
});
