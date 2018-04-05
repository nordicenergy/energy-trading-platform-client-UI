import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import Validator from 'async-validator';
import { LoginForm, Logo, Illustration, Loader } from '../../components';
import { performLogin } from '../../action_performers/users';
import { performPushNotification } from '../../action_performers/notifications';
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
const errorMessages = defineMessages({
    emptyUsername: {
        id: 'app.loginPage.errors.emptyUsername',
        defaultMessage: 'Enter your username.'
    },
    emptyPassword: {
        id: 'app.loginPage.errors.emptyPassword',
        defaultMessage: 'Enter your password.'
    }
});

export class Login extends Component {
    static mapStateToProps(state) {
        return {
            loading: state.Users.login.loading,
            login: state.Users.login.data,
            error: state.Users.login.error
        };
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: {}
        };
    }

    componentWillReceiveProps({ loading, login, error }) {
        const loaded = this.props.loading !== loading && !loading;

        if (loaded && login.authenticationToken) {
            this.handleSuccessfulAuthentication();
        }

        if (error && error.message) {
            performPushNotification({
                type: 'error',
                message: error.message
            });
        }
    }

    handleSuccessfulAuthentication() {
        const { history, route } = this.context.router;
        const matches = route.location.search.match(/next=([^&]*)/);
        const nextUrl = matches ? decodeURIComponent(matches[1]) : '/';

        history.push(nextUrl);
    }

    prepareLabels() {
        const { formatMessage } = this.context.intl;
        const entries = Object.keys(messages).map(key => [key, messages[key]]);

        return entries.reduce((labels, [labelName, messageDescriptor]) => {
            return {
                ...labels,
                [labelName]: formatMessage(messageDescriptor)
            };
        }, {});
    }

    prepareValidator() {
        const { formatMessage } = this.context.intl;
        const validationSchema = {
            username: {
                type: 'string',
                required: true,
                message: formatMessage(errorMessages.emptyUsername)
            },
            password: {
                type: 'string',
                required: true,
                message: formatMessage(errorMessages.emptyPassword)
            }
        };

        return new Validator(validationSchema);
    }

    sendCredentials(credentials) {
        const validator = this.prepareValidator();

        validator.validate(credentials, errors => {
            if (errors) {
                this.setState({
                    errors: errors.reduce(
                        (errorsState, { field, message }) => ({
                            ...errorsState,
                            [field]: message
                        }),
                        {}
                    )
                });
            } else {
                this.setState({ errors: {} });
                performLogin(credentials);
            }
        });
    }

    openResetPasswordPage() {
        const { history } = this.context.router;
        history.push('/restore-password');
    }

    render() {
        const { loading } = this.props;
        const { errors } = this.state;

        return (
            <div className="login-container">
                <div className="login-container-layout">
                    <Loader show={loading} />
                    <div className="login-container-hero">
                        <Illustration className="illustration--login" />
                    </div>
                    <div className="login-container-form">
                        <Logo className="logo--login" />
                        <LoginForm
                            labels={this.prepareLabels()}
                            errors={errors}
                            onForgotPasswordLinkClick={() => {
                                this.openResetPasswordPage();
                            }}
                            onSubmit={credentials => {
                                this.sendCredentials(credentials);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        route: PropTypes.shape({
            location: PropTypes.object.isRequired
        }).isRequired
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};
Login.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.shape({}),
    error: PropTypes.object
};
Login.defaultProps = {
    loading: false,
    data: {},
    error: null
};

export default connect(Login.mapStateToProps)(Login);
