import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProducerInfo, Loader, Button } from '../../components';
import { labels, prepareProducerInfoProps } from '../Producer';
import { performGetUserData } from '../../action_performers/users';
import { performGetProducer } from '../../action_performers/producers';
import { PATHS } from '../../services/routes';

import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './MyProducer.css';

export class MyProducer extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            { ...PATHS.trading, label: formatMessage(PATHS.trading.label) },
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

        const producerInfoProps = prepareProducerInfoProps(
            formatMessage,
            producer
        );

        return (
            <div className="my-producer-page">
                <Loader show={loading} />
                <section className="my-producer-page-info-container">
                    <h1>{formatMessage(labels.header)}</h1>
                    <ProducerInfo {...producerInfoProps} />
                </section>
                <section className="my-producer-page-controls">
                    <Button>{formatMessage(labels.changeButton)}</Button>
                </section>
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
