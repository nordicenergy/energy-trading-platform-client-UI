import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationCardsPanel, RecentTransactions, Loader } from '../../components';
import { performGetRecentTransactions } from '../../action_performers/transactions';
import { performGetUserData } from '../../action_performers/users';
import { performPushNotification } from '../../action_performers/notifications';
import { PATHS } from '../../services/routes';
import { Overview as messages } from '../../services/translations/messages';

import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './Overview.css';

export class Overview extends AbstractContainer {
    static mapStateToProps(state) {
        return {
            loading: state.Transactions.recentTransactions.loading || state.Users.profile.loading,
            recentTransactions: state.Transactions.recentTransactions.data,
            user: state.Users.profile.data.user,
            error: state.Transactions.recentTransactions.error || state.Users.profile.error
        };
    }

    componentDidMount() {
        performGetUserData();
    }

    componentDidUpdate(prevProps) {
        const { user, loading, error } = this.props;

        if (user !== prevProps.user) {
            performGetRecentTransactions(this.props.user.id);
        }

        if (!loading && error && error !== prevProps.error) {
            performPushNotification({ message: error.message, type: 'error' });
        }
    }

    prepareLabels() {
        const { formatMessage } = this.context.intl;
        const entries = Object.keys(messages).map(key => [key, messages[key]]);

        return entries.reduce((labels, [labelName, messageDescriptor]) => {
            return {
                ...labels,
                [labelName]: formatMessage(messageDescriptor)
            };
        }, {});
    }

    navigateTo(route) {
        this.context.router.history.push(route);
    }

    openWattcoinPage() {
        this.navigateTo(PATHS.wattcoin.path);
    }

    render() {
        const labels = this.prepareLabels(messages);
        const { transactions = [], currentBalance = 0 } = this.props.recentTransactions;

        const navigationCards = [
            {
                type: PATHS.myProducer.id,
                title: labels.myProducer,
                path: PATHS.myProducer.path
            },
            {
                type: PATHS.buyEnergy.id,
                title: labels.buyEnergy,
                path: PATHS.buyEnergy.path
            },
            {
                type: PATHS.sellEnergy.id,
                title: labels.sellEnergy,
                path: PATHS.sellEnergy.path
            }
        ];

        return (
            <div className="overview-page">
                <Loader show={this.props.loading} />
                <NavigationCardsPanel
                    navigationCards={navigationCards}
                    onCardClick={route => this.navigateTo(route)}
                    labels={labels}
                />
                <div className="overview-content-container">
                    <RecentTransactions
                        transactions={transactions}
                        currentBalance={currentBalance}
                        labels={labels}
                        onButtonClick={() => this.openWattcoinPage()}
                    />
                </div>
            </div>
        );
    }
}

Overview.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};
Overview.propTypes = {
    loading: PropTypes.bool,
    recentTransactions: PropTypes.object,
    user: PropTypes.object
};
Overview.defaultProps = {
    loading: false,
    recentTransactions: {},
    user: {}
};

export default connect(Overview.mapStateToProps)(Overview);
