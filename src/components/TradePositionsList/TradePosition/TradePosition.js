// FIXME cover by unit test, add format functions

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { DATE_FORMAT } from '../../../constants';
import './TradePosition.css';

export const TradePositionPropType = PropTypes.shape({
    offerAddress: PropTypes.string,
    producerName: PropTypes.string,
    offerIssued: PropTypes.number,
    validOn: PropTypes.number,
    energyOffered: PropTypes.number,
    energyAvailable: PropTypes.number,
    price: PropTypes.number
});

const TradePosition = ({ className, labels, tradePosition }) => {
    const classes = classNames('trade-position', className);

    return (
        <div className={classes}>
            <div className="trade-position-data trade-position-data--primary">
                <div className="trade-position-entry">
                    <span>{labels.offerAddress}</span>
                    <strong>{tradePosition.offerAddress}</strong>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.producerName}</span>
                    <strong>{tradePosition.producerName || 'unknown'}</strong>
                </div>
            </div>
            <div className="trade-position-data">
                <div className="trade-position-entry">
                    <span>{labels.offerIssued}</span>
                    <strong>{moment(new Date(tradePosition.offerIssued * 1000)).format(`${DATE_FORMAT} h:mm`)}</strong>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.validOn}</span>
                    <strong>
                        {(tradePosition.validOn &&
                            moment(new Date(tradePosition.validOn * 1000)).format(DATE_FORMAT)) ||
                            '--'}
                    </strong>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.energyOffered}</span>
                    <strong>{tradePosition.energyOffered}</strong>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.energyAvailable}</span>
                    <strong>{tradePosition.energyAvailable}</strong>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.price}</span>
                    <strong>
                        {(tradePosition.price / 1000).toFixed(2)} <span translate="no">ct/kWh</span>
                    </strong>
                </div>
            </div>
        </div>
    );
};

TradePosition.propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({
        offerAddress: PropTypes.string,
        producerName: PropTypes.string,
        offerIssued: PropTypes.string,
        validOn: PropTypes.string,
        energyOffered: PropTypes.string,
        energyAvailable: PropTypes.string,
        price: PropTypes.string
    }),
    tradePosition: TradePositionPropType.isRequired
};
TradePosition.defaultProps = {
    labels: {
        offerAddress: 'Offer Address',
        producerName: 'Producer',
        offerIssued: 'Offer Issued',
        validOn: 'Valid on',
        energyOffered: 'kWh offered',
        energyAvailable: 'kWh available',
        price: 'Price'
    },
    tradePosition: {}
};

export default TradePosition;
