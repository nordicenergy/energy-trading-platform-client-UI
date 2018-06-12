import React from 'react';
import { connect } from 'react-redux';

import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './Documents.css';

export class Documents extends AbstractContainer {
    render() {
        return (
            <div>
                <h1>Documents page</h1>
            </div>
        );
    }
}

export default connect(Documents.mapStateToProps)(Documents);
