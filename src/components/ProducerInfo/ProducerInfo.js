import React from 'react';
import PropTypes from 'prop-types';

import './ProducerInfo.css';

class ProducerInfo extends React.Component {
    renderInfoRow(label, value) {
        return (
            <div className="producer-information-row">
                <p>
                    <span className="producer-information-label">{label}</span>
                    <span className="producer-information-value" translate="no">
                        {value}
                    </span>
                </p>
            </div>
        );
    }

    render() {
        const { labels, details, description, picture } = this.props;
        const {
            name,
            price,
            energyType,
            annualProduction,
            purchased,
            capacity,
            selectedSince,
            location
        } = details;

        return (
            <section className="producer-information">
                <section className="producer-information-details">
                    {this.renderInfoRow(labels.name, name)}
                    {this.renderInfoRow(labels.price, `${price} ct/KWh`)}
                    {this.renderInfoRow(labels.energyType, energyType)}
                    {this.renderInfoRow(
                        labels.annualProduction,
                        `${annualProduction} kWh/day`
                    )}
                    {this.renderInfoRow(labels.purchased, `${purchased} kWh`)}
                    {this.renderInfoRow(labels.capacity, `${capacity} MW`)}
                    {this.renderInfoRow(labels.selectedSince, selectedSince)}
                    {this.renderInfoRow(labels.location, location)}
                    <p className="producer-information-desc">{description}</p>
                </section>
                <figure className="producer-information-image">
                    <img
                        src={picture}
                        alt="Here you can see how looks producer"
                    />
                </figure>
            </section>
        );
    }
}

ProducerInfo.propTypes = {
    details: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        energyType: PropTypes.string,
        annualProduction: PropTypes.number,
        purchased: PropTypes.number,
        capacity: PropTypes.number,
        selectedSince: PropTypes.string,
        location: PropTypes.string
    }),
    labels: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.string,
        energyType: PropTypes.string,
        annualProduction: PropTypes.string,
        purchased: PropTypes.string,
        capacity: PropTypes.string,
        selectedSince: PropTypes.string,
        location: PropTypes.string
    }),
    description: PropTypes.string,
    picture: PropTypes.string
};

export default ProducerInfo;
