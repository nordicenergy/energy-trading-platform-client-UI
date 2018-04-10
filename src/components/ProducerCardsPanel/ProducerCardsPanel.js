import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ProducerCard, { ProducerType } from './ProducerCard';
import './ProducerCardsPanel.css';

const ProducerCardsPanel = ({
    className,
    producers,
    selectedProducerId,
    priceLabel,
    onProducerClick
}) => {
    const classes = classNames('producer-cards-panel', className);

    return (
        <div className={classes}>
            <ul className="producer-cards-list">
                {producers.map(producer => (
                    <li key={producer.id} className="producer-cards-list-item">
                        <ProducerCard
                            producer={producer}
                            selected={producer.id === selectedProducerId}
                            priceLabel={priceLabel}
                            onClick={onProducerClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProducerCardsPanel.propTypes = {
    className: PropTypes.string,
    producers: PropTypes.arrayOf(ProducerType),
    selectedProducerId: PropTypes.number,
    priceLabel: PropTypes.string,
    onProducerClick: PropTypes.func
};
ProducerCardsPanel.defaultProps = {
    producers: []
};

export default ProducerCardsPanel;
