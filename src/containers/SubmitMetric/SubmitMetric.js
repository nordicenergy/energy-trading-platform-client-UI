import React from 'react';
import { connect } from 'react-redux';

import './SubmitMetric.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';

export class SubmitMetric extends AbstractContainer {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="submit-metric-page">
                <h1>Submit Meter Readings</h1>
            </div>
        );
    }
}

export default connect(SubmitMetric.mapStateToProps)(SubmitMetric);
