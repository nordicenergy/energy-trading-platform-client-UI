import React from 'react';
import { connect } from 'react-redux';

import './Trading.css';
import PropTypes from 'prop-types';
import TradingContainer from './TradingContainer';

export class Trading extends TradingContainer {
    static mapStateToProps(state) {
        return {
            breadCrumbs: state.App.breadCrumbs.data
        };
    }

    render() {
        return (
            <div className="trading-page">
                <h1>Trading</h1>
            </div>
        );
    }
}

Trading.contextTypes = {
    intl: PropTypes.object
};

export default connect(Trading.mapStateToProps)(Trading);
