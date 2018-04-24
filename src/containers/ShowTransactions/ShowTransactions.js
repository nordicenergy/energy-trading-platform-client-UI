import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RecentTransactions, Loader } from '../../components';
import { performGetUserData } from '../../action_performers/users';
import { performGetRecentTransactions } from '../../action_performers/transactions';
import { performPushNotification } from '../../action_performers/notifications';
import { PATHS } from '../../services/routes';

import { ShowTransactions as messages } from '../../services/translations/messages';
import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './ShowTransactions.css';

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
    }

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

    render() {
        const labels = this.prepareLabels(messages);
        const { recentTransactions: { transactions = [], currentBalance = 0 } } = this.props;

        return (
            <section className="show-transaction-page">
                <Loader show={this.props.loading} />
                <h1>{labels.header}</h1>
                <section>
                    <RecentTransactions
                        transactions={transactions}
                        currentBalance={currentBalance}
                        labels={labels}
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
