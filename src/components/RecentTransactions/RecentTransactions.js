import React from 'react';
import PropTypes from 'prop-types';
import './RecentTransactions.css';
import Button from '../Button';

const RecentTransactions = ({ transactions, currentBalance, labels, onButtonClick }) => {
    function renderTableRows() {
        return transactions.map(transaction => (
            <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
            </tr>
        ));
    }

    return (
        <div className="recent-transactions-container">
            <div className="table-container">
                <table>
                    <caption>{labels.recentTransactionsTitle}</caption>
                    <thead>
                        <tr>
                            <th id="transactionDateHeader">{labels.recentTransactionsHeaderDate}</th>
                            <th>{labels.recentTransactionsHeaderTransaction}</th>
                            <th id="transactionAmountHeader">{labels.recentTransactionsHeaderAmount}</th>
                        </tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                </table>
            </div>
            <div role="row" className="recent-transactions-current-balance-row">
                <span
                    role="cell"
                    aria-describedby="transactionDateHeader"
                    className="recent-transactions-current-balance-date"
                >
                    {currentBalance.date}
                </span>
                <span
                    role="cell"
                    aria-describedby="transactionAmountHeader"
                    className="recent-transactions-current-balance-amount"
                >
                    {labels.recentTransactionsCurrentBalance}: {currentBalance.amount}
                </span>
            </div>
            <div className="recent-transactions-button-container">
                <Button onClick={() => onButtonClick()}>{labels.recentTransactionsMore}</Button>
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
