import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';
import Button from '../Button';
import './LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChange(event) {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { onSubmit } = this.props;
        onSubmit(this.state);
    }

    handleForgotPasswordLinkClick(event) {
        event.preventDefault();
        this.props.onForgotPasswordLinkClick();
    }

    render() {
        const { labels } = this.props;

        return (
            <form
                className="login-form"
                onSubmit={event => this.handleSubmit(event)}
            >
                <TextField
                    className="username-field"
                    darkMode
                    label={labels.usernameField}
                    type="text"
                    name="username"
                    onChange={event => this.handleChange(event)}
                />
                <TextField
                    className="password-field"
                    darkMode
                    label={labels.passwordField}
                    type="password"
                    name="password"
                    helperText={
                        <a
                            className="reset-password-link"
                            href="/reset-password"
                            onClick={event => {
                                this.handleForgotPasswordLinkClick(event);
                            }}
                        >
                            {labels.forgotPasswordLink}
                        </a>
                    }
                    onChange={event => this.handleChange(event)}
                />
                <Button type="success">{labels.loginButton}</Button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    labels: PropTypes.shape({
        usernameField: PropTypes.string,
        passwordField: PropTypes.string,
        resetPasswordLink: PropTypes.string,
        loginButton: PropTypes.string
    }),
    onForgotPasswordLinkClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
