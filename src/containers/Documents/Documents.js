import React from 'react';
import { connect } from 'react-redux';

import './Documents.css';

export class Documents extends React.Component {
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
