import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { DATE_FORMAT } from '../../../constants';
import './TradePosition.css';

export const TradePositionPropType = PropTypes.shape({
    offerAddressUrl: PropTypes.string,
    offerAddress: PropTypes.string,
    producerUrl: PropTypes.string,
    producerName: PropTypes.string,
    offerIssued: PropTypes.number,
    validOn: PropTypes.number,
    energyOffered: PropTypes.number,
    energyAvailable: PropTypes.number,
    price: PropTypes.number
});
const DEFAULT_PLACEHOLDER = '--';

const TradePosition = ({ className, labels, tradePosition }) => {
    const classes = classNames('trade-position', className);
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
                    <a target="_blank" href={tradePosition.offerAddressUrl}>
                        {tradePosition.offerAddress}
                    </a>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.producerName}</span>
                    {producerName}
                </div>
            </div>
            <div className="trade-position-data">
                <div className="trade-position-entry">
                    <span>{labels.offerIssued}</span>
                    <strong>{formatOfferIssued(tradePosition.offerIssued)}</strong>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.validOn}</span>
                    <strong>{formatValidOn(tradePosition.validOn)}</strong>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.energyOffered}</span>
                    <strong>{tradePosition.energyOffered || DEFAULT_PLACEHOLDER}</strong>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.energyAvailable}</span>
                    <strong>{tradePosition.energyAvailable}</strong>
                </div>
                <div className="trade-position-entry">
                    <span>{labels.price}</span>
                    <strong>
                        {formatPrice(tradePosition.price)} <span translate="no">ct/kWh</span>
                    </strong>
                </div>
            </div>
        </div>
    );
};

function formatOfferIssued(offerIssued) {
    if (!offerIssued) {
        return DEFAULT_PLACEHOLDER;
    }

    return moment(new Date(offerIssued * 1000)).format(`${DATE_FORMAT} h:mm`);
}

function formatValidOn(validOn) {
    if (!validOn) {
        return DEFAULT_PLACEHOLDER;
    }

    return moment(new Date(validOn * 1000)).format(DATE_FORMAT);
}

function formatPrice(price) {
    const numberFormat = new Intl.NumberFormat([], { minimumFractionDigits: 2 });
    return numberFormat.format(price);
}

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
