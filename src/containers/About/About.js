import React from 'react';
import { connect } from 'react-redux';

import './About.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';

export class About extends AbstractContainer {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="about-page">
                <h1>About Us</h1>
            </div>
        );
    }
}

export default connect(About.mapStateToProps)(About);
