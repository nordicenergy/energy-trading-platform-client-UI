import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'async-validator';
import { RestorePasswordForm, Logo, Illustration } from '../../components';
import { RestorePassword as messages } from '../../services/translations/messages';

import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './RestorePassword.css';

export class RestorePassword extends AbstractContainer {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: {}
        };
    }

    prepareValidator() {
        const { formatMessage } = this.context.intl;
        const validationSchema = {
            email: [
                {
                    required: true,
                    message: formatMessage(messages.emptyEmailError)
                },
                {
                    type: 'email',
                    message: formatMessage(messages.invalidEmailError)
                }
            ]
        };

        return new Validator(validationSchema);
    }

    sendEmail(email) {
        const validator = this.prepareValidator();

        validator.validate({ email }, errors => {
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
                this.openLoginPage();
            }
        });
    }

    openLoginPage() {
        const { history } = this.context.router;
        history.push('/login');
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="restore-password-container">
                <div className="restore-password-container-layout">
                    <div className="restore-password-container-hero">
                        <Illustration className="illustration--restore-password" />
                    </div>
                    <div className="restore-password-container-form">
                        <Logo className="logo--restore-password" />
                        <RestorePasswordForm
                            labels={this.prepareLabels(messages)}
                            errors={errors}
                            onSubmit={email => this.sendEmail(email)}
                            onLoginLinkClick={() => this.openLoginPage()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

RestorePassword.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    })
};
RestorePassword.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.shape({})
};
RestorePassword.defaultProps = {
    loading: false,
    data: {}
};

export default RestorePassword;
