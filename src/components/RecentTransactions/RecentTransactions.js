import React from 'react';
import PropTypes from 'prop-types';
import './RecentTransactions.css';
import Button from '../Button';

const RecentTransactions = ({
    transactions,
    currentBalance,
    labels,
    onButtonClick
}) => {
    function renderTableRows() {
        return transactions.map(transaction => (
            <tr key={transaction.id}>
                <td className="date-column">{transaction.date}</td>
                <td className="transaction-column">{transaction.name}</td>
                <td className="amount-column">{transaction.amount}</td>
            </tr>
        ));
    }

    return (
        <div className="recent-transactions-container">
            <div className="recent-transactions-table-container">
                <table className="recent-transactions-table">
                    <caption className="recent-transactions-title">
                        {labels.recentTransactionsTitle}
                    </caption>
                    <thead>
                        <tr className="table-header">
                            <th className="date-column-header">
                                {labels.recentTransactionsHeaderDate}
                            </th>
                            <th className="transaction-column-header">
                                {labels.recentTransactionsHeaderTransaction}
                            </th>
                            <th className="amount-column-header">
                                {labels.recentTransactionsHeaderAmount}
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                </table>
            </div>
            <div className="recent-transactions-current-balance-row">
                <p className="recent-transactions-current-balance-date">
                    {currentBalance.date}
                </p>
                <p className="recent-transactions-current-balance-amount">
                    {labels.recentTransactionsCurrentBalance}:{' '}
                    {currentBalance.amount}
                </p>
            </div>
            <div className="recent-transactions-button-container">
                <Button onClick={() => onButtonClick()}>
                    {labels.recentTransactionsMore}
                </Button>
            </div>
        </div>
    );
};

RecentTransactions.propTypes = {
    transactions: PropTypes.array,
    currentBalance: PropTypes.shape({
        date: PropTypes.string,
        amount: PropTypes.string
    }),
    labels: PropTypes.shape({
        recentTransactionsTitle: PropTypes.string,
        recentTransactionsHeaderDate: PropTypes.string,
        recentTransactionsHeaderTransaction: PropTypes.string,
        recentTransactionsHeaderAmount: PropTypes.string,
        recentTransactionsCurrentBalance: PropTypes.string,
        recentTransactionsMore: PropTypes.string
    }),
    onButtonClick: PropTypes.func
};

export default RecentTransactions;
