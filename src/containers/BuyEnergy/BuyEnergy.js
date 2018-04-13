import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { PLANT_TYPES } from '../../constants';
import { PATHS } from '../../services/routes';
import { convertPlantType } from '../../services/plantType';
import { performGetCurrentProducer, performGetProducers } from '../../action_performers/producers';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { Loader, ProducerCardsPanel, FilterCheckbox, OptionLinks } from '../../components';
import './BuyEnergy.css';

const pageBottomOffset = 200; // pixels
const scrollTimeout = 100; // milliseconds
const messages = defineMessages({
    pageTitle: {
        id: 'app.buyEnergyPage.pageTitle',
        defaultMessage: 'Buy Energy'
    },
    selectedProducerLabel: {
        id: 'app.buyEnergyPage.selectedProducerLabel',
        defaultMessage: 'Current Selection:'
    },
    filterLabel: {
        id: 'app.buyEnergyPage.filterLabel',
        defaultMessage: 'Filter by:'
    },
    filterOptionAll: {
        id: 'app.buyEnergyPage.filterOptionAll',
        defaultMessage: 'All'
    },
    tradeDirectlyOnMarketLink: {
        id: 'app.buyEnergyPage.tradeDirectlyOnMarketLink',
        defaultMessage: 'Trade directly on market'
    },
    litionEnergyExchangeLink: {
        id: 'app.buyEnergyPage.litionEnergyExchangeLink',
        defaultMessage: 'Lition energy exchange'
    }
});
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
                ...PATHS.trading,
                label: formatMessage(PATHS.trading.label)
            },
            {
                ...PATHS.buyEnergy,
                label: formatMessage(PATHS.buyEnergy.label)
            }
        ];

        super(props, context, breadcrumbs);

        this.scrollTimeout = null;
        this.lastScrollTop = 0;
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            filter: [],
            page: 0
        };
    }

    static mapStateToProps({ Producers }) {
        return {
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
        document.getElementById('main-container').addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            performGetProducers({ page: this.state.page });
        }
    }

    componentWillUnmount() {
        document.getElementById('main-container').removeEventListener('scroll', this.handleScroll);
    }

    resetFilter() {
        this.setState({ filter: [] });
    }

    handleScroll(event) {
        const { target } = event;
        clearTimeout(this.scrollTimeout);

        this.scrollTimeout = setTimeout(() => {
            const { producersLoading, hasNextProducers } = this.props;
            const { scrollTop, clientHeight, scrollHeight } = target;
            const isScrollDown = scrollTop > this.lastScrollTop;
            const delta = scrollHeight - scrollTop - clientHeight;

            if (delta <= pageBottomOffset && isScrollDown && hasNextProducers && !producersLoading) {
                this.setState(prevState => ({
                    page: prevState.page + 1
                }));
            }

            this.lastScrollTop = scrollTop;
        }, scrollTimeout);
    }

    handleFilterChange(event) {
        const { filter } = this.state;
        const { name } = event.currentTarget;
        let changedFilter;

        if (filter.includes(name)) {
            changedFilter = filter.filter(option => option !== name);
        } else {
            changedFilter = [...filter, name];
        }

        this.setState({ filter: changedFilter });
    }

    handleProducerClick(producerId) {
        const { history } = this.context.router;
        history.push(`/${PATHS.trading.id}/${PATHS.buyEnergy.id}/${PATHS.producer.id}/${producerId}`);
    }

    render() {
        const { formatMessage } = this.context.intl;
        const { currentProducerLoading, currentProducer, producersLoading, producers } = this.props;
        const { filter, page } = this.state;
        const shouldShowFullScreenLoader = (currentProducerLoading || producersLoading) && page === 0;
        const shouldShowListLoader = producersLoading && page >= 1;

        return (
            <section className="buy-energy-page">
                <Loader show={shouldShowFullScreenLoader} />
                <header className="buy-energy-page-header">
                    <h1>{formatMessage(messages.pageTitle)}</h1>
                    <h2>
                        {formatMessage(messages.selectedProducerLabel)} <strong>{currentProducer.name}</strong>
                    </h2>
                </header>
                <aside className="buy-energy-page-filter">
                    <div className="producer-filter">
                        <div className="producer-filter-label">
                            <strong>{formatMessage(messages.filterLabel)}</strong>
                        </div>
                        <div className="producer-filter-options">
                            <FilterCheckbox
                                className="producer-filter-option"
                                label={formatMessage(messages.filterOptionAll)}
                                name="reset"
                                checked={filter.length === 0}
                                onChange={() => this.resetFilter()}
                            />
                            {FILTER_OPTIONS.map(({ name, label, type }) => (
                                <FilterCheckbox
                                    key={name}
                                    className="producer-filter-option"
                                    label={formatMessage(label)}
                                    type={type}
                                    name={name}
                                    checked={filter.includes(name)}
                                    onChange={event => {
                                        this.handleFilterChange(event);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </aside>
                <ProducerCardsPanel
                    className="buy-energy-page-producers"
                    loading={shouldShowListLoader}
                    producers={producers}
                    selectedProducerId={currentProducer.id}
                    onProducerClick={producerId => {
                        this.handleProducerClick(producerId);
                    }}
                />
                <OptionLinks
                    links={LINKS.map(link => ({
                        ...link,
                        caption: formatMessage(link.caption)
                    }))}
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
