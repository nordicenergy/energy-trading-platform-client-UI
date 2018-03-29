import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/fontawesome-free-solid';
import TextField from '../TextField';
import Button from '../Button';
import './ResetPasswordForm.css';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '' };
    }

    handleChange(event) {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { onSubmit } = this.props;
        const { email } = this.state;

        onSubmit(email);
    }

    handleLoginLinkClick(event) {
        event.preventDefault();

        const { onLoginLinkClick } = this.props;
        onLoginLinkClick();
    }

    render() {
        const { labels } = this.props;
        const { email } = this.state;

        return (
            <div className="reset-password-form">
                <h3 className="reset-password-form-title">
                    {labels.formTitle.defaultMessage}
                </h3>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <TextField
                        className="email-field"
                        label={labels.emailField.defaultMessage}
                        type="email"
                        name="email"
                        value={email}
                        onChange={event => this.handleChange(event)}
                    />
                    <div className="reset-password-form-actions">
                        <Button>{labels.sendButton.defaultMessage}</Button>
                        <a
                            className="login-link"
                            href="/login"
                            onClick={event => this.handleLoginLinkClick(event)}
                        >
                            <FontAwesomeIcon
                                className="login-link-icon"
                                icon={faChevronLeft}
                            />
                            <span className="login-link-text">
                                {labels.loginLink.defaultMessage}
                            </span>
                        </a>
                    </div>
                </form>
            </div>
        );
    }
}

const MessageDescriptor = PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string
});

ResetPasswordForm.propTypes = {
    labels: PropTypes.shape({
        formTitle: MessageDescriptor,
        emailField: MessageDescriptor,
        sendButton: MessageDescriptor,
        loginLink: MessageDescriptor
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onLoginLinkClick: PropTypes.func.isRequired
};

export default ResetPasswordForm;
