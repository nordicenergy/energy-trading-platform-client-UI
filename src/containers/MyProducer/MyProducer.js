import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/fontawesome-free-solid';
import { ProducerInfo, ProducerHistory, Loader, Button } from '../../components';
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
            loading: state.Producers.producer.loading || state.Users.profile.loading,
            profile: state.Users.profile.data,
            producer: state.Producers.producer.data,
            error: state.Producers.producer.error || state.Users.profile.error
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

        const producerInfoProps = prepareProducerInfoProps(formatMessage, producer);

        // TODO replace by data from store
        const historyProps = {
            title: 'History of changes',
            data: [
                {
                    date: 'Sep 12',
                    value: 'Change amount of energy 3000 kWh'
                },
                {
                    date: 'Feb 22',
                    value: 'Price change 2.4 ct/kWh'
                },
                {
                    date: 'Feb 12',
                    value: 'Change amount of energy 2300 kWh'
                },
                {
                    date: 'Jan 14',
                    value: 'Price change 3 ct/kWh'
                }
            ]
        };

        return (
            <div className="my-producer-page">
                <Loader show={loading} />
                <section className="my-producer-page-info-container">
                    <h1>{formatMessage(labels.header)}</h1>
                    <ProducerInfo {...producerInfoProps} />
                </section>
                <section className="my-producer-page-controls">
                    <Button>{formatMessage(labels.changeButton)}</Button>
                    <a
                        className="my-producer-page-switch-back"
                        href=""
                        onClick={event => {
                            event.preventDefault();
                            // TODO: implement correct navigation logic
                        }}
                    >
                        <FontAwesomeIcon icon={faReply} />
                        <span>{formatMessage(labels.switchBack)}</span>
                    </a>
                </section>
                <section className="my-producer-page-history">
                    <ProducerHistory {...historyProps} />
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
