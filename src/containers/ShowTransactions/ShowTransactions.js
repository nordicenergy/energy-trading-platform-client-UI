import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RecentTransactions, BackLink } from '../../components';
import { performGetUserData } from '../../action_performers/users';
import { performGetRecentTransactions } from '../../action_performers/transactions';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import { PATHS } from '../../services/routes';

import { ShowTransactions as messages } from '../../services/translations/messages';
import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './ShowTransactions.css';
import { formatFloat } from '../../services/formatter';

export class ShowTransactions extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            {
                ...PATHS.overview,
                label: formatMessage(PATHS.overview.label)
            },
            {
                ...PATHS.showTransactions,
                label: formatMessage(PATHS.showTransactions.label)
            }
        ];
        super(props, context, breadcrumbs);

        this.state = { page: 0 };
    }

    static mapStateToProps(state) {
        const { data: txData } = state.Transactions.recentTransactions;

        return {
            loading: state.Users.profile.loading,
            transactionsLoading: state.Transactions.recentTransactions.loading,
            hasNextTransactions: txData.numberOfTransactions > txData.transactions.length,
            recentTransactions: state.Transactions.recentTransactions.data,
            user: state.Users.profile.data.user,
            error: state.Transactions.recentTransactions.error || state.Users.profile.error
        };
    }

    componentDidMount() {
        performGetUserData();

        const loadCondition = () => {
            const { hasNextTransactions, transactionsLoading } = this.props;
            return hasNextTransactions && !transactionsLoading;
        };
        const loadCallback = () => {
            this.setState(state => ({
                page: state.page + 1
            }));
        };
        this.setupScrollHandler(loadCondition, loadCallback);
    }

    componentDidUpdate(prevProps, prevState) {
        const { user, loading, error } = this.props;

        if (user !== prevProps.user || prevState.page !== this.state.page) {
            performGetRecentTransactions(this.props.user.id, this.state.page);
        }

        if (!loading && error && error !== prevProps.error) {
            performPushNotification({ message: error.message, type: 'error' });
        }

        performSetupLoaderVisibility(loading);
    }

    componentWillUnmount() {
        this.removeScrollHandler();
        this.scrollToTop();
    }

    backToOverviewPage(event) {
        event.preventDefault();
        const { history } = this.context.router;
        history.push(PATHS.overview.path);
    }

    render() {
        const labels = this.prepareLabels(messages);
        const {
            recentTransactions: { transactions = [], currentBalance = 0 },
            transactionsLoading,
            loading
        } = this.props;
        const formattedTransactions = transactions.map(tx => ({
            ...tx,
            description: `${labels.recentTransactionsDescriptionBought} ${formatFloat(tx.energyAmount)} kWh ${
                labels.recentTransactionsDescriptionFrom
            } "${tx.producerName}"`
        }));

        return (
            <section className="show-transaction-page" aria-busy={loading}>
                <h1>
                    <BackLink onClick={event => this.backToOverviewPage(event)} />
                    <span>{labels.header}</span>
                </h1>
                <section>
                    <RecentTransactions
                        transactions={formattedTransactions}
                        currentBalance={currentBalance}
                        labels={labels}
                        loading={transactionsLoading}
                        pagination
                    />
                </section>
            </section>
        );
    }
}

ShowTransactions.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};
ShowTransactions.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    recentTransactions: PropTypes.object,
    user: PropTypes.object
};
ShowTransactions.defaultProps = {
    loading: false,
    recentTransactions: {},
    user: {},
    error: null
};

export default connect(ShowTransactions.mapStateToProps)(ShowTransactions);
