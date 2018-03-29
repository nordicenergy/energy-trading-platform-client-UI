import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { LoginForm, Logo, Illustration } from '../../components';
import { performLogin } from '../../action_performers/users';
import './Login.css';

const messages = defineMessages({
    usernameField: {
        id: 'app.loginPage.usernameField',
        defaultMessage: 'Username'
    },
    passwordField: {
        id: 'app.loginPage.passwordField',
        defaultMessage: 'Password'
    },
    forgotPasswordLink: {
        id: 'app.loginPage.forgotPasswordLink',
        defaultMessage: 'Forgot your password?'
    },
    loginButton: {
        id: 'app.loginPage.loginButton',
        defaultMessage: 'Login'
    }
});

export class Login extends React.Component {
    static mapStateToProps(state) {
        return {
            loading: state.Users.login.loading,
            login: state.Users.login.data
        };
    }

    sendCredentials(user, password) {
        const { history } = this.props;

        performLogin(user, password);
        history.push('/');

    }

    openResetPasswordPage() {
        const { history } = this.props;
        history.push('/reset-password');
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-container-layout">
                    <div className="login-container-hero">
                        <Logo className="logo--login" />
                        <Illustration className="illustration--login" />
                    </div>
                    <div className="login-container-form">
                        <LoginForm
                            labels={messages}
                            onForgotPasswordLinkClick={() => {
                                this.openResetPasswordPage();
                            }}
                            onSubmit={({ username, password }) => {
                                this.sendCredentials(username, password);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    loading: PropTypes.bool,
    data: PropTypes.shape({})
};
LoginForm.defaultProps = {
    loading: false,
    data: {}
};

export default connect(Login.mapStateToProps)(Login);
