import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import Button from '../Button';
import { DATE_FORMAT } from '../../constants';

import './RecentTransactions.css';

const ROWS_LIMIT = 5;

const RecentTransactions = ({ transactions, currentBalance, labels, pagination, onButtonClick }) => (
    <div role="table" className="recent-transactions-container">
        <table>
            <caption>
                {labels.recentTransactionsTitle}
                {pagination && (
                    <div className="recent-transactions-caption-content">
                        <div>{renderDate(currentBalance.date)}</div>
                        <div>
                            {labels.recentTransactionsMonthlyBalance}: {renderAmountText(currentBalance.balance)}
                        </div>
                    </div>
                )}
            </caption>
            <thead>
                <tr>
                    <th id="transactionDateHeader">{labels.recentTransactionsHeaderDate}</th>
                    <th>{labels.recentTransactionsHeaderTransaction}</th>
                    <th id="transactionAmountHeader">{labels.recentTransactionsHeaderAmount}</th>
                </tr>
            </thead>
            <tbody>{renderTableRows(transactions, !pagination)}</tbody>
        </table>

        {!pagination && (
            <div role="row" className="recent-transactions-current-balance-row">
                <span
                    role="cell"
                    aria-describedby="transactionDateHeader"
                    className="recent-transactions-current-balance-date"
                >
                    {renderDate(currentBalance.date)}
                </span>
                <span
                    role="cell"
                    aria-describedby="transactionAmountHeader"
                    className="recent-transactions-current-balance-amount"
                >
                    {labels.recentTransactionsMonthlyBalance}: {renderAmountText(currentBalance.balance)}
                </span>
            </div>
        )}
        {!pagination && (
            <div className="recent-transactions-button-container">
                <Button onClick={() => onButtonClick()}>{labels.recentTransactionsMore}</Button>
            </div>
        )}
    </div>
);

function renderTableRows(transactions, limited) {
    const rows = transactions.map((transaction, index) => (
        <tr key={`${transaction.id}-${index}`}>
            <td>{renderDate(transaction.date)}</td>
            <td translate="no">
                {transaction.description}
                <span aria-label="transaction hash (ethereum address)" className="recent-transactions-hash">
                    {transaction.transactionHash}
                </span>
            </td>
            <td>{renderAmountText(transaction.transactionAmount)}</td>
        </tr>
    ));

    if (limited) {
        rows.length = ROWS_LIMIT;
    }

    return rows;
}

function renderDate(date /* expect seconds | unix timestamp */) {
    return moment(new Date(date * 1000)).format(DATE_FORMAT);
}

function renderAmountText(amount) {
    return `${String(Number(amount || '0').toFixed(2)).replace('.', ',')} €`;
}

RecentTransactions.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.number,
            description: PropTypes.string,
            transactionAmount: PropTypes.number,
            transactionHash: PropTypes.string
        })
    ),
    currentBalance: PropTypes.shape({
        date: PropTypes.number,
        balance: PropTypes.number
    }),
    labels: PropTypes.shape({
        recentTransactionsTitle: PropTypes.string,
        recentTransactionsHeaderDate: PropTypes.string,
        recentTransactionsHeaderTransaction: PropTypes.string,
        recentTransactionsHeaderAmount: PropTypes.string,
        recentTransactionsMonthlyBalance: PropTypes.string,
        recentTransactionsMore: PropTypes.string
    }),
    onButtonClick: PropTypes.func
};

export default RecentTransactions;
