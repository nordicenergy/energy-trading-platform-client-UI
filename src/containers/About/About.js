import React from 'react';
import { connect } from 'react-redux';

import './About.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { Loader } from '../../components';
import { About as messages } from '../../services/translations/messages';
import { performGetAboutUsInfo } from '../../action_performers/aboutUs';
import { performPushNotification } from '../../action_performers/notifications';
import PropTypes from 'prop-types';

export class About extends AbstractContainer {
    static mapStateToProps(state) {
        return {
            paragraphs: state.AboutUs.data,
            loading: state.AboutUs.loading,
            error: state.AboutUs.error,
            locale: state.App.locale
        };
    }

    componentDidMount() {
        this.fetchInfo();
    }

    componentDidUpdate({ locale: prevLocale, erorr: oldError }) {
        const { locale, loading, error } = this.props;
        if (locale !== prevLocale) {
            this.fetchInfo();
        }

        if (!loading && error && error !== oldError) {
            performPushNotification({ message: error.message, type: 'error' });
        }
    }

    fetchInfo() {
        const { locale } = this.props;
        if (locale) {
            performGetAboutUsInfo(locale);
        }
    }

    render() {
        const { formatMessage } = this.context.intl;
        return (
            <div className="about-page">
                <Loader show={this.props.loading} />
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

export default connect(About.mapStateToProps)(About);
