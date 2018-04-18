import React from 'react';
import ProducerInfo, { Placeholder } from '../ProducerInfo';
import { mount } from 'enzyme';

const props = {
    labels: {
        name: 'Name',
        price: 'Price',
        marketPrice: 'market price is',
        energyType: 'Type of energy',
        annualProduction: 'Annual Production',
        purchased: 'Energy purchased',
        capacity: 'Peak Capacity',
        selectedSince: 'Selected since',
        location: 'Location',
        ethereumAddress: 'Ethereum Address'
    },
    details: {
        name: 'Peter Producer',
        price: 2.4,
        energyType: 'Wind',
        annualProduction: 3000,
        purchased: 1300,
        capacity: 8,
        selectedSince: 'Sep 12 - Feb 22',
        ethereumAddress: '0x3E7e5d1810F825a2B27C6BEC5fCB32F3eaCd192e',
        location: 'Lippendorf, Neukieritzsch'
    },
    description: `Lorem ipsum text`,
    picture: 'http://via.placeholder.com/350x150'
};

function renderComponent(props) {
    return mount(<ProducerInfo {...props} />);
}

describe('<ProducerInfo /> Component', () => {
    it(`should contains following controls:
        - 2 <section>;
        - 1 <figure>;
        - 1 <img> with correct src;
        - 8 ".producer-information-row" with correct key-values;
        - 1 ".producer-information-desc" with correct content;`, () => {
        const component = renderComponent(props);

        expect(component.find('section').length).toEqual(2);
        expect(component.find('figure').length).toEqual(1);
        expect(component.find('img').length).toEqual(1);
        expect(component.find('.producer-information-row').length).toEqual(9);

        const description = component.find('.producer-information-desc');
        expect(description.length).toEqual(1);
        expect(description.at(0).text()).toEqual(props.description);

        const img = component.find('img');
        expect(img.length).toEqual(1);
        expect(img.at(0).props().src).toEqual(props.picture);

        const rows = component.find('.producer-information-row');
        expect(rows.at(0).text()).toEqual(`${props.labels.name}${props.details.name}`);
        expect(rows.at(1).text()).toEqual(`${props.labels.price}${props.details.price} ct/KWh`);
        expect(rows.at(2).text()).toEqual(`${props.labels.energyType}${props.details.energyType}`);
        expect(rows.at(3).text()).toEqual(`${props.labels.annualProduction}${props.details.annualProduction} kWh/day`);
        expect(rows.at(4).text()).toEqual(`${props.labels.purchased}${props.details.purchased} kWh`);
        expect(rows.at(5).text()).toEqual(`${props.labels.capacity}${props.details.capacity} MW`);
        expect(rows.at(6).text()).toEqual(`${props.labels.selectedSince}${props.details.selectedSince}`);
        expect(rows.at(7).text()).toEqual(`${props.labels.ethereumAddress}${props.details.ethereumAddress}`);
        expect(rows.at(8).text()).toEqual(`${props.labels.location}${props.details.location}`);
    });

    it('should render image placeholder and hide some fields in case when data is absent', () => {
        const newProps = {
            ...props,
            details: {},
            picture: ''
        };
        const component = renderComponent(newProps);

        expect(component.find('section').length).toEqual(2);
        expect(component.find('figure').length).toEqual(1);
        expect(component.find(Placeholder).length).toEqual(1);
        expect(component.find('.producer-information-row').length).toEqual(0);
    });

    it('should render market price info if it is provided', () => {
        const newProps = {
            ...props,
            details: {
                price: 2.4,
                marketPrice: 1.2
            }
        };
        const component = renderComponent(newProps);
        const { labels, details } = newProps;

        const priceRow = component.find('.producer-information-row');
        const expPrice = `${labels.price}${details.price} ct/KWh${labels.marketPrice} ${details.marketPrice} ct/KWh`;

        expect(priceRow.length).toEqual(1);
        expect(priceRow.at(0).text()).toEqual(expPrice);
        expect(component.find('.producer-information-market-value').length).toEqual(1);
        expect(component.find('small').length).toEqual(1);
        expect(component.find('strong').length).toEqual(1);
    });
});
