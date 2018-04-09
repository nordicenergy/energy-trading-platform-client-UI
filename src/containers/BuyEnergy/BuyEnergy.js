import React from 'react';
import { connect } from 'react-redux';

import './BuyEnergy.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { PATHS } from '../../services/routes';
import PropTypes from 'prop-types';

export class BuyEnergy extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            {
                ...PATHS.trading,
                label: formatMessage(PATHS.trading.label)
            },
            {
                ...PATHS.buyEnergy,
                label: formatMessage(PATHS.buyEnergy.label)
            }
        ];
        super(props, context, breadcrumbs);
    }

    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="buy-energy-page">
                <h1>Buy Energy</h1>
            </div>
        );
    }
}

BuyEnergy.contextTypes = {
    intl: PropTypes.object
};

export default connect(BuyEnergy.mapStateToProps)(BuyEnergy);
