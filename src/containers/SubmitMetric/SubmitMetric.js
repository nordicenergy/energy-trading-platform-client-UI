import React from 'react';
import { connect } from 'react-redux';

import './SubmitMetric.css';

export class SubmitMetric extends React.Component {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="submit-metric-page">
                <h1>Submit Metric</h1>
            </div>
        );
    }
}

export default connect(SubmitMetric.mapStateToProps)(SubmitMetric);
