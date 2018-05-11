import React from 'react';
import { shallowWithIntl } from '../../../services/intlTestHelper';
import { SellEnergy } from '../SellEnergy';

const offersDummy = [
    {
        id: '01',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'wind',
        price: 2.9
    },
    {
        id: '02',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'biomass',
        price: 3.2
    },
    {
        id: '03',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'solar',
        price: 4
    },
    {
        id: '04',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'wind',
        price: 2.9
    },
    {
        id: '05',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'biomass',
        price: 3.2
    },
    {
        id: '06',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'solar',
        price: 4
    }
];
const routerStub = {
    history: {
        push: jest.fn()
    }
};
function renderComponent({ offers = offersDummy, ...otherProps } = {}, mountFn = shallowWithIntl) {
    return mountFn(<SellEnergy offers={offers} {...otherProps} />, {
        context: { router: routerStub }
    });
}

describe('<SellEnergy /> container', () => {
    afterEach(() => {
        routerStub.history.push.mockClear();
    });

    it('should renders without errors', () => {
        const sellEnergy = renderComponent();
        expect(sellEnergy.find('OffersSlider')).toHaveLength(1);
    });

    it('should not render offers slider if offers are not given', () => {
        const sellEnergy = renderComponent({ offers: null });
        expect(sellEnergy.find('OffersSlider')).toHaveLength(0);
    });

    it('should go to the trading page when back link was clicked', () => {
        const sellEnergy = renderComponent();
        sellEnergy.find('BackLink').simulate('click', { preventDefault: jest.fn() });
        expect(routerStub.history.push).toHaveBeenCalledWith('/');
    });
});
