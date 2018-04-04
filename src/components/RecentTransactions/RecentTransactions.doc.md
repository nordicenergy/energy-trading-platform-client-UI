RecentTransactions example:

```
const transactions = [
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
    },
];

const currentBalanceData = {
    date: 'Mar 14, 2018',
    amount: '4,03€'
};

const labels = {
    recentTransactionsTitle: 'Most Recent Transactions',
    recentTransactionsHeaderDate: 'Date',
    recentTransactionsHeaderTransaction: 'Transaction',
    recentTransactionsHeaderAmount: 'Amount',
    recentTransactionsCurrentBalance: 'Current Balance',
    recentTransactionsMore: 'More'
}

const wrapperStyles = {
    backgroundColor: '#F0F4F7',
    padding: '20px'
};
<div style={wrapperStyles}>
    <RecentTransactions transactions={transactions} currentBalance={currentBalanceData} labels={labels} onButtonClick={f => f} />
</div> 
```
