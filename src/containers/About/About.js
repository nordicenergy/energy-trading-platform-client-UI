import React from 'react';
import { connect } from 'react-redux';

import './About.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { About as messages } from '../../services/translations/messages';
import PropTypes from 'prop-types';

export class About extends AbstractContainer {
    static mapStateToProps(state) {
        return {
            paragraphs: state.App.localization.data.aboutUs
        };
    }

    render() {
        const { formatMessage } = this.context.intl;
        return (
            <div className="about-page">
                <h1>{formatMessage(messages.header)}</h1>
                <div className="about-info-container">
                    {this.props.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
            </div>
        );
    }
}

About.contextTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};

About.propTypes = {
    paragraphs: PropTypes.array
};

export default connect(About.mapStateToProps)(About);
