import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PATHS } from '../../services/routes';
import { SellEnergy as messages } from '../../services/translations/messages';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { OfferForm, OffersSlider, BackLink, Loader } from '../../components';
import { performGetUserData } from '../../action_performers/users';
import { performGetOwnedProducerOffer, performAddOwnedProducerOffer } from '../../action_performers/offers';
import './SellEnergy.css';
import { performPushNotification } from '../../action_performers/notifications';
import { CURRENT_MARKET_PRICE } from '../../constants';

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
        this.state = {
            updated: false
        };
    }

    static mapStateToProps(state) {
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
            ],
            user: state.Users.profile.data.user,
            ownedProducerOfferInfo: state.Offer.ownedProducerOffer.data.producer,
            error: state.Offer.ownedProducerOffer.error || state.Users.profile.error,
            loading: state.Offer.ownedProducerOffer.loading || state.Users.profile.loading
        };
    }

    componentDidMount() {
        performGetUserData();
    }

    componentDidUpdate(prevProps) {
        const { formatMessage } = this.context.intl;
        const { user, loading, error } = this.props;
        if (prevProps.user !== user) {
            performGetOwnedProducerOffer(user.id);
        }

        if (!loading && this.state.updated && this.props.ownedProducerOfferInfo !== prevProps.ownedProducerOfferInfo) {
            performPushNotification({
                type: 'success',
                message: formatMessage(messages.addedOfferSuccessMessage)
            });
            this.setState({
                updated: false
            });
        }

        if (!loading && error && error !== prevProps.error) {
            performPushNotification({ message: error.message, type: 'error' });
        }
    }

    handleBackLinkClick(event) {
        event.preventDefault();
        const { history } = this.context.router;
        history.push(PATHS.overview.path);
    }

    submitOffer(offerData) {
        performAddOwnedProducerOffer(this.props.ownedProducerOfferInfo.id, offerData);
        this.setState({
            updated: true
        });
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
        const labels = this.prepareLabels(messages);

        return (
            <section className="sell-energy-page">
                <Loader show={this.props.loading} />
                <h1>
                    <BackLink onClick={event => this.handleBackLinkClick(event)} />
                    <span>{labels.pageTitle}</span>
                </h1>
                <OfferForm
                    labels={labels}
                    offer={this.props.ownedProducerOfferInfo}
                    marketPrice={CURRENT_MARKET_PRICE}
                    onSubmit={offerData => this.submitOffer(offerData)}
                />
                {this.renderOffersSlider()}
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
