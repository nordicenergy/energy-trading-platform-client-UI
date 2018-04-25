RecentTransactions example (without pagination):

```
const transactions = [
    {
        id: '1',
        date: 1523707200,
        description: 'Bought 23 kWh Alice',
        transactionAmount: 0.81,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '2',
        date: 1523707200,
        description: 'Monthly invoice',
        transactionAmount: 0.081,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '3',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.8,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '4',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.8,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '5',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.8,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '6',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.8,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '7',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.8,
        transactionHash: '1234g45645g54646464564564565464646'
    }
];

const currentBalanceData = {
    balance: 10,
    date: 1523707200
};

const labels = {
    recentTransactionsTitle: 'Most Recent Transactions',
    recentTransactionsHeaderDate: 'Date',
    recentTransactionsHeaderTransaction: 'Transaction',
    recentTransactionsHeaderAmount: 'Amount',
    recentTransactionsMonthlyBalance: 'Monthly Balance',
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

RecentTransactions example (extended, with pagination):
```
const transactions = [
    {
        id: '1',
        date: 1523707200,
        description: 'Bought 23 kWh Alice',
        transactionAmount: 0.81,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '2',
        date: 1523707200,
        description: 'Monthly invoice',
        transactionAmount: 0.081,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '3',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.8,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '4',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.8,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '5',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.8,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '6',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.8,
        transactionHash: '1234g45645g54646464564564565464646'
    },
    {
        id: '7',
        date: 1523707200,
        description: 'Bought 23 kWh from Peter',
        transactionAmount: 0.8,
        transactionHash: '1234g45645g54646464564564565464646'
    }
];

const currentBalanceData = {
    balance: 10,
    date: 1523707200
};

const labels = {
    recentTransactionsTitle: 'Most Recent Transactions',
    recentTransactionsHeaderDate: 'Date',
    recentTransactionsHeaderTransaction: 'Transaction',
    recentTransactionsHeaderAmount: 'Amount',
    recentTransactionsMonthlyBalance: 'Monthly Balance',
    recentTransactionsMore: 'More'
}

const wrapperStyles = {
    backgroundColor: '#F0F4F7',
    padding: '20px'
};
<div style={wrapperStyles}>
    <RecentTransactions pagination loading transactions={transactions} currentBalance={currentBalanceData} labels={labels} onButtonClick={f => f} />
</div> 
```
