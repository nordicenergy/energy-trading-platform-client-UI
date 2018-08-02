import React from 'react';
import { shallow } from 'enzyme';
import MeterReadingsHistory from '../MeterReadingsHistory';

const MOCK_DATA = [
    {
        date: 1521911833,
        consumption: 9950.3
    },
    {
        date: 1522911833,
        consumption: 0
    },
    {
        date: 6.274010441673454,
        consumption: '1'
    },
    {
        date: '',
        consumption: null
    },
    {
        date: undefined,
        consumption: undefined
    }
];

const DEFAULT_PROPS = {
    data: [],
    title: 'title',
    consumptionUnitLabel: 'label',
    noDataMessage: 'message'
};

function renderComponent(props = {}, renderer = shallow) {
    return renderer(<MeterReadingsHistory {...DEFAULT_PROPS} {...props} />);
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

        expect(trs.at(count++).text()).toEqual('Mar 24 9,950.3 kWh');
        expect(trs.at(count++).text()).toEqual('Apr 05 0 kWh');
        expect(trs.at(count++).text()).toEqual('Jan 01 1 kWh');
        expect(trs.at(count++).text()).toEqual('- - kWh');
        expect(trs.at(count).text()).toEqual('- - kWh');
    });

    it('should render message when data is empty array', () => {
        const component = renderComponent({
            data: [],
            noDataMessage: 'Sorry, not live metering data available for you…'
        });

        expect(component.find('table')).toHaveLength(1);
        expect(component.find('caption')).toHaveLength(1);
        expect(component.find('tbody')).toHaveLength(1);
        expect(component.find('tr')).toHaveLength(0);
        expect(component.find('td')).toHaveLength(0);
        expect(
            component
                .find('p')
                .at(0)
                .text()
        ).toEqual('Sorry, not live metering data available for you…');
    });
});
