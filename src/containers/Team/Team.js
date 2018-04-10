import React from 'react';
import { connect } from 'react-redux';

import './Team.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';

export class Team extends AbstractContainer {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="team-page">
                <h1>Our Team</h1>
            </div>
        );
    }
}

export default connect(Team.mapStateToProps)(Team);
