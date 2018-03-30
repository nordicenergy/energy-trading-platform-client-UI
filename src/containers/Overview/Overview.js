import React from 'react';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { NavigationCard } from '../../components';

import './Overview.css';
import PropTypes from "prop-types";

export class Overview extends React.Component {
    static mapStateToProps(/* state */) {
        return {};
    }

    defineLabels() {
        return defineMessages({
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
            }
        });
    }

    render() {
        const { formatMessage } = this.context.intl;
        const labels = this.defineLabels();
        return (
            <div className="overview-page">
                <h1>Overview</h1>
                <nav className="overview-navigation-cards">
                    <NavigationCard type="myProducer" title={formatMessage(labels.myProducer)} onCardClickHandler={f => f} />
                    <NavigationCard type="buyEnergy" title={formatMessage(labels.buyEnergy)} onCardClickHandler={f => f} />
                    <NavigationCard type="sellEnergy" title={formatMessage(labels.sellEnergy)} onCardClickHandler={f => f} />
                </nav>
            </div>
        );
    }
}

Overview.contextTypes = {
    intl: PropTypes.object
};

export default connect(Overview.mapStateToProps)(Overview);
