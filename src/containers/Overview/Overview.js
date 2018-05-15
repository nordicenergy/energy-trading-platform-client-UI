import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationCardsPanel, RecentTransactions } from '../../components';
import { performGetRecentTransactions } from '../../action_performers/transactions';
import { performGetUserData } from '../../action_performers/users';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import { PATHS } from '../../services/routes';
import { Overview as messages } from '../../services/translations/messages';
import { formatFloat } from '../../services/formatter';

import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './Overview.css';
import { convertTransactionStatus } from '../../services/translations/enums';

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

        performSetupLoaderVisibility(loading);
    }

    navigateTo(route) {
        this.context.router.history.push(route);
    }

    openTransactionsPage() {
        this.navigateTo(PATHS.showTransactions.path);
    }

    render() {
        const { formatMessage } = this.context.intl;
        const labels = this.prepareLabels(messages);
        const { recentTransactions: { transactions = [], currentBalance = 0 }, loading } = this.props;
        const formattedTransactions = transactions.map(tx => ({
            ...tx,
            description: `${labels.recentTransactionsDescriptionBought} ${formatFloat(tx.energyAmount)} kWh ${
                labels.recentTransactionsDescriptionFrom
            } "${tx.producerName}"`,
            details: {
                ...tx.details,
                status: formatMessage(convertTransactionStatus(tx.details && tx.details.status))
            }
        }));
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
            <section className="overview-page" aria-busy={loading}>
                <NavigationCardsPanel
                    navigationCards={navigationCards}
                    onCardClick={route => this.navigateTo(route)}
                    labels={labels}
                />
                <div className="overview-content-container">
                    <RecentTransactions
                        transactions={formattedTransactions}
                        currentBalance={currentBalance}
                        labels={labels}
                        onButtonClick={() => this.openTransactionsPage()}
                    />
                </div>
            </section>
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
    user: PropTypes.object,
    error: PropTypes.object
};
Overview.defaultProps = {
    loading: false,
    recentTransactions: {},
    user: {},
    error: null
};

export default connect(Overview.mapStateToProps)(Overview);
