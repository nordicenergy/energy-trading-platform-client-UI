import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CONTRACT_STATUSES } from '../../constants';
import { Alert, NavigationCardsPanel, EmptyRecentTransactions, RecentTransactions } from '../../components';
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

const UPDATE_INTERVAL = 1000 * 60; // 1m

export class Overview extends AbstractContainer {
    static mapStateToProps(state) {
        return {
            loading: state.Users.profile.loading,
            recentTransactions: state.Transactions.recentTransactions.data,
            user: state.Users.profile.data.user,
            error: state.Transactions.recentTransactions.error || state.Users.profile.error
        };
    }

    constructor(...args) {
        super(...args);
        this.intervalId = null;
    }

    componentDidMount() {
        const { formatMessage } = this.context.intl;
        this.setupBreadcrumbs([
            {
                ...PATHS.overview,
                label: formatMessage(PATHS.overview.label)
            }
        ]);
        performGetUserData();
    }

    componentDidUpdate(prevProps) {
        const { formatMessage } = this.context.intl;
        const { user, loading, error } = this.props;

        if (user !== prevProps.user) {
            this.startTransactionsUpdating();
        }

        if (!loading && error && error !== prevProps.error) {
            performPushNotification({ message: formatMessage(messages.loadingErrorMessage), type: 'error' });
        }

        if (prevProps.loading !== loading) {
            performSetupLoaderVisibility(loading);
        }
    }

    componentWillUnmount() {
        this.stopTransactionsUpdating();
    }

    startTransactionsUpdating() {
        const { user } = this.props;

        if (!this.intervalId) {
            performGetRecentTransactions(user.id);
        }

        this.stopTransactionsUpdating();
        this.intervalId = setInterval(() => {
            performGetRecentTransactions(user.id);
        }, UPDATE_INTERVAL);
    }

    stopTransactionsUpdating() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    navigateTo(route) {
        this.context.router.history.push(route);
    }

    openTransactionsPage() {
        this.navigateTo(PATHS.showTransactions.path);
    }

    renderAlert(labels) {
        const user = this.props.user;

        if (!user.statusCode || user.statusCode === CONTRACT_STATUSES.active) {
            return null;
        }

        if (user.statusCode === CONTRACT_STATUSES.waiting) {
            return <Alert className="alert--overview">{labels.contractPendingStatusCode}</Alert>;
        }

        return <Alert className="alert--overview">{labels.contractOthersStatusCodes}</Alert>;
    }

    render() {
        const { user, recentTransactions: { transactions = [], currentBalance = 0 }, loading } = this.props;
        const { formatMessage } = this.context.intl;
        const labels = this.prepareLabels(messages, { statusCodeTitle: user.statusCodeTitle });
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
                path: PATHS.myProducer.path,
                disabled: user.statusCode !== CONTRACT_STATUSES.active
            },
            {
                type: PATHS.buyEnergy.id,
                title: labels.buyEnergy,
                path: PATHS.buyEnergy.path,
                disabled: user.statusCode !== CONTRACT_STATUSES.active
            },
            {
                type: PATHS.sellEnergy.id,
                title: labels.sellEnergy,
                path: PATHS.sellEnergy.path,
                disabled: true
            }
        ];

        return (
            <section className="overview-page" aria-busy={loading}>
                {this.renderAlert(labels)}
                <NavigationCardsPanel
                    navigationCards={navigationCards}
                    onCardClick={route => this.navigateTo(route)}
                    labels={labels}
                />
                <div className="overview-content-container">
                    {user.statusCode === CONTRACT_STATUSES.active ? (
                        <RecentTransactions
                            transactions={formattedTransactions}
                            currentBalance={currentBalance}
                            labels={labels}
                            onButtonClick={() => this.openTransactionsPage()}
                        />
                    ) : (
                        <EmptyRecentTransactions
                            title={labels.recentTransactionsTitle}
                            message={labels.recentTransactionsEmptyMessage}
                        />
                    )}
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
