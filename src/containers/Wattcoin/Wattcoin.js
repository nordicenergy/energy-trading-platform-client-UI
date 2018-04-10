import React from 'react';
import { connect } from 'react-redux';

import './Wattcoin.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { PATHS } from '../../services/routes';
import PropTypes from 'prop-types';

export class Wattcoin extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            {
                ...PATHS.trading,
                label: formatMessage(PATHS.trading.label)
            },
            {
                ...PATHS.wattcoin,
                label: formatMessage(PATHS.wattcoin.label)
            }
        ];
        super(props, context, breadcrumbs);
    }

    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="wattcoin-page">
                <h1>Wattcoin</h1>
            </div>
        );
    }
}

Wattcoin.contextTypes = {
    intl: PropTypes.object
};

export default connect(Wattcoin.mapStateToProps)(Wattcoin);
