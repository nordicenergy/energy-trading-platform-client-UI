import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PLANT_TYPES } from '../../../constants';
import defaultImage from './defaultImage.png';
import './ProducerCard.css';

const ProducerCard = ({ className, producer, selected, onClick }) => {
    const classes = classNames('producer-card', selected && 'producer-card--selected', className);
    const style = { backgroundImage: `url(${producer.picture || defaultImage}` };

    return (
        <div className={classes} onClick={() => onClick && onClick(producer.id)} style={style}>
            <div className="producer-card-layout">
                <div className="producer-card-meta">
                    <strong className="producer-card-price" translate="no">
                        {producer.price} ct/kWh
                    </strong>
                    <span className="producer-card-plant-type">{producer.plantType}</span>
                </div>
                <h3 className="producer-card-name">{producer.name}</h3>
            </div>
        </div>
    );
};

export const ProducerType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string,
    plantType: PropTypes.oneOf([PLANT_TYPES.wind, PLANT_TYPES.solar, PLANT_TYPES.biomass, PLANT_TYPES.other]).isRequired
});
ProducerCard.propTypes = {
    className: PropTypes.string,
    producer: ProducerType.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};
ProducerCard.defaultProps = {
    selected: false
};

export default ProducerCard;
