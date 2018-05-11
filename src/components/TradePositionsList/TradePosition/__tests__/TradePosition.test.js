import React from 'react';
import { shallow } from 'enzyme';
import TradePosition from '../TradePosition';

const tradePositionDummy = {
    offerAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss',
    offerIssued: parseInt(Date.now() / 1000, 10),
    validOn: parseInt(Date.now() / 1000, 10),
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

        expect(tradePosition.find('.trade-position-entry')).toHaveLength(7);
    });
});
