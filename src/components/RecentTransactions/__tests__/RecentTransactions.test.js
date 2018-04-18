import React from 'react';
import { mount } from 'enzyme';
import RecentTransactions from '../RecentTransactions';
import Button from '../../Button';

const labelsMock = {
    recentTransactionsTitle: 'Most Recent Transactions',
    recentTransactionsHeaderDate: 'Date',
    recentTransactionsHeaderTransaction: 'Transaction',
    recentTransactionsHeaderAmount: 'Amount',
    recentTransactionsCurrentBalance: 'Current Balance',
    recentTransactionsMore: 'More'
};

const transactionsDummy = [
    {
        id: '1',
        date: 1523707200,
        description: 'Bought 23 kWh Alice',
        transactionAmount: 0.81
    },
    {
        id: '2',
        date: 1523707200,
        description: 'Monthly invoice',
        transactionAmount: 0.081
    },
    {
        id: '3',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.081
    }
];

const currentBalanceDummy = {
    balance: 10,
    date: 1523707200
};

function renderComponent(
    {
        labels = labelsMock,
        transactions = transactionsDummy,
        currentBalance = currentBalanceDummy,
        onButtonClick = () => {}
    },
    renderer = mount
) {
    return renderer(
        <RecentTransactions
            labels={labels}
            transactions={transactions}
            currentBalance={currentBalance}
            onButtonClick={onButtonClick}
        />
    );
}

describe('<RecentTransactions /> Component', () => {
    it(`should contains following elements:
        - <caption /> element;
        - <table /> element;
        - <thead /> element;
        - <tbody /> element;
        - <Button /> component;
        - card title element with class "nav-card-title";`, () => {
        const component = renderComponent({});
        expect(component.find('caption')).toHaveLength(1);
        expect(component.find('thead')).toHaveLength(1);
        expect(component.find('tbody')).toHaveLength(1);
        expect(component.find('th')).toHaveLength(3);
        expect(component.find('td')).toHaveLength(9);
        expect(component.find(Button)).toHaveLength(1);
    });

    it('should display correct data in table', () => {
        const component = renderComponent({});
        const data = component.find('td');
        expect(data.at(0).text()).toEqual('Apr 14, 2018');
        expect(data.at(1).text()).toEqual('Bought 23 kWh Alice');
        expect(data.at(2).text()).toEqual('0,81 €');
        expect(data.at(3).text()).toEqual('Apr 14, 2018');
        expect(data.at(4).text()).toEqual('Monthly invoice');
        expect(data.at(5).text()).toEqual('0,081 €');
        expect(data.at(6).text()).toEqual('Apr 14, 2018');
        expect(data.at(7).text()).toEqual('Bought 23 kWh from Peter');
        expect(data.at(8).text()).toEqual('0,081 €');

        expect(component.find('.recent-transactions-current-balance-date').text()).toEqual('Apr 14, 2018');
        expect(component.find('.recent-transactions-current-balance-amount').text()).toEqual('Current Balance: 10 €');
    });

    it('should call onButtonClick handler', () => {
        const onButtonClick = jest.fn();
        const component = renderComponent({ onButtonClick }, mount);
        component.find(Button).simulate('click');
        expect(onButtonClick).toHaveBeenCalled();
    });
});
