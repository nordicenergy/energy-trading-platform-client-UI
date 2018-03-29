import React from 'react';
import { connect } from 'react-redux';

import './Overview.css';

export class Overview extends React.Component {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="overview-page">
                <h1>Overview</h1>
            </div>
        );
    }
}

export default connect(Overview.mapStateToProps)(Overview);
