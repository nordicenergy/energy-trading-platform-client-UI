import React from 'react';
import { connect } from 'react-redux';

import './About.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { About as messages } from '../../services/translations/messages';
import PropTypes from 'prop-types';
import { performPushNotification } from '../../action_performers/notifications';

export class About extends AbstractContainer {
    static mapStateToProps(state) {
        return {
            paragraphs: state.App.localization.data.aboutUs,
            error: state.App.localization.error,
            loading: state.App.localization.loading
        };
    }

    componentDidUpdate(prevProps) {
        const { error, loading } = this.props;

        if (!loading && error && error !== prevProps.error) {
            performPushNotification({ message: error.message, type: 'error' });
        }
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
    paragraphs: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object
};

export default connect(About.mapStateToProps)(About);
