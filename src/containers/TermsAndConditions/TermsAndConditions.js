import React from 'react';
import { connect } from 'react-redux';

import './TermsAndConditions.css';
import { TermsAndConditions as messages } from '../../services/translations/messages';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import PropTypes from 'prop-types';

export class TermsAndConditions extends AbstractContainer {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        const { formatMessage } = this.context.intl;
        return (
            <div className="terms-and-conditions-page">
                <h1>{formatMessage(messages.header)}</h1>
            </div>
        );
    }
}

TermsAndConditions.contextTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};

export default connect(TermsAndConditions.mapStateToProps)(TermsAndConditions);
