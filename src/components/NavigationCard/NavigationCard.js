import React from 'react';
import PropTypes from 'prop-types';
import './NavigationCard.css';
import buyEnergyIcon from './buy-energy-icon.svg';
import myProducerIcon from './my-producer-icon.svg';
import sellEnergyIcon from './sell-energy-icon.svg';

const ICONS_TYPES = {
    buyEnergy: buyEnergyIcon,
    myProducer: myProducerIcon,
    sellEnergy: sellEnergyIcon
};

const NavigationCard = ({ title, type, onCardClickHandler }) => {
    const imgSrc = ICONS_TYPES[type];
    return (
        <div
            className="nav-card-container"
            onClick={() => onCardClickHandler()}
        >
            <div className="nav-card">
                <div className="nav-card-image-container">
                    <img src={imgSrc} alt="Card" />
                </div>
                <div className="nav-card-title-container">
                    <p className="nav-card-title">{title}</p>
                </div>
            </div>
        </div>
    );
};

NavigationCard.propTypes = {
    title: PropTypes.string,
    type: PropTypes.oneOf(['buyEnergy', 'myProducer', 'sellEnergy']),
    onCardClickHandler: PropTypes.func.isRequired
};

export default NavigationCard;
