import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PLANT_TYPES, PRODUCER_STATUSES, CONTRACT_STATUSES } from '../../constants';
import { PATHS } from '../../services/routes';
import { convertPlantType, convertProducerStatus } from '../../services/translations/enums';
import { BuyEnergy as messages } from '../../services/translations/messages';
import { performGetCurrentProducer, performGetProducers } from '../../action_performers/producers';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { BackLink, ProducerCardsPanel, ProducersFilter } from '../../components';
import './BuyEnergy.css';

const FILTER_OPTIONS = [
    {
        name: 'wind',
        label: convertPlantType(PLANT_TYPES.wind),
        type: PLANT_TYPES.wind
    },
    {
        name: 'solar',
        label: convertPlantType(PLANT_TYPES.solar),
        type: PLANT_TYPES.solar
    },
    {
        name: 'biomass',
        label: convertPlantType(PLANT_TYPES.biomass),
        type: PLANT_TYPES.biomass
    }
];

export class BuyEnergy extends AbstractContainer {
    constructor(props, context) {
        super(props, context);

        this.state = {
            filter: null,
            page: 0
        };
    }

    static mapStateToProps({ Users, Producers, App }) {
        return {
            user: Users.profile.data.user,
            error: Producers.currentProducer.error || Producers.producers.error,
            currentProducerLoading: Producers.currentProducer.loading,
            currentProducer: Producers.currentProducer.data,
            producersLoading: Producers.producers.loading,
            producers: Producers.producers.data.entries,
            hasNextProducers: Producers.producers.data.total > Producers.producers.data.entries.length,
            locale: App.localization.data.locale
        };
    }

    componentDidMount() {
        if (this.props.user.statusCode !== CONTRACT_STATUSES.success) {
            this.context.router.history.push(PATHS.overview.path);
            return;
        }

        performGetProducers();
        performGetCurrentProducer();
        this.setupBuyEnergyBreadcrumbs();

        const loadCondition = () => {
            const { hasNextProducers, producersLoading } = this.props;
            return hasNextProducers && !producersLoading;
        };
        const loadCallback = () => {
            this.setState(prevState => ({
                page: prevState.page + 1
            }));
        };
        this.setupScrollHandler(loadCondition, loadCallback);
    }

    componentDidUpdate(prevProps, prevState) {
        const { formatMessage } = this.context.intl;
        const { error: oldError } = prevProps;
        const { currentProducerLoading, producersLoading, error: newError, locale } = this.props;
        const shouldShowFullScreenLoader = (currentProducerLoading || producersLoading) && this.state.page === 0;

        if (prevState.page !== this.state.page || prevState.filter !== this.state.filter) {
            performGetProducers({ page: this.state.page, filter: this.state.filter });
        }

        if (locale !== prevProps.locale) {
            this.setupBuyEnergyBreadcrumbs();
        }

        if (!currentProducerLoading && !producersLoading && newError && newError !== oldError) {
            performPushNotification({ message: formatMessage(messages.loadingErrorMessage), type: 'error' });
        }

        if (
            prevProps.currentProducerLoading !== currentProducerLoading ||
            prevProps.producersLoading !== producersLoading
        ) {
            performSetupLoaderVisibility(shouldShowFullScreenLoader);
        }
    }

    componentWillUnmount() {
        this.removeScrollHandler();
        this.scrollToTop();
    }

    prepareFilterOptions() {
        const { formatMessage } = this.context.intl;
        return FILTER_OPTIONS.map(option => ({
            name: option.name,
            label: formatMessage(option.label),
            type: option.type
        }));
    }

    prepareProducers() {
        const { formatMessage } = this.context.intl;
        const { producers } = this.props;
        return producers.map(producer => {
            const plantType = formatMessage(convertPlantType(producer.plantType));
            const status =
                producer.status === PRODUCER_STATUSES.soldOut
                    ? formatMessage(convertProducerStatus(producer.status))
                    : null;

            return { ...producer, status, plantType };
        });
    }

    setupBuyEnergyBreadcrumbs() {
        const { formatMessage } = this.context.intl;
        this.setupBreadcrumbs([
            {
                ...PATHS.buyEnergy,
                label: formatMessage(PATHS.buyEnergy.label)
            }
        ]);
    }

    handleBackLinkClick(event) {
        event.preventDefault();
        const { history } = this.context.router;
        history.push(PATHS.overview.path);
    }

    handleFilterChange(filter) {
        this.setState({ filter, page: 0 });
    }

    handleProducerClick(producerId) {
        const { history } = this.context.router;
        history.push(`${PATHS.buyEnergy.path}/${PATHS.producer.id}/${producerId}`);
    }

    render() {
        const { formatMessage } = this.context.intl;
        const { currentProducer, producersLoading } = this.props;
        const { filter, page } = this.state;
        const shouldShowListLoader = producersLoading && page >= 1;

        return (
            <section className="buy-energy-page">
                <header className="buy-energy-page-header">
                    <h1>
                        <BackLink onClick={event => this.handleBackLinkClick(event)} />
                        <span>{formatMessage(messages.pageTitle)}</span>
                    </h1>
                    <h2>
                        {formatMessage(messages.selectedProducerLabel)} <strong>{currentProducer.name}</strong>
                    </h2>
                </header>
                <ProducersFilter
                    labels={{
                        helpMessage: formatMessage(messages.filterLabel),
                        defaultOption: formatMessage(messages.filterOptionAll)
                    }}
                    options={this.prepareFilterOptions()}
                    value={filter}
                    onChange={filter => this.handleFilterChange(filter)}
                />
                <ProducerCardsPanel
                    className="buy-energy-page-producers"
                    loading={shouldShowListLoader}
                    producers={this.prepareProducers()}
                    selectedProducerId={currentProducer.id}
                    onProducerClick={producerId => {
                        this.handleProducerClick(producerId);
                    }}
                />
            </section>
        );
    }
}

BuyEnergy.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        })
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};
BuyEnergy.propTypes = {
    user: PropTypes.object.isRequired,
    currentProducerLoading: PropTypes.bool.isRequired,
    currentProducer: PropTypes.object.isRequired,
    producersLoading: PropTypes.bool.isRequired,
    producers: PropTypes.arrayOf(PropTypes.object).isRequired,
    hasNextProducers: PropTypes.bool.isRequired,
    locale: PropTypes.string
};
BuyEnergy.defaultProps = { user: {} };

export default connect(BuyEnergy.mapStateToProps)(BuyEnergy);
