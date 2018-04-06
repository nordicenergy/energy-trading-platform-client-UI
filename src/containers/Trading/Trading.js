import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { EnergyAmountGraph, NavigationCardsPanel, WattcoinTable } from '../../components';
import './Trading.css';
import { PATHS } from '../../services/routes';

export class Trading extends React.Component {
    static mapStateToProps(/* state */) {
        return {};
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
            },
            myProducer: {
                id: 'app.navigationCardsPanel.myProducer',
                defaultMessage: 'My Producer'
            },
            sellEnergy: {
                id: 'app.navigationCardsPanel.sellEnergy',
                defaultMessage: 'Sell Energy'
            },
            buyEnergy: {
                id: 'app.navigationCardsPanel.buyEnergy',
                defaultMessage: 'Buy Energy'
            }
        });
    }

    navigateTo(route) {
        this.context.router.history.push(route);
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

        const navigationCards = [
            {
                type: PATHS.myProducer.id,
                title: formatMessage(labels.myProducer),
                path: PATHS.myProducer.path
            },
            {
                type: PATHS.buyEnergy.id,
                title: formatMessage(labels.buyEnergy),
                path: PATHS.buyEnergy.path
            },
            {
                type: PATHS.sellEnergy.id,
                title: formatMessage(labels.sellEnergy),
                path: PATHS.sellEnergy.path
            }
        ];

        const wattcoinProps = {
            labels: {
                caption: 'Wattcoin',
                producer: 'Producer',
                energyType: 'Type of energy',
                total: 'Total',
                trx: 'Transaction',
                sent: 'Sent',
                received: 'Received',
                button: 'More'
            },
            data: {
                producer: 'Peter Producer',
                type: 'Solar panels',
                total: 0.03,
                count: {
                    trx: 5,
                    sent: 3,
                    received: 6
                }
            },
            onMoreClick: f => f
        };

        return (
            <div className="trading-page">
                <h1>{formatMessage(labels.header)}</h1>
                <NavigationCardsPanel
                    onCardClick={route => {
                        this.navigateTo(route);
                    }}
                    navigationCards={navigationCards}
                />
                <WattcoinTable {...wattcoinProps} />
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
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    }),
    intl: PropTypes.object
};

export default connect(Trading.mapStateToProps)(Trading);
