import React from 'react';
import PropTypes from 'prop-types';

import './RecentTransactionDetails.css';

const RecentTransactionDetails = ({ labels, hash, price, amount, from, url }) => (
    <div role="table" className="recent-transactions-details">
        <div role="rowgroup">
            <div className="recent-transactions-details-headers" role="row">
                <div role="columnheader" aria-label="Contract details link">
                    &nbsp;
                </div>
                <div role="columnheader">{labels.amount}</div>
                <div role="columnheader">{labels.price}</div>
            </div>
        </div>
        <div role="rowgroup">
            <div className="recent-transactions-details-values" role="row">
                <div role="cell">
                    <a target="_blank" href={url}>
                        {labels.url}
                    </a>
                </div>
                <div role="cell">{`${amount} kWh`}</div>
                <div role="cell">{`${price} ct`}</div>
            </div>
            <div className="recent-transactions-details-from" role="row">
                <div role="columnheader">{labels.from}</div>
                <div role="cell">{from}</div>
            </div>
            <div className="recent-transactions-details-hash" role="row">
                <div role="columnheader">{labels.hash}</div>
                <div role="cell">{hash}</div>
            </div>
        </div>
    </div>
);

RecentTransactionDetails.propTypes = {
    labels: PropTypes.shape({
        from: PropTypes.string,
        amount: PropTypes.string,
        price: PropTypes.string,
        hash: PropTypes.string,
        url: PropTypes.string
    }),
    from: PropTypes.string,
    amount: PropTypes.number,
    price: PropTypes.number,
    hash: PropTypes.string,
    url: PropTypes.string
};

export default RecentTransactionDetails;
