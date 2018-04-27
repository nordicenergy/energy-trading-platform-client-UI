import React from 'react';
import { mount } from 'enzyme';
import RecentTransactionDetails from '../RecentTransactionDetails';

const labelsMock = {
    from: 'From',
    amount: 'Amount',
    price: 'Price per kWh',
    hash: 'Blockchain-Transaction',
    url: 'Show Details'
};

const detailsDummy = {
    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
    price: 2.5,
    amount: 7.74,
    from: '254839457345934957394593459',
    url: 'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
};

function renderComponent({ labels = labelsMock, details = detailsDummy }, renderer = mount) {
    return renderer(
        <RecentTransactionDetails
            labels={labels}
            url={details.url}
            hash={details.hash}
            price={details.price}
            amount={details.amount}
            from={details.from}
        />
    );
}

describe('<RecentTransactionDetails /> Component', () => {
    it(`should contains following elements:
        - 1 div[role="table"] element;
        - 2 div[role="rowgroup"] elements;
        - 4 div[role="row"] elements;
        - 5 div[role="cell"] elements;
        - 5 div[role="columnheader"] elements;`, () => {
        const component = renderComponent({});
        expect(component.find('.recent-transactions-details-headers')).toHaveLength(1);
        expect(component.find('.recent-transactions-details-values')).toHaveLength(1);
        expect(component.find('.recent-transactions-details-from')).toHaveLength(1);
        expect(component.find('.recent-transactions-details-hash')).toHaveLength(1);

        expect(component.find('div[role="table"]')).toHaveLength(1);
        expect(component.find('div[role="rowgroup"]')).toHaveLength(2);
        expect(component.find('div[role="row"]')).toHaveLength(4);
        expect(component.find('div[role="cell"]')).toHaveLength(5);
        expect(component.find('div[role="columnheader"]')).toHaveLength(5);

        const anchor = component.find('a');
        expect(anchor).toHaveLength(1);
        expect(anchor.props().href).toEqual(detailsDummy.url);

        const headers = component.find('div[role="columnheader"]');
        expect(
            headers
                .at(0)
                .text()
                .trim()
        ).toEqual('');
        expect(headers.at(1).text()).toEqual(labelsMock.amount);
        expect(headers.at(2).text()).toEqual(labelsMock.price);
        expect(headers.at(3).text()).toEqual(labelsMock.from);
        expect(headers.at(4).text()).toEqual(labelsMock.hash);

        const cells = component.find('div[role="cell"]');
        expect(cells.at(0).text()).toEqual(labelsMock.url);
        expect(cells.at(1).text()).toEqual(`${detailsDummy.amount} kWh`);
        expect(cells.at(2).text()).toEqual(`${detailsDummy.price} ct`);
        expect(cells.at(3).text()).toEqual(detailsDummy.from);
        expect(cells.at(4).text()).toEqual(detailsDummy.hash);
    });
});
