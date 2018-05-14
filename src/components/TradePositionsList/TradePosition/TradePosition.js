import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TradePosition.css';

export const TradePositionPropType = PropTypes.shape({
    offerAddressUrl: PropTypes.string,
    offerAddress: PropTypes.string,
    producerUrl: PropTypes.string,
    producerName: PropTypes.string,
    offerIssued: PropTypes.string,
    validOn: PropTypes.string,
    energyOffered: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    energyAvailable: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
});

const TradePosition = ({ className, labels, tradePosition }) => {
    const classes = classNames('trade-position', className);
    const offerAddress =
        tradePosition.offerAddressUrl && tradePosition.offerAddress ? (
            <a target="_blank" href={tradePosition.offerAddressUrl}>
                {tradePosition.offerAddress}
            </a>
        ) : (
            <strong>{tradePosition.offerAddress}</strong>
        );
    const producerName =
        tradePosition.producerUrl && tradePosition.producerName ? (
            <a target="_blank" href={tradePosition.producerUrl}>
                {tradePosition.producerName}
            </a>
        ) : (
            <strong>{labels.producerNamePlaceholder}</strong>
        );

    return (
        <div className={classes}>
            <div className="trade-position-data trade-position-data--primary">
                <div className="trade-position-entry">
                    <span>{labels.offerAddress}</span>
                    {offerAddress}
                </div>
                <div className="trade-position-entry">
                    <span>{labels.producerName}</span>
                    {producerName}
                </div>
            </div>
            <div className="trade-position-data">
                <div className="trade-position-entry">
                    <span>{labels.offerIssued}</span>
                    <strong>{tradePosition.offerIssued}</strong>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.validOn}</span>
                    <strong>{tradePosition.validOn}</strong>
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
                        {tradePosition.price} <span translate="no">ct/kWh</span>
                    </strong>
                </div>
            </div>
        </div>
    );
};

TradePosition.propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({
        producerNamePlaceholder: PropTypes.string,
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
        producerNamePlaceholder: 'Unknown',
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
