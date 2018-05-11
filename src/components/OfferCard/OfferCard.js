import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './OfferCard.css';

export const OfferPropType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    startPeriod: PropTypes.number,
    endPeriod: PropTypes.number,
    price: PropTypes.number,
    energyType: PropTypes.string
});

class OfferCard extends Component {
    handleClick(event) {
        event.preventDefault();

        const { onClick } = this.props;
        onClick && onClick();
    }

    renderPeriodDate(date /* expect seconds | unix timestamp */) {
        return moment(new Date(date * 1000)).format('MMM D');
    }

    render() {
        const { offer: { id, startPeriod, endPeriod, price, energyType }, labels } = this.props;

        return (
            <div className="offer-card">
                <div className="offer-card-header">
                    <div className="offer-id">{id}</div>
                    <div className="edit-button-container">
                        <a href={`#offer-${id}`} className="edit-button" onClick={event => this.handleClick(event)}>
                            {labels.editButton}
                        </a>
                    </div>
                </div>
                <div className="period-info">
                    <a href={`#offer-${id}`} onClick={event => this.handleClick(event)}>
                        {this.renderPeriodDate(startPeriod)} - {this.renderPeriodDate(endPeriod)}
                    </a>
                </div>
                <div className="offer-card-footer">
                    <div className="price-container">
                        <span className="price">{price}</span> ct/kWh
                    </div>
                    <div className="energy-type">{energyType}</div>
                </div>
            </div>
        );
    }
}

OfferCard.propTypes = {
    offer: OfferPropType.isRequired,
    onClick: PropTypes.func,
    labels: PropTypes.shape({
        editButton: PropTypes.string
    })
};
OfferCard.defaultProps = {
    labels: {
        editButton: 'Edit'
    }
};

export default OfferCard;
