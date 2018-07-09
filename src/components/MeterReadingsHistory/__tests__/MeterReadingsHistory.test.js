import React from 'react';
import { shallow } from 'enzyme';
import MeterReadingsHistory from '../MeterReadingsHistory';

const MOCK_DATA = [
    {
        date: 1521911833,
        value: 9950.3
    },
    {
        date: 1522911833,
        value: 0
    },
    {
        date: 1522911833,
        value: '1'
    },
    {
        date: '',
        value: null
    },
    {
        date: undefined,
        value: undefined
    }
];

function renderComponent(
    { data = [], title = '', consumptionUnitLabel = '' } = {},
    renderer = shallow
) {
    return renderer(
        <MeterReadingsHistory data={data} title={title} consumptionUnitLabel={consumptionUnitLabel} />
    );
}

describe('<MeterReadingsHistory /> Component', () => {
    it(`should contains following elements: 
        - <table /> element;
        - <caption /> element;
        - <tbody /> element;
        - <tr /> elements;
        - <td /> elements;
    `, () => {
        const component = renderComponent({
            data: MOCK_DATA
        });

        expect(component.find('table')).toHaveLength(1);
        expect(component.find('caption')).toHaveLength(1);
        expect(component.find('table')).toHaveLength(1);
        expect(component.find('tbody')).toHaveLength(1);
        expect(component.find('tr')).toHaveLength(5);
        expect(component.find('td')).toHaveLength(10);
    });

    it('should render caption with specific title', () => {
        const component = renderComponent({
            title: 'History'
        });

        expect(component.find('caption').text()).toEqual('History');
    });

    it('should render td with specific data', () => {
        const component = renderComponent({
            consumptionUnitLabel: 'kWh',
            data: MOCK_DATA
        });

        const trs = component.find('tr');
        let count = 0;

        expect(trs.at(count++).text()).toEqual('Mar 24 9950.3 kWh');
        expect(trs.at(count++).text()).toEqual('Apr 05 0 kWh');
        expect(trs.at(count++).text()).toEqual('Apr 05 - kWh');
        expect(trs.at(count++).text()).toEqual('- - kWh');
        expect(trs.at(count).text()).toEqual('- - kWh');
    });
});
