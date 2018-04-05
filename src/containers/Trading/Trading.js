import React from 'react';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { EnergyAmountGraph } from '../../components';
import './Trading.css';
import PropTypes from 'prop-types';
import { TradingContainer } from './TradingContainer';

export class Trading extends TradingContainer {
    static mapStateToProps(state) {
        return {
            breadCrumbs: state.App.breadCrumbs.data
        };
    }

    defineLabels() {
        return defineMessages({
            header: {
                id: 'app.tradingPage.header',
                defaultMessage: 'Trading'
            },
            graphTitle: {
                id: 'app.tradingPage.graphTitle',
                defaultMessage: 'Amount of energy'
            }
        });
    }

    render() {
        const { formatMessage } = this.context.intl;
        const labels = this.defineLabels();

        // TODO will receive this data from server-side
        const data = {
            dates: [
                '2018-07-30',
                '2018-08-01',
                '2018-08-07',
                '2018-08-09',
                '2018-08-10',
                '2018-08-13',
                '2018-08-19',
                '2018-08-24',
                '2018-08-28',
                '2018-09-01',
                '2018-09-10',
                '2018-09-21',
                '2018-10-12',
                '2018-10-13'
            ],
            amounts: [
                2000,
                2200,
                1300,
                1600,
                1800,
                2100,
                2000,
                2050,
                1500,
                2050,
                2050,
                1500,
                2300,
                2900
            ]
        };

        return (
            <div className="trading-page">
                <h1>{formatMessage(labels.header)}</h1>
                <EnergyAmountGraph
                    title={formatMessage(labels.graphTitle)}
                    subtitle="Peter Producer"
                    data={data}
                />
            </div>
        );
    }
}

Trading.contextTypes = {
    intl: PropTypes.object
};

export default connect(Trading.mapStateToProps)(Trading);
