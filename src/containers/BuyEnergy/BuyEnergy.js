import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PLANT_TYPES } from '../../constants';
import { PATHS } from '../../services/routes';
import { convertPlantType } from '../../services/plantType';
import { BuyEnergy as messages } from '../../services/translations/messages';
import { performGetCurrentProducer, performGetProducers } from '../../action_performers/producers';
import { performPushNotification } from '../../action_performers/notifications';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { Loader, DisclosureArrow, ProducerCardsPanel, ProducersFilter, OptionLinks } from '../../components';
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
const LINKS = [
    {
        link: '#trade-directly-on-market',
        caption: messages.tradeDirectlyOnMarketLink
    },
    {
        link: '#lition-energy-exchange',
        caption: messages.litionEnergyExchangeLink
    }
];

export class BuyEnergy extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            {
                ...PATHS.overview,
                label: formatMessage(PATHS.overview.label)
            },
            {
                ...PATHS.buyEnergy,
                label: formatMessage(PATHS.buyEnergy.label)
            }
        ];

        super(props, context, breadcrumbs);

        this.state = {
            filter: [],
            page: 0
        };
    }

    static mapStateToProps({ Producers }) {
        return {
            error: Producers.currentProducer.error || Producers.producers.error,
            currentProducerLoading: Producers.currentProducer.loading,
            currentProducer: Producers.currentProducer.data,
            producersLoading: Producers.producers.loading,
            producers: Producers.producers.data.entries,
            hasNextProducers: Producers.producers.data.total > Producers.producers.data.entries.length
        };
    }

    componentDidMount() {
        const { producers } = this.props;

        if (producers.length === 0) {
            performGetProducers();
        }

        performGetCurrentProducer();

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
        const { error: oldError } = prevProps;
        const { currentProducerLoading, producersLoading, error: newError } = this.props;

        if (prevState.page !== this.state.page || prevState.filter !== this.state.filter) {
            performGetProducers({ page: this.state.page, filter: this.state.filter });
        }

        if (!currentProducerLoading && !producersLoading && newError && newError !== oldError) {
            performPushNotification({ message: newError.message, type: 'error' });
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

    handleBackLinkClick(event) {
        event.preventDefault();
        const { history } = this.context.router;
        history.push(PATHS.trading.path);
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
        const { currentProducerLoading, currentProducer, producersLoading, producers } = this.props;
        const { filter, page } = this.state;
        const shouldShowFullScreenLoader = (currentProducerLoading || producersLoading) && page === 0;
        const shouldShowListLoader = producersLoading && page >= 1;

        return (
            <section className="buy-energy-page" aria-busy={shouldShowFullScreenLoader}>
                <Loader show={shouldShowFullScreenLoader} />
                <header className="buy-energy-page-header">
                    <h1>
                        <a
                            href={PATHS.trading.path}
                            className="back-link"
                            onClick={event => this.handleBackLinkClick(event)}
                        >
                            <DisclosureArrow />
                        </a>
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
                <OptionLinks
                    links={LINKS.map(link => ({
                        ...link,
                        caption: formatMessage(link.caption)
                    }))}
                />
                <ProducerCardsPanel
                    className="buy-energy-page-producers"
                    loading={shouldShowListLoader}
                    producers={producers}
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
    currentProducerLoading: PropTypes.bool.isRequired,
    currentProducer: PropTypes.object.isRequired,
    producersLoading: PropTypes.bool.isRequired,
    producers: PropTypes.arrayOf(PropTypes.object).isRequired,
    hasNextProducers: PropTypes.bool.isRequired
};

export default connect(BuyEnergy.mapStateToProps)(BuyEnergy);
