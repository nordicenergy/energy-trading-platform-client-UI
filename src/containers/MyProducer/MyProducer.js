import React from 'react';
import { connect } from 'react-redux';

import './MyProducer.css';
import PropTypes from 'prop-types';

export class MyProducer extends React.Component {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="my-producer-page">
                <h1>My Producer</h1>
            </div>
        );
    }
}

MyProducer.contextTypes = {
    intl: PropTypes.object
};

export default connect(MyProducer.mapStateToProps)(MyProducer);
