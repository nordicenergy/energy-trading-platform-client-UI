import React from 'react';
import OfferCard from '../OfferCard';
import { mount } from 'enzyme';

function renderComponent({
    id = '01',
    startPeriod = 1502236800,
    endPeriod = 1505001600,
    price = 2.9,
    energyType = 'wind',
    onClick = () => {},
    labels = {
        editButton: 'Edit'
    }
    },
    mountFn = mount) {
    return mountFn(<OfferCard
        id={id}
        startPeriod={startPeriod}
        endPeriod={endPeriod}
        price={price}
        energyType={energyType}
        onClick={onClick}
        labels={labels}
    />);
}

describe('<OfferCard /> component', () => {
    it(`it should display:
        - 1 <div /> element with class "offer-id";
        - 1 <button /> element with class "edit-button";
        - 1 <div /> element with class "period-info";
        - 1 <div /> element with class "price-container";
        - 1 <div /> element with class "energy-type";`, () => {
        const component = renderComponent({});
        expect(component.find('.offer-id')).toHaveLength(1);
        expect(component.find('button.edit-button')).toHaveLength(1);
        expect(component.find('.period-info')).toHaveLength(1);
        expect(component.find('.price-container')).toHaveLength(1);
        expect(component.find('.energy-type')).toHaveLength(1);
    });

    it('should display offer info', () => {
        const component = renderComponent({});
        expect(component.find('.offer-id').text()).toBe('01');
        expect(component.find('.edit-button').text()).toBe('Edit');
        expect(component.find('.period-info').text()).toBe('Aug 9 - Sep 10');
        expect(component.find('.price-container .price').text()).toBe('2.9');
        expect(component.find('.energy-type').text()).toBe('wind');

    });

    it('should call onClick handler', () => {
        const onClickMock = jest.fn();
        const component = renderComponent({
            onClick: onClickMock
        });
        component.find('.edit-button').simulate('click');
        expect(onClickMock).toHaveBeenCalledTimes(1);
        component.find('.period-info span').simulate('click');
        expect(onClickMock).toHaveBeenCalledTimes(2);
    })
});
