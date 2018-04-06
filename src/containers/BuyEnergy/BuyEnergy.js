import React from 'react';
import { connect } from 'react-redux';

import './BuyEnergy.css';

export class BuyEnergy extends React.Component {
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

export default connect(BuyEnergy.mapStateToProps)(BuyEnergy);
