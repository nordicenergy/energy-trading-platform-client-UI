import React from 'react';
import { shallow } from 'enzyme';
import MeterReadingsHistory from '../MeterReadingsHistory';
import { formatFloat } from '../../../services/formatter';

const MOCK_DATA = {
    count: 4,
    data: [
        {
            id: '17007',
            date: '2018-09-30',
            value: '123456.0000'
        },
        {
            id: '17008',
            date: '2018-09-30',
            value: '123456.0000'
        }
    ]
};

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
            data: MOCK_DATA.data
        });

        expect(component.find('table')).toHaveLength(1);
        expect(component.find('caption')).toHaveLength(1);
        expect(component.find('tbody')).toHaveLength(1);
        expect(component.find('tr')).toHaveLength(2);
        expect(component.find('td')).toHaveLength(4);
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
            data: MOCK_DATA.data
        });

        const trs = component.find('tr');
        let count = 0;

        expect(trs.at(count++).text()).toEqual(`2018-09-30 ${formatFloat(123456.0)} kWh`);
        expect(trs.at(count++).text()).toEqual(`2018-09-30 ${formatFloat(123456.0)} kWh`);
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
