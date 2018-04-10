import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { ProducerInfo, Loader } from '../../components';
import { performGetUserData } from '../../action_performers/users';
import { performGetProducer } from '../../action_performers/producers';
import { PATHS } from '../../services/routes';
import { convertPlantType } from '../../services/plantType';

import AbstractContainer from '../AbstractContainer/AbstractContainer';

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
            loading:
                state.Producers.producer.loading || state.Users.profile.loading,
            profile: state.Users.profile.data,
            producer: state.Producers.producer.data,
            error: state.Producers.producer.error
        };
    }

    componentDidMount() {
        performGetUserData();
        this.fetchProducer();
    }

    componentDidUpdate(prevProps) {
        const { profile: { user: prevUser = {} } = {} } = prevProps;
        const { profile: { user = {} } = {} } = this.props;

        if (user.currentProducerId !== prevUser.currentProducerId) {
            this.fetchProducer();
        }
    }

    fetchProducer() {
        const { profile: { user } = {} } = this.props;

        if (user && user.currentProducerId) {
            performGetProducer(user.currentProducerId);
        }
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
                energyType: formatMessage(convertPlantType(producer.plantType)),
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
    producer: PropTypes.object,
    profile: PropTypes.object,
    error: PropTypes.object
};

MyProducer.defaultProps = {
    loading: false,
    producer: {},
    profile: {},
    error: null
};

export default connect(MyProducer.mapStateToProps)(MyProducer);
