import React from 'react';
import { shallow, mount } from 'enzyme';
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

const transactionsMock = [
    {
        id: '1',
        date: 'Mar 14, 2018',
        name: 'Bought 23 kWh Alice',
        amount: '0,81€'
    },
    {
        id: '2',
        date: 'Mar 14, 2018',
        name: 'Monthly invoice',
        amount: '0,81€'
    },
    {
        id: '3',
        date: 'Mar 14, 2018',
        name: 'Bought 23 kWh from Peter',
        amount: '0,81€'
    }
];

const currentBalanceMockData = {
    date: 'Mar 14, 2018',
    amount: '4,03€'
};

function renderComponent(
    {
        labels = labelsMock,
        transactions = transactionsMock,
        currentBalance = currentBalanceMockData,
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
        - <p /> element with class "recent-transactions-title";
        - <table /> element;
        - <thead /> element;
        - <tbody /> element;
        - <Button /> component;
        - card title element with class "nav-card-title";`, () => {
        const component = renderComponent({});
        expect(component.find('p.recent-transactions-title')).toHaveLength(1);
        expect(
            component.find('table.recent-transactions-table thead')
        ).toHaveLength(1);
        expect(
            component.find('table.recent-transactions-table tbody')
        ).toHaveLength(1);
        expect(component.find(Button)).toHaveLength(1);
    });

    it('should call onButtonClick handler', () => {
        const onButtonClick = jest.fn();
        const component = renderComponent({ onButtonClick }, mount);
        component.find(Button).simulate('click');
        expect(onButtonClick).toHaveBeenCalled();
    });
});
