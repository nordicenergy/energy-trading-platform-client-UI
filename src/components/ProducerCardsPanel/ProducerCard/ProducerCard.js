import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PLANT_TYPES } from '../../../constants';
import { WindImage, SolarImage, BiomassImage } from './images';
import './ProducerCard.css';

class ProducerCard extends Component {
    handleClick(producerId) {
        const { onClick } = this.props;

        if (typeof onClick === 'function') {
            onClick(producerId);
        }
    }

    createImage(plantType) {
        if (plantType === PLANT_TYPES.wind) {
            return <WindImage />;
        }

        if (plantType === PLANT_TYPES.solar) {
            return <SolarImage />;
        }

        if (plantType === PLANT_TYPES.biomass) {
            return <BiomassImage />;
        }

        return null;
    }

    render() {
        const { className, producer, selected } = this.props;
        const classes = classNames('producer-card', selected && 'producer-card--selected', className);

        return (
            <div className={classes} onClick={() => this.handleClick(producer.id)}>
                <div className="producer-card-price">
                    <strong>
                        {producer.price}{' '}
                        <span className="price-label" translate="no">
                            ct/kWh
                        </span>
                    </strong>
                </div>
                <div className="producer-card-type-image">{this.createImage(producer.plantType)}</div>
                <div className="producer-card-name">
                    <h3>{producer.name}</h3>
                </div>
            </div>
        );
    }
}

export const ProducerType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
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
