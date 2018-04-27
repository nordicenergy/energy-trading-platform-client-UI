import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment/moment';
import { DisclosureArrow, Button } from '../.';
import Spinner from '../Loader/Spinner';
import RecentTransactionDetails from './RecentTransactionDetails';
import { DATE_FORMAT } from '../../constants';

import './RecentTransactions.css';

const ROWS_LIMIT = 5;

class RecentTransactions extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            expanded: []
        };
    }

    renderTableRows() {
        const { labels, transactions, pagination: unlimited } = this.props;

        const rows = transactions.map((transaction, index) => {
            const { details } = transaction;
            const isExpand = this.state.expanded[index];
            const rowClasses = classNames({
                'recent-transactions-row--expand': isExpand
            });
            const detailsClasses = classNames({
                'recent-transactions-details-row': true,
                'recent-transactions-details-row--expand': isExpand
            });

            return (
                <React.Fragment key={`${transaction.id}-${index}`}>
                    <tr
                        className={rowClasses}
                        onClick={() => {
                            const newExpanded = [...this.state.expanded];
                            newExpanded[index] = !isExpand;
                            this.setState({ expanded: newExpanded });
                        }}
                    >
                        <td>{renderDate(transaction.date)}</td>
                        <td translate="no">{transaction.description}</td>
                        <td>{renderAmountText(transaction.transactionAmount)}</td>
                        <td>
                            <DisclosureArrow expanded={isExpand} />
                        </td>
                    </tr>
                    <tr className={detailsClasses}>
                        <td colSpan={4} translate="no">
                            <div role="region" aria-live="polite" aria-label="Transaction details">
                                <RecentTransactionDetails
                                    labels={{
                                        from: labels.recentTransactionsDetailsFrom,
                                        amount: labels.recentTransactionsDetailsAmount,
                                        price: labels.recentTransactionsDetailsPrice,
                                        hash: labels.recentTransactionsDetailsHash,
                                        url: labels.recentTransactionsDetailsUrl
                                    }}
                                    url={details.url}
                                    hash={details.hash}
                                    price={details.price}
                                    amount={details.amount}
                                    from={details.from}
                                />
                            </div>
                        </td>
                    </tr>
                </React.Fragment>
            );
        });

        if (!unlimited) {
            rows.length = ROWS_LIMIT;
        }

        return rows;
    }

    render() {
        const { currentBalance, labels, pagination, onButtonClick, loading } = this.props;

        return (
            <div role="table" className="recent-transactions-container">
                <table>
                    <caption>
                        {labels.recentTransactionsTitle}
                        {pagination && (
                            <div className="recent-transactions-caption-content">
                                <div>{renderDate(currentBalance.date)}</div>
                                <div>
                                    {labels.recentTransactionsMonthlyBalance}:{' '}
                                    {renderAmountText(currentBalance.balance)}
                                </div>
                            </div>
                        )}
                    </caption>
                    <thead>
                        <tr>
                            <th id="transactionDateHeader">{labels.recentTransactionsHeaderDate}</th>
                            <th>{labels.recentTransactionsHeaderTransaction}</th>
                            <th id="transactionAmountHeader">{labels.recentTransactionsHeaderAmount}</th>
                            <th aria-label="Actions (Expand/Collapse)">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderTableRows()}</tbody>
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
                {pagination && (
                    <div role="progressbar" aria-hidden={!loading} className="recent-transactions-loader">
                        {loading && <Spinner size="sm" color="#30acc1" />}
                    </div>
                )}
            </div>
        );
    }
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
            details: PropTypes.shape({
                from: PropTypes.string,
                amount: PropTypes.number,
                price: PropTypes.number,
                hash: PropTypes.string
            })
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
        recentTransactionsMore: PropTypes.string,
        recentTransactionsDetailsFrom: PropTypes.string,
        recentTransactionsDetailsAmount: PropTypes.string,
        recentTransactionsDetailsPrice: PropTypes.string,
        recentTransactionsDetailsHash: PropTypes.string
    }),
    onButtonClick: PropTypes.func
};

export default RecentTransactions;
