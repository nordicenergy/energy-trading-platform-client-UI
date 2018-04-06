import React from 'react';
import WattcoinTable from '../WattcoinTable';
import { Button } from '../../../components';
import { mount } from 'enzyme';

const props = {
    labels: {
        caption: 'Wattcoin',
        producer: 'Producer',
        energyType: 'Type of energy',
        total: 'Total',
        trx: 'Transaction',
        sent: 'Sent',
        received: 'Received',
        button: 'More'
    },
    data: {
        producer: 'Peter Producer',
        type: 'Solar panels',
        total: 0.03,
        count: {
            trx: 5,
            sent: 3,
            received: 6
        }
    },
    onMoreClick: jest.fn()
};

function renderComponent(props) {
    return mount(<WattcoinTable {...props} />);
}

describe('<WattcoinTable /> Component', () => {
    it(`should contains following controls:
        - <table>;
        - <caption>;
        - <Button> with text More;
        - 2 ".wattcoin-table-textual-info" elements;
        - 1 ".wattcoin-table-total-info" elements;
        - 3 ".wattcoin-table-count-info" elements;`, () => {
        const component = renderComponent(props);

        expect(component.find('table').length).toEqual(1);
        const caption = component.find('caption');
        expect(caption.length).toEqual(1);
        expect(caption.at(0).text()).toEqual('Wattcoin');
        expect(component.find('tbody').length).toEqual(1);

        const button = component.find(Button);
        expect(button.length).toEqual(1);
        expect(button.at(0).text()).toEqual('More');

        const textualCells = component.find('.wattcoin-table-textual-info');
        expect(textualCells.length).toEqual(2);
        expect(textualCells.at(0).text()).toEqual('ProducerPeter Producer');
        expect(textualCells.at(1).text()).toEqual('Type of energySolar panels');

        const countCells = component.find('.wattcoin-table-count-info');
        expect(countCells.length).toEqual(3);
        expect(countCells.at(0).text()).toEqual('Transaction5');
        expect(countCells.at(1).text()).toEqual('Sent3');
        expect(countCells.at(2).text()).toEqual('Received6');

        const totalCells = component.find('.wattcoin-table-total-info');
        expect(totalCells.length).toEqual(1);
        expect(totalCells.at(0).text()).toEqual('Total0,03More');
    });

    it('should handle on click event for button "More"', () => {
        const component = renderComponent(props);
        component
            .find(Button)
            .at(0)
            .simulate('click');
        expect(props.onMoreClick.mock.calls.length).toEqual(1);
    });
});
