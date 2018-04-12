import React from 'react';
import { shallowWithIntl } from '../../../services/intlTestHelper';
import { BuyEnergy } from '../BuyEnergy';

const producersMock = [
    { id: 0, price: 2.9, plantType: 'solar', name: 'John Doe' },
    { id: 1, price: 2, plantType: 'wind', name: 'Peter Producer' },
    { id: 2, price: 1, plantType: 'biomass', name: 'Jeremy' },
    { id: 3, price: 5, plantType: 'wind', name: 'Blark' },
    { id: 4, price: 1, plantType: 'solar', name: 'Alice' }
];
const selectedProducerMock = producersMock[1];
const historyMock = {
    push: jest.fn()
};
const routerMock = {
    history: historyMock
};

function renderComponent(
    {
        producers = producersMock,
        selectedProducer = selectedProducerMock,
        ...otherProps
    } = {},
    mountFn = shallowWithIntl
) {
    return mountFn(
        <BuyEnergy
            producers={producers}
            selectedProducer={selectedProducer}
            {...otherProps}
        />,
        {
            context: { router: routerMock }
        }
    );
}

describe.skip('<BuyEnergy /> container', () => {
    it('should renders without errors', () => {
        renderComponent();
    });

    it('should opens producer page', () => {
        const buyEnergy = renderComponent();

        buyEnergy
            .find('ProducerCardsPanel')
            .props()
            .onProducerClick(1);
        expect(historyMock.push).toHaveBeenCalledWith('/trading/buy_energy/1');
    });

    it('should update state when filter option was clicked', () => {
        const buyEnergy = renderComponent();

        buyEnergy.setState({ filter: ['wind', 'solar'] });
        buyEnergy
            .find('FilterCheckbox[name="reset"]')
            .props()
            .onChange({
                currentTarget: { name: 'all' }
            });
        expect(buyEnergy.state().filter).toEqual([]);

        buyEnergy
            .find('FilterCheckbox[name="wind"]')
            .props()
            .onChange({
                currentTarget: { name: 'wind' }
            });
        expect(buyEnergy.state().filter).toEqual(['wind']);

        buyEnergy.setState({ filter: ['wind', 'solar'] });
        buyEnergy
            .find('FilterCheckbox[name="solar"]')
            .props()
            .onChange({
                currentTarget: { name: 'solar' }
            });
        expect(buyEnergy.state().filter).toEqual(['wind']);

        buyEnergy
            .find('FilterCheckbox[name="wind"]')
            .props()
            .onChange({
                currentTarget: { name: 'wind' }
            });
        expect(buyEnergy.state().filter).toEqual([]);
    });
});
