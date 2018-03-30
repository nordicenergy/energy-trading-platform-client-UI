import React from 'react';
import PropTypes from 'prop-types';
import './NavigationCard.css';
import MyProducerIcon from './MyProducerIcon';
import BuyEnergyIcon from './BuyEnergyIcon';
import SellEnergyIcon from './SellEnergyIcon';

const ICONS_TYPES = {
    buyEnergy: BuyEnergyIcon,
    myProducer: MyProducerIcon,
    sellEnergy: SellEnergyIcon
};

const NavigationCard = ({ title, type, onCardClickHandler }) => {
    const Icon = ICONS_TYPES[type];
    return (
        <div
            className="nav-card-container"
            onClick={() => onCardClickHandler()}
        >
            <div className="nav-card">
                <div className="nav-card-image-container">
                    <Icon />
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
