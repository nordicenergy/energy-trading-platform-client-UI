import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { ProducerInfo, Loader } from '../../components';
import { performGetProducer } from '../../action_performers/producers';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { PATHS } from '../../services/routes';

import './MyProducer.css';

const labels = defineMessages({
    header: {
        id: 'app.producerPage.header',
        defaultMessage: 'My Producer'
    },
    name: {
        id: 'app.producerPage.name',
        defaultMessage: 'Name'
    },
    price: {
        id: 'app.producerPage.price',
        defaultMessage: 'Price'
    },
    energyType: {
        id: 'app.producerPage.energyType',
        defaultMessage: 'Type of energy'
    },
    annualProduction: {
        id: 'app.producerPage.annualProduction',
        defaultMessage: 'Annual Production'
    },
    purchased: {
        id: 'app.producerPage.purchased',
        defaultMessage: 'Energy purchased'
    },
    capacity: {
        id: 'app.producerPage.capacity',
        defaultMessage: 'Peak Capacity'
    },
    selectedSince: {
        id: 'app.producerPage.selectedSince',
        defaultMessage: 'Selected since'
    },
    location: {
        id: 'app.producerPage.location',
        defaultMessage: 'Location'
    }
});

export class MyProducer extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            {
                ...PATHS.trading,
                label: formatMessage(PATHS.trading.label)
            },
            {
                ...PATHS.myProducer,
                label: formatMessage(PATHS.myProducer.label)
            }
        ];
        super(props, context, breadcrumbs);
    }

    static mapStateToProps(state) {
        return {
            loading: state.Producers.producer.loading,
            producer: state.Producers.producer.data,
            error: state.Producers.producer.error
        };
    }

    componentDidMount() {
        performGetProducer('testId');
    }

    render() {
        const { formatMessage } = this.context.intl;
        const { loading, producer = {} } = this.props;

        const producerInfoProps = {
            labels: {
                name: formatMessage(labels.name),
                price: formatMessage(labels.price),
                energyType: formatMessage(labels.energyType),
                annualProduction: formatMessage(labels.annualProduction),
                purchased: formatMessage(labels.purchased),
                capacity: formatMessage(labels.capacity),
                selectedSince: formatMessage(labels.selectedSince),
                location: formatMessage(labels.location)
            },
            details: {
                name: producer.name,
                price: producer.price,
                energyType: producer.plantType,
                annualProduction: producer.annualProduction,
                purchased: producer.purchased,
                capacity: producer.capacity,
                selectedSince: producer.dates,
                location: producer.location
            },
            description: producer.description,
            picture: producer.picture
        };

        return (
            <div className="my-producer-page">
                <Loader show={loading} />
                <h1>{formatMessage(labels.header)}</h1>
                <ProducerInfo {...producerInfoProps} />
            </div>
        );
    }
}

MyProducer.contextTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};

MyProducer.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.object
};

MyProducer.defaultProps = {
    loading: false,
    data: {},
    error: null
};

export default connect(MyProducer.mapStateToProps)(MyProducer);
