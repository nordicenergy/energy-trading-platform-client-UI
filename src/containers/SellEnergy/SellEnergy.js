import React from 'react';
import { connect } from 'react-redux';

import './SellEnergy.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { PATHS } from '../../services/routes';
import PropTypes from 'prop-types';

export class SellEnergy extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            {
                ...PATHS.trading,
                label: formatMessage(PATHS.trading.label)
            },
            {
                ...PATHS.sellEnergy,
                label: formatMessage(PATHS.sellEnergy.label)
            }
        ];
        super(props, context, breadcrumbs);
    }

    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="sell-energy-page">
                <h1>Sell Energy</h1>
            </div>
        );
    }
}

SellEnergy.contextTypes = {
    intl: PropTypes.object
};

export default connect(SellEnergy.mapStateToProps)(SellEnergy);
