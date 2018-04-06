import React from 'react';
import { connect } from 'react-redux';

import './Wattcoin.css';

export class Wattcoin extends React.Component {
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

export default connect(Wattcoin.mapStateToProps)(Wattcoin);
