import React from 'react';
import { connect } from 'react-redux';

import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './MyDocuments.css';

export class MyDocuments extends AbstractContainer {
    render() {
        return (
            <div>
                <h1>MyDocuments page</h1>
            </div>
        );
    }
}

export default connect(MyDocuments.mapStateToProps)(MyDocuments);
