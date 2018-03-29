import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { RestorePasswordForm, Logo, Illustration } from '../../components';
import './RestorePassword.css';

const messages = defineMessages({
    formTitle: {
        id: 'app.restorePasswordPage.formTitle',
        defaultMessage: 'Restore password'
    },
    emailField: {
        id: 'app.restorePasswordPage.emailField',
        defaultMessage: 'Enter Your Email'
    },
    sendButton: {
        id: 'app.restorePasswordPage.sendButton',
        defaultMessage: 'Send'
    },
    loginLink: {
        id: 'app.restorePasswordPage.loginLink',
        defaultMessage: 'Login'
    }
});

export class RestorePassword extends Component {
    sendEmail(email) {
        this.openLoginPage();
    }

    openLoginPage() {
        const { history } = this.props;
        history.push('/login');
    }

    render() {
        return (
            <div className="restore-password-container">
                <div className="restore-password-container-layout">
                    <div className="restore-password-container-hero">
                        <Logo className="logo--login" />
                        <Illustration className="illustration--login" />
                    </div>
                    <div className="restore-password-container-form">
                        <RestorePasswordForm
                            labels={messages}
                            onSubmit={email => this.sendEmail(email)}
                            onLoginLinkClick={() => this.openLoginPage()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

RestorePassword.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    loading: PropTypes.bool,
    data: PropTypes.shape({})
};
RestorePassword.defaultProps = {
    loading: false,
    data: {}
};

export default RestorePassword;
