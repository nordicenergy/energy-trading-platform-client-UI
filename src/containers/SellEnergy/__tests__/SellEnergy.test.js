import React from 'react';
import { shallowWithIntl } from '../../../services/intlTestHelper';
import { SellEnergy } from '../SellEnergy';

const offersMock = [
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
function renderComponent({ offers = offersMock, ...otherProps } = {}, mountFn = shallowWithIntl) {
    return mountFn(<SellEnergy offers={offers} {...otherProps} />);
}

describe('<SellEnergy /> container', () => {
    it('should renders without errors', () => {
        const sellEnergy = renderComponent();
        expect(sellEnergy.find('OffersSlider')).toHaveLength(1);
    });

    it('should not render offers slider if offers are not given', () => {
        const sellEnergy = renderComponent({ offers: null });
        expect(sellEnergy.find('OffersSlider')).toHaveLength(0);
    });
});
