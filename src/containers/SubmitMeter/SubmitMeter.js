import React from 'react';
import { connect } from 'react-redux';

import './SubmitMeter.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';

export class SubmitMeter extends AbstractContainer {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="submit-meter-page">
                <h1>Submit Meter Readings</h1>
            </div>
        );
    }
}

export default connect(SubmitMeter.mapStateToProps)(SubmitMeter);
