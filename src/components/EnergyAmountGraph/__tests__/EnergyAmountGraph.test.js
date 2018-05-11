import React from 'react';
import Plot from 'react-plotly.js';
import EnergyAmountGraph from '../EnergyAmountGraph';
import { mount } from 'enzyme';

const props = {
    data: {
        dates: [
            '2013-07-30',
            '2013-08-01',
            '2013-08-07',
            '2013-08-09',
            '2013-08-10',
            '2013-08-13',
            '2013-08-19',
            '2013-08-24',
            '2013-08-28',
            '2013-09-01',
            '2013-09-10',
            '2013-09-21',
            '2013-10-12',
            '2013-10-13'
        ],
        amounts: [2000, 2200, 1300, 1600, 1800, 2100, 2000, 2050, 1500, 2050, 2050, 1500, 2300, 2900]
    },
    title: 'Test Title',
    subtitle: 'Test Subtitle'
};

function renderComponent(props) {
    return mount(<EnergyAmountGraph {...props} />);
}

describe('<EnergyAmountGraph /> Component', () => {
    it(`should contains following controls:
        - <figure> with class 'energy-amount-graph';
        - <figcaption> with headers <h1> and <h2>;
        - <Plot> with correct options;`, () => {
        const component = renderComponent(props);

        expect(component.find('figure.energy-amount-graph').length).toEqual(1);
        expect(component.find('figcaption').length).toEqual(1);
        expect(component.find('figcaption h1').length).toEqual(1);
        expect(
            component
                .find('figcaption h1')
                .at(0)
                .text()
        ).toEqual('Test Title');
        expect(component.find('figcaption h2').length).toEqual(1);
        expect(
            component
                .find('figcaption h2')
                .at(0)
                .text()
        ).toEqual('Test Subtitle');
        expect(component.find(Plot).length).toEqual(1);
    });
});
