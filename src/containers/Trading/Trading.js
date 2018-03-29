import React from 'react';
import { connect } from 'react-redux';

import './Trading.css';

export class Trading extends React.Component {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="trading-page">
                <h1>Trading</h1>
            </div>
        );
    }
}

export default connect(Trading.mapStateToProps)(Trading);
