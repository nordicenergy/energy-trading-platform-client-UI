import React from 'react';
import { connect } from 'react-redux';

import './About.css';

export class About extends React.Component {
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
