import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProducerInfo, Button, Loader } from '../../components';
import { Producer as messages } from '../../services/translations/messages';
import { prepareProducerInfoProps } from './.';

import { performGetProducer, performSelectProducer } from '../../action_performers/producers';
import { performPushNotification } from '../../action_performers/notifications';
import { PATHS } from '../../services/routes';

import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './Producer.css';

export class Producer extends AbstractContainer {
    static mapStateToProps(state) {
        return {
            loading: state.Producers.producer.loading || state.Producers.selectedProducer.loading,
            producer: state.Producers.producer.data,
            selectedProducer: state.Producers.selectedProducer.data,
            error: state.Producers.producer.error || state.Producers.selectedProducer.error
        };
    }

    componentDidMount() {
        const { match: { params } = {} } = this.props;
        performGetProducer(params.producerId);
        this.setupProducerBreadcrumbs();
    }

    componentDidUpdate(prevProps) {
        const { producer: prevProducer = {}, selectedProducer: prevSelectedProducer = {}, error: oldError } = prevProps;
        const { producer = {}, selectedProducer = {}, error, loading } = this.props;

        if (prevProducer.id !== producer.id || prevProducer.name !== producer.name) {
            this.setupProducerBreadcrumbs();
        }

        if (prevSelectedProducer !== selectedProducer) {
            this.backToProducers();
        }

        if (!loading && error && error !== oldError) {
            performPushNotification({ message: error.message, type: 'error' });
        }
    }

    setupProducerBreadcrumbs() {
        const { formatMessage } = this.context.intl;
        const { producer } = this.props;
        if (producer && producer.name) {
            this.setupBreadcrumbs([
                {
                    ...PATHS.trading,
                    label: formatMessage(PATHS.trading.label)
                },
                {
                    ...PATHS.buyEnergy,
                    label: formatMessage(PATHS.buyEnergy.label)
                },
                {
                    ...PATHS.producer,
                    path: PATHS.producer.path.replace(':producerId', producer.id),
                    label: producer.name
                }
            ]);
        }
    }

    backToProducers() {
        const { history } = this.context.router;
        history.push(PATHS.buyEnergy.path);
    }

    render() {
        const { formatMessage } = this.context.intl;
        const { loading, producer = {} } = this.props;
        const producerInfoProps = prepareProducerInfoProps(formatMessage, producer);

        return (
            <div className="producer-page">
                <Loader show={loading} />
                <section className="producer-page-info-container">
                    <h1>{producer.name}</h1>
                    <ProducerInfo {...producerInfoProps} />
                </section>
                <section className="producer-page-controls">
                    <Button onClick={() => performSelectProducer(producer.id)}>
                        {formatMessage(messages.selectButton)}
                    </Button>
                    <Button className="producer-page-back-to-producers" onClick={() => this.backToProducers()}>
                        {formatMessage(messages.backButton)}
                    </Button>
                </section>
            </div>
        );
    }
}

Producer.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        })
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};

Producer.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            producerId: PropTypes.string.isRequired
        })
    }),
    loading: PropTypes.bool,
    producer: PropTypes.object,
    error: PropTypes.object
};

Producer.defaultProps = {
    loading: false,
    producer: {},
    error: null
};

export default connect(Producer.mapStateToProps)(Producer);
