import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { PLANT_TYPES } from '../../constants';
import { PATHS } from '../../services/routes';
import { convertPlantType } from '../../services/plantType';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { ProducerCardsPanel, FilterCheckbox } from '../../components';
import './BuyEnergy.css';

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
        this.state = {
            filter: []
        };
    }

    static mapStateToProps(/* state */) {
        // TODO replace with real data from redux store.
        return {
            producers: [
                { id: 0, price: 2.9, plantType: 'solar', name: 'John Doe' },
                { id: 1, price: 2, plantType: 'wind', name: 'Peter Producer' },
                { id: 2, price: 1, plantType: 'biomass', name: 'Jeremy' },
                { id: 3, price: 5, plantType: 'wind', name: 'Blark' },
                { id: 4, price: 1, plantType: 'solar', name: 'Alice' }
            ],
            selectedProducer: {
                id: 1,
                price: 2,
                plantType: 'wind',
                name: 'Peter Producer'
            }
        };
    }

    resetFilter() {
        this.setState({ filter: [] });
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
        const { producers, selectedProducer } = this.props;
        const { filter } = this.state;

        return (
            <section className="buy-energy-page">
                <header className="buy-energy-page-header">
                    <h1>{formatMessage(messages.pageTitle)}</h1>
                    <h2>
                        {formatMessage(messages.selectedProducerLabel)}{' '}
                        <strong>{selectedProducer.name}</strong>
                    </h2>
                </header>
                <aside className="buy-energy-page-filter">
                    <div className="producer-filter">
                        <div className="producer-filter-label">
                            <strong>
                                {formatMessage(messages.filterLabel)}
                            </strong>
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
                    producers={producers}
                    selectedProducerId={selectedProducer.id}
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
    producers: PropTypes.arrayOf(PropTypes.object),
    selectedProducer: PropTypes.object
};
BuyEnergy.defaultProps = {
    producers: [],
    selectedProducer: {}
};

export default connect(BuyEnergy.mapStateToProps)(BuyEnergy);
