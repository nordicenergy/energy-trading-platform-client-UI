import React from 'react';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { NavigationCard, RecentTransactions } from '../../components';
import { performGetRecentTransactions } from '../../action_performers/transactions';
import './Overview.css';
import PropTypes from 'prop-types';

const currentBalanceData = {
    date: 'Mar 14, 2018',
    amount: '4,03€'
}; // TODO: remove

const messages = defineMessages({
    myProducer: {
        id: 'app.overviewPage.myProducer',
        defaultMessage: 'My Producer'
    },
    sellEnergy: {
        id: 'app.overviewPage.sellEnergy',
        defaultMessage: 'Sell Energy'
    },
    buyEnergy: {
        id: 'app.overviewPage.buyEnergy',
        defaultMessage: 'Buy Energy'
    },
    recentTransactionsTitle: {
        id: 'app.overviewPage.recentTransactionsTitle',
        defaultMessage: 'Most Recent Transactions'
    },
    recentTransactionsHeaderDate: {
        id: 'app.overviewPage.recentTransactionsHeaderDate',
        defaultMessage: 'Date'
    },
    recentTransactionsHeaderTransaction: {
        id: 'app.overviewPage.recentTransactionsHeaderTransaction',
        defaultMessage: 'Transactions'
    },
    recentTransactionsHeaderAmount: {
        id: 'app.overviewPage.recentTransactionsHeaderAmount',
        defaultMessage: 'Amount'
    },
    recentTransactionsCurrentBalance: {
        id: 'app.overviewPage.recentTransactionsCurrentBalance',
        defaultMessage: 'Current Balance'
    },
    recentTransactionsMore: {
        id: 'app.overviewPage.recentTransactionsMore',
        defaultMessage: 'More'
    }
});

export class Overview extends React.Component {
    static mapStateToProps(state) {
        return {
            loading: state.Transactions.recentTransactions.loading,
            recentTransactions: state.Transactions.recentTransactions.data
        };
    }

    componentDidMount() {
        performGetRecentTransactions();
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

    openWattcoinPage() {
        // const { history } = this.context.router;
        // history.push('/trading/wattcoin');
    }

    render() {
        const labels = this.prepareLabels(messages);
        return (
            <div className="overview-page">
                <nav className="overview-navigation-cards">
                    <NavigationCard
                        type="myProducer"
                        title={labels.myProducer}
                        onCardClickHandler={f => f}
                    />
                    <NavigationCard
                        type="buyEnergy"
                        title={labels.buyEnergy}
                        onCardClickHandler={f => f}
                    />
                    <NavigationCard
                        type="sellEnergy"
                        title={labels.sellEnergy}
                        onCardClickHandler={f => f}
                    />
                </nav>
                <div className="overview-content-container">
                    <RecentTransactions
                        transactions={this.props.recentTransactions}
                        currentBalance={currentBalanceData}
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
    data: PropTypes.array
};
Overview.defaultProps = {
    loading: false,
    data: []
};

export default connect(Overview.mapStateToProps)(Overview);
