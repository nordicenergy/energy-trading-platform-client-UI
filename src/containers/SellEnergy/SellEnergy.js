import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PATHS } from '../../services/routes';
import { SellEnergy as messages } from '../../services/translations/messages';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { OfferForm, OffersSlider, BackLink } from '../../components';
import { performGetUserData } from '../../action_performers/users';
import {
    performGetOwnedProducerOffer,
    performAddOwnedProducerOffer,
    performGetOwnedProducerOffersHistory,
    performGetCurrentMarketPrice
} from '../../action_performers/producers';
import './SellEnergy.css';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import Validator from 'async-validator';

export class SellEnergy extends AbstractContainer {
    constructor(props, context) {
        super(props, context);
        this.state = {
            updated: false,
            errors: {}
        };
    }

    static mapStateToProps(state) {
        return {
            offers: state.Producers.ownedProducerOffersHistory.data,
            user: state.Users.profile.data.user,
            ownedProducerOfferInfo: state.Producers.ownedProducerOffer.data.producer,
            error:
                state.Producers.ownedProducerOffer.error ||
                state.Users.profile.error ||
                state.Producers.ownedProducerOffersHistory.error ||
                state.Producers.currentMarketPrice.error,
            loading:
                state.Producers.ownedProducerOffer.loading ||
                state.Users.profile.loading ||
                state.Producers.ownedProducerOffersHistory.loading ||
                state.Producers.currentMarketPrice.loading,
            currentMarketPrice: state.Producers.currentMarketPrice.data,
            locale: state.App.localization.data.locale
        };
    }

    componentDidMount() {
        performGetUserData();
        // TODO: need remove this action, you can find current price in user entity (=user.workingPrice)
        performGetCurrentMarketPrice();
        this.setupSellEnergyBreadcrumbs();
    }

    componentDidUpdate(prevProps) {
        const { formatMessage } = this.context.intl;
        const { user, loading, error, ownedProducerOfferInfo, locale } = this.props;
        if (user && user.id && prevProps.user !== user) {
            performGetOwnedProducerOffer(user.id);
        }

        if (
            ownedProducerOfferInfo &&
            ownedProducerOfferInfo.id &&
            prevProps.ownedProducerOfferInfo !== ownedProducerOfferInfo
        ) {
            performGetOwnedProducerOffersHistory(ownedProducerOfferInfo.id);
        }

        if (locale !== prevProps.locale) {
            this.setupSellEnergyBreadcrumbs();
        }

        if (!loading && this.state.updated && ownedProducerOfferInfo !== prevProps.ownedProducerOfferInfo) {
            performPushNotification({
                type: 'success',
                message: formatMessage(messages.addedOfferSuccessMessage)
            });
            this.setState({
                updated: false
            });
        }

        if (!loading && error && error !== prevProps.error) {
            //FIXME: move error messages to translations (de, en locales)
            performPushNotification({ message: error.message, type: 'error' });
        }

        if (prevProps.loading !== loading) {
            performSetupLoaderVisibility(loading);
        }
    }

    prepareValidator() {
        const { formatMessage } = this.context.intl;
        const validationSchema = {
            capacity: [
                {
                    required: true,
                    message: formatMessage(messages.capacityEmptyFieldError)
                },
                {
                    type: 'number',
                    transform(value) {
                        return Number(value);
                    },
                    message: formatMessage(messages.capacityInvalidFieldError)
                }
            ],
            city: {
                type: 'string',
                required: true,
                message: formatMessage(messages.cityFieldError)
            },
            street: {
                type: 'string',
                required: true,
                message: formatMessage(messages.streetFieldError)
            },
            postcode: {
                type: 'string',
                required: true,
                message: formatMessage(messages.postcodeFieldError)
            },
            description: {
                type: 'string',
                required: true,
                message: formatMessage(messages.descriptionFieldError)
            },
            name: {
                type: 'string',
                required: true,
                message: formatMessage(messages.nameFieldError)
            }
        };

        return new Validator(validationSchema);
    }

    setupSellEnergyBreadcrumbs() {
        const { formatMessage } = this.context.intl;
        this.setupBreadcrumbs([
            {
                ...PATHS.overview,
                label: formatMessage(PATHS.overview.label)
            },
            {
                ...PATHS.sellEnergy,
                label: formatMessage(PATHS.sellEnergy.label)
            }
        ]);
    }

    handleBackLinkClick(event) {
        event.preventDefault();
        const { history } = this.context.router;
        history.push(PATHS.overview.path);
    }

    submitOffer(offerData) {
        const validator = this.prepareValidator();

        validator.validate(offerData, errors => {
            if (errors) {
                this.setState({
                    errors: errors.reduce(
                        (errorsState, { field, message }) => ({
                            ...errorsState,
                            [field]: message
                        }),
                        {}
                    )
                });
            } else {
                this.setState({
                    errors: {},
                    updated: true
                });
                performAddOwnedProducerOffer(this.props.ownedProducerOfferInfo.id, offerData);
            }
        });
    }

    renderOffersSlider() {
        const { offers, ownedProducerOfferInfo } = this.props;
        const { formatMessage } = this.context.intl;

        const formattedOffers = offers.map(offer => ({
            ...offer,
            id: ownedProducerOfferInfo.id,
            energyType: ownedProducerOfferInfo.plantType
        }));

        if (offers && offers.length > 0) {
            return (
                <div className="sell-energy-page-offers">
                    <h2>{formatMessage(messages.offersSectionTitle)}</h2>
                    <OffersSlider className="offers-slider--full-width" offers={formattedOffers} />
                </div>
            );
        }

        return null;
    }

    render() {
        const labels = this.prepareLabels(messages);

        return (
            <section className="sell-energy-page">
                <h1>
                    <BackLink onClick={event => this.handleBackLinkClick(event)} />
                    <span>{labels.pageTitle}</span>
                </h1>
                <OfferForm
                    labels={labels}
                    offer={this.props.ownedProducerOfferInfo}
                    marketPrice={this.props.currentMarketPrice}
                    errors={this.state.errors}
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
    offers: PropTypes.arrayOf(PropTypes.object),
    ownedProducerOfferInfo: PropTypes.object,
    currentMarketPrice: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.object,
    user: PropTypes.object,
    locale: PropTypes.string
};

export default connect(SellEnergy.mapStateToProps)(SellEnergy);
