import React from 'react';
import { connect } from 'react-redux';

import './Service.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';

export class Service extends AbstractContainer {
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
