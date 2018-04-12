import React from 'react';
import PropTypes from 'prop-types';

import './ProducerInfo.css';

class ProducerInfo extends React.Component {
    priceAdditionalInfo() {
        const { labels, details } = this.props;
        const { marketPrice } = details;

        return () =>
            marketPrice ? (
                <small className="producer-information-market-value">
                    {`${labels.marketPrice} `}
                    <strong>{marketPrice}</strong>
                    {` ct/KWh`}
                </small>
            ) : null;
    }

    renderImage(picture) {
        if (picture) {
            return <img src={picture} alt="Here you can see how looks producer" />;
        }

        return <Placeholder />;
    }

    renderInfoRow(label, value, Additional) {
        return (
            <div className="producer-information-row">
                <p>
                    <span className="producer-information-label">{label}</span>
                    <span className="producer-information-value" translate="no">
                        <span>{value}</span>
                        {Additional && <Additional />}
                    </span>
                </p>
            </div>
        );
    }

    render() {
        const { labels, details, description, picture } = this.props;
        const { name, price, energyType, annualProduction, purchased, capacity, selectedSince, location } = details;

        return (
            <section className="producer-information">
                <section className="producer-information-details">
                    {name && this.renderInfoRow(labels.name, name)}
                    {price && this.renderInfoRow(labels.price, `${price} ct/KWh`, this.priceAdditionalInfo())}
                    {energyType && this.renderInfoRow(labels.energyType, energyType)}
                    {annualProduction && this.renderInfoRow(labels.annualProduction, `${annualProduction} kWh/day`)}
                    {purchased && this.renderInfoRow(labels.purchased, `${purchased} kWh`)}
                    {capacity && this.renderInfoRow(labels.capacity, `${capacity} MW`)}
                    {selectedSince && this.renderInfoRow(labels.selectedSince, selectedSince)}
                    {location && this.renderInfoRow(labels.location, location)}
                    <p className="producer-information-desc">{description}</p>
                </section>
                <figure className="producer-information-image">{this.renderImage(picture)}</figure>
            </section>
        );
    }
}

ProducerInfo.propTypes = {
    details: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        marketPrice: PropTypes.number,
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
        marketPrice: PropTypes.string,
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

export function Placeholder() {
    return (
        <div className="producer-information-image-placeholder">
            <svg viewBox="0 0 85 81" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Producer Profile Image Placeholder</title>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-1141.000000, -271.000000)">
                        <g transform="translate(1142.000000, 272.000000)">
                            <g stroke="#b3b3b3" strokeLinejoin="round" strokeWidth="2">
                                <polyline
                                    id="stroke-1"
                                    points="12 26 28.963 14.5 28.963 26 47.377 13.75 47.377 26 65.082 14.375 65.082 26 83 14.187 83 30 83 79 12.533 79"
                                />
                                <polygon id="stroke-2" points="12 79 0 79 0 39 0 9 12 0 12 39" />
                            </g>
                            <polygon
                                fill="#f2f2f2"
                                points="55.7148 49.7363 38.7488 73.9283 41.2618 53.0003 34.9788 53.0003 51.9438 29.0003 49.4308 49.7363"
                            />
                            <polygon
                                stroke="#b3b3b3"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points="56.1641 49.7725 38.7491 73.9285 41.2761 53.0005 34.2761 53.0005 51.9441 29.0005 49.9101 49.7725"
                            />
                            <g stroke="#b3b3b3" strokeWidth="2">
                                <path d="M39.126,68.3301 C32.267,65.7991 27.376,59.2031 27.376,51.4641 C27.376,41.5391 35.421,33.4931 45.347,33.4931 C46.287,33.4931 47.21,33.5651 48.111,33.7041" />
                                <path d="M51.5674,34.5986 C58.4264,37.1296 63.3174,43.7256 63.3174,51.4636 C63.3174,61.3896 55.2724,69.4356 45.3464,69.4356 C44.4064,69.4356 43.4834,69.3636 42.5824,69.2246" />
                                <polygon strokeLinejoin="round" points="12 0 0 9 0 17 12 8" />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
}
