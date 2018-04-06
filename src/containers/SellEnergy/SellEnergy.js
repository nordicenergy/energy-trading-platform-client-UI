import React from 'react';
import { connect } from 'react-redux';

import './SellEnergy.css';

export class SellEnergy extends React.Component {
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

export default connect(SellEnergy.mapStateToProps)(SellEnergy);
