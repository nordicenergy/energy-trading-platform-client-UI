import React from 'react';
import { connect } from 'react-redux';

import './Service.css';

export class Service extends React.Component {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="service-page">
                <h1>Question&Service</h1>
            </div>
        );
    }
}

export default connect(Service.mapStateToProps)(Service);
