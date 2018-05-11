import React from 'react';
import { connect } from 'react-redux';

import './Documents.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';

export class Documents extends AbstractContainer {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="documents-page">
                <h1>Documents</h1>
            </div>
        );
    }
}

export default connect(Documents.mapStateToProps)(Documents);
