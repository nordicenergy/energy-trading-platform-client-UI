import React from 'react';
import { shallow } from 'enzyme';
import TradePosition from '../TradePosition';

const tradePositionDummy = {
    offerAddressUrl: 'http://offer.address.test/0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    offerAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    producerUrl: 'http://producer.test/1',
    producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss',
    offerIssued: 'May 06, 2018 3:00',
    validOn: 'May 25, 2018',
    energyOffered: 3800,
    energyAvailable: 3500,
    price: 3.5
};
function renderComponent({ tradePosition = tradePositionDummy, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<TradePosition tradePosition={tradePosition} {...otherProps} />);
}

describe('<TradePosition /> component', () => {
    it('should renders without errors', () => {
        const tradePosition = renderComponent();

        expect(tradePosition.find('.trade-position-entry a')).toHaveLength(2);
        expect(
            tradePosition
                .find('.trade-position-entry a')
                .at(0)
                .props().href
        ).toBe(tradePositionDummy.offerAddressUrl);
        expect(
            tradePosition
                .find('.trade-position-entry a')
                .at(1)
                .props().href
        ).toBe(tradePositionDummy.producerUrl);
        expect(tradePosition.find('.trade-position-entry strong')).toHaveLength(5);
    });

    it('should replace empty producer name with placeholder placeholder', () => {
        const tradePosition = renderComponent({
            tradePosition: { ...tradePositionDummy, producerUrl: '', producerName: '' }
        });

        expect(
            tradePosition
                .find('.trade-position-entry > strong')
                .at(0)
                .text()
        ).toBe('Unknown');
    });
});
