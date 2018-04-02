import React from 'react';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { NavigationCard, RecentTransactions } from '../../components';

import './Overview.css';
import PropTypes from 'prop-types';

const transactions = [
    {
        id: '1',
        date: 'Mar 14, 2018',
        name: 'Bought 23 kWh Alice',
        amount: '0,81€'
    },
    {
        id: '2',
        date: 'Mar 14, 2018',
        name: 'Monthly invoice',
        amount: '0,81€'
    },
    {
        id: '3',
        date: 'Mar 14, 2018',
        name: 'Bought 23 kWh from Peter',
        amount: '0,81€'
    },
]; // TODO: remove

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
    static mapStateToProps(/* state */) {
        return {};
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
                    <RecentTransactions transactions={transactions} currentBalance={currentBalanceData} labels={labels}/>
                </div>
            </div>
        );
    }
}

Overview.contextTypes = {
    intl: PropTypes.object
};

export default connect(Overview.mapStateToProps)(Overview);
