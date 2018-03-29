import React from 'react';
import { connect } from 'react-redux';

import './SubmitMeter.css';

export class SubmitMeter extends React.Component {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="submit-meter-page">
                <h1>Submit Meter</h1>
            </div>
        );
    }
}

export default connect(SubmitMeter.mapStateToProps)(SubmitMeter);
