import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PATHS } from '../../services/routes';
import { SellEnergy as messages } from '../../services/translations/messages';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { OfferForm, OffersSlider, BackLink } from '../../components';
import './SellEnergy.css';

export class SellEnergy extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            {
                ...PATHS.overview,
                label: formatMessage(PATHS.overview.label)
            },
            {
                ...PATHS.sellEnergy,
                label: formatMessage(PATHS.sellEnergy.label)
            }
        ];
        super(props, context, breadcrumbs);
    }

    static mapStateToProps(/* state */) {
        return {
            offers: [
                {
                    id: '01',
                    startPeriod: 1502236800,
                    endPeriod: 1505001600,
                    energyType: 'wind',
                    price: 2.9
                },
                {
                    id: '02',
                    startPeriod: 1502236800,
                    endPeriod: 1505001600,
                    energyType: 'biomass',
                    price: 3.2
                },
                {
                    id: '03',
                    startPeriod: 1502236800,
                    endPeriod: 1505001600,
                    energyType: 'solar',
                    price: 4
                },
                {
                    id: '04',
                    startPeriod: 1502236800,
                    endPeriod: 1505001600,
                    energyType: 'wind',
                    price: 2.9
                },
                {
                    id: '05',
                    startPeriod: 1502236800,
                    endPeriod: 1505001600,
                    energyType: 'biomass',
                    price: 3.2
                },
                {
                    id: '06',
                    startPeriod: 1502236800,
                    endPeriod: 1505001600,
                    energyType: 'solar',
                    price: 4
                }
            ]
        };
    }

    handleBackLinkClick(event) {
        event.preventDefault();
        const { history } = this.context.router;
        history.push(PATHS.trading.path);
    }

    renderOffersSlider() {
        const { offers } = this.props;
        const { formatMessage } = this.context.intl;

        if (offers && offers.length > 0) {
            return (
                <div className="sell-energy-page-offers">
                    <h2>{formatMessage(messages.offersSectionTitle)}</h2>
                    <OffersSlider className="offers-slider--full-width" offers={offers} />
                </div>
            );
        }

        return null;
    }

    render() {
        const { formatMessage } = this.context.intl;

        return (
            <section className="sell-energy-page">
                <h1>
                    <BackLink onClick={event => this.handleBackLinkClick(event)} />
                    <span>{formatMessage(messages.pageTitle)}</span>
                </h1>
                <OfferForm />
                {this.renderOffersSlider()}
                {/* TODO remove (including styles) after complete implementation */}
                <div className="not-allowed-backdrop" />
            </section>
        );
    }
}

SellEnergy.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        })
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};
SellEnergy.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.object)
};

export default connect(SellEnergy.mapStateToProps)(SellEnergy);
