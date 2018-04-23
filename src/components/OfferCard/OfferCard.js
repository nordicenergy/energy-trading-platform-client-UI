import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment/moment";
import './OfferCard.css';

const OfferCard = ({ id, startPeriod, endPeriod, price, energyType, onClick, labels }) => (
    <div className="offer-card">
        <div className="offer-card-header">
            <div className="offer-id">{id}</div>
            <div className="edit-button-container">
                <button className="edit-button" onClick={onClick}>{labels.editButton}</button>
            </div>
        </div>
        <div className="period-info">
            <span onClick={onClick}>{renderPeriodDate(startPeriod)} - {renderPeriodDate(endPeriod)}</span>
        </div>
        <div className="offer-card-footer">
            <div className="price-container"><span className="price">{price}</span> ct/kWh</div>
            <div className="energy-type">{energyType}</div>
        </div>
    </div>
);

function renderPeriodDate(date /* expect seconds | unix timestamp */) {
    return moment(new Date(date * 1000)).format('MMM D');
}

OfferCard.propTypes = {
    id: PropTypes.string,
    startPeriod: PropTypes.number,
    endPeriod: PropTypes.number,
    price: PropTypes.number,
    energyType: PropTypes.string,
    onClick: PropTypes.func,
    labels: PropTypes.shape({
        editButton: PropTypes.string
    })
};

export default OfferCard;
