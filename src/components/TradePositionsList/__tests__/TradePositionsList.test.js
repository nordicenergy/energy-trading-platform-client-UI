import React from 'react';
import { shallow } from 'enzyme';
import TradePositionsList from '../TradePositionsList';

const tradePositionsDummy = [
    {
        offerAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
        producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss',
        offerIssued: parseInt(Date.now() / 1000, 10),
        validOn: parseInt(Date.now() / 1000, 10),
        energyOffered: 3800,
        energyAvailable: 3500,
        price: 3.5
    },
    {
        offerAddress: '0x456f681646d4a755815f9cb19e1acc8565a0c2ac',
        producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss',
        offerIssued: parseInt(Date.now() / 1000, 10),
        validOn: parseInt(Date.now() / 1000, 10),
        energyOffered: 3800,
        energyAvailable: 3500,
        price: 3.5
    },
    {
        offerAddress: '0x789f681646d4a755815f9cb19e1acc8565a0c2ac',
        producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss',
        offerIssued: parseInt(Date.now() / 1000, 10),
        validOn: parseInt(Date.now() / 1000, 10),
        energyOffered: 3800,
        energyAvailable: 3500,
        price: 3.5
    }
];
const sortOptionsDummy = [
    { value: 'a', label: 'Test A' },
    { value: 'b', label: 'Test B' },
    { value: 'c', label: 'Test C' }
];
function renderComponent({ tradePositions = tradePositionsDummy, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<TradePositionsList tradePositions={tradePositions} {...otherProps} />);
}

describe('<TradePositionsList /> component', () => {
    it(`should renders:
    - h3 title;
    - toolbar form;
    - <TextField />;
    - <DateField />;
    - 3 <TradePosition />;`, () => {
        const tradePositionsList = renderComponent();

        expect(tradePositionsList.find('.trade-positions-list > h3')).toHaveLength(1);
        expect(tradePositionsList.find('.trade-positions-list > form')).toHaveLength(1);
        expect(tradePositionsList.find('TextField')).toHaveLength(1);
        expect(tradePositionsList.find('DateField')).toHaveLength(1);
        expect(tradePositionsList.find('TradePosition')).toHaveLength(3);
    });

    it('should renders with <SortToolbar />', () => {
        const tradePositionsList = renderComponent({ sortOptions: sortOptionsDummy });

        expect(tradePositionsList.find('SortToolbar')).toHaveLength(1);
    });

    it('should calls onTradeVolumeChange callback', () => {
        const onTradeVolumeChangeStub = jest.fn();
        const eventDummy = new Event('input');
        const tradePositionsList = renderComponent({ onTradeVolumeChange: onTradeVolumeChangeStub });

        tradePositionsList
            .find('TextField')
            .props()
            .onChange(eventDummy);
        expect(onTradeVolumeChangeStub).toHaveBeenCalledWith(eventDummy);
    });

    it('should calls onTradeVolumeChange callback', () => {
        const onDateFilterChangeStub = jest.fn();
        const payloadDummy = { name: undefined, value: Date.now() };
        const tradePositionsList = renderComponent({ onDateFilterChange: onDateFilterChangeStub });

        tradePositionsList
            .find('DateField')
            .props()
            .onChange(payloadDummy);
        expect(onDateFilterChangeStub).toHaveBeenCalledWith(payloadDummy);
    });

    it('should calls onTradeVolumeChange callback', () => {
        const onSortParametersChangeStub = jest.fn();
        const parametersDummy = { name: undefined, value: Date.now() };
        const tradePositionsList = renderComponent({
            sortOptions: sortOptionsDummy,
            onSortParametersChange: onSortParametersChangeStub
        });

        tradePositionsList
            .find('SortToolbar')
            .props()
            .onChange(parametersDummy);
        expect(onSortParametersChangeStub).toHaveBeenCalledWith(parametersDummy);
    });
});
