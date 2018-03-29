import React from 'react';
import { connect } from 'react-redux';

import './Profile.css';

export class Profile extends React.Component {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="profile-page">
                <h1>Profile</h1>
            </div>
        );
    }
}

export default connect(Profile.mapStateToProps)(Profile);
