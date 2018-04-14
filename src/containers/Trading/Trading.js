import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { EnergyAmountGraph, NavigationCardsPanel, WattcoinTable } from '../../components';
import { PATHS } from '../../services/routes';
import { Trading as messages } from '../../services/translations/messages';
import './Trading.css';

export class Trading extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            {
                ...PATHS.trading,
                label: formatMessage(PATHS.trading.label)
            }
        ];
        super(props, context, breadcrumbs);
    }

    static mapStateToProps(/* state */) {
        return {};
    }

    navigateTo(route) {
        this.context.router.history.push(route);
    }

    render() {
        const { formatMessage } = this.context.intl;

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
            amounts: [2000, 2200, 1300, 1600, 1800, 2100, 2000, 2050, 1500, 2050, 2050, 1500, 2300, 2900]
        };

        const navigationCards = [
            {
                type: PATHS.myProducer.id,
                title: formatMessage(messages.myProducer),
                path: PATHS.myProducer.path
            },
            {
                type: PATHS.buyEnergy.id,
                title: formatMessage(messages.buyEnergy),
                path: PATHS.buyEnergy.path
            },
            {
                type: PATHS.sellEnergy.id,
                title: formatMessage(messages.sellEnergy),
                path: PATHS.sellEnergy.path
            }
        ];

        const wattcoinProps = {
            labels: {
                caption: formatMessage(messages.wattcoinTableHeader),
                producer: formatMessage(messages.wattcoinTableProducer),
                energyType: formatMessage(messages.wattcoinTableEnergyType),
                total: formatMessage(messages.wattcoinTableTotal),
                trx: formatMessage(messages.wattcoinTableTrx),
                sent: formatMessage(messages.wattcoinTableSent),
                received: formatMessage(messages.wattcoinTableReceived),
                button: formatMessage(messages.wattcoinTableMore)
            },
            // TODO will receive this data from server-side
            data: {
                producer: 'Peter Producer',
                type: 'Solar panels',
                total: 0.03,
                count: {
                    trx: 5,
                    sent: 3,
                    received: 6
                }
            }
        };

        return (
            <div className="trading-page">
                <h1>{formatMessage(messages.header)}</h1>
                <NavigationCardsPanel
                    onCardClick={route => {
                        this.navigateTo(route);
                    }}
                    navigationCards={navigationCards}
                />
                <WattcoinTable {...wattcoinProps} onMoreClick={() => this.navigateTo(PATHS.wattcoin.path)} />
                <EnergyAmountGraph title={formatMessage(messages.graphTitle)} subtitle="Peter Producer" data={data} />
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
