import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import AbstractForm from './AbstractForm';
import Wizard from '../Wizard';
import TextField from '../TextField';
import Validator from 'async-validator';

class AuthInformationForm extends AbstractForm {
    prepareValidator(field) {
        const { labels } = this.props;
        const validationScheme = {
            password: [
                { required: true, message: labels.errors.passwordRequired },
                { min: 8, message: labels.errors.passwordMinLength },
                { pattern: /[a-z]/i, message: labels.errors.passwordLetterPattern },
                { pattern: /[\d]/i, message: labels.errors.passwordDigitPattern }
            ],
            passwordConfirmation: [
                { required: true, message: labels.errors.passwordConfirmationRequired },
                {
                    validator(rule, value, done, source) {
                        const errors = [];

                        if (value !== source.password) {
                            errors.push(new Error(labels.errors.passwordConfirmationValidator));
                        }

                        done(errors);
                    }
                }
            ]
        };

        if (field) {
            return new Validator(pick(validationScheme, field));
        }

        return new Validator(validationScheme);
    }

    render() {
        const { formData, labels, labels: { fields }, onCancel } = this.props;
        const { errors } = this.state;

        return (
            <Wizard.Content
                className="wizard-content--with-shadow"
                title={labels.title}
                labels={{
                    previousButton: labels.cancel,
                    nextButton: labels.submit
                }}
                onPreviousButtonClick={onCancel}
                onNextButtonClick={this.handleSubmit}
            >
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        className="registration-form-field"
                        required
                        label={fields.username}
                        name="username"
                        disabled
                        value={formData.username}
                        error={errors.username}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className="registration-form-field"
                        required
                        label={fields.password}
                        type="password"
                        name="password"
                        value={formData.password}
                        error={errors.password}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className="registration-form-field"
                        required
                        label={fields.passwordConfirmation}
                        type="password"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        error={errors.passwordConfirmation}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                    <input type="submit" hidden aria-hidden />
                </form>
            </Wizard.Content>
        );
    }
}

AuthInformationForm.propTypes = {
    ...AbstractForm.propTypes,
    formData: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
        passwordConfirmation: PropTypes.string
    }),
    labels: PropTypes.shape({
        title: PropTypes.string,
        submit: PropTypes.string,
        cancel: PropTypes.string,
        fields: PropTypes.shape({
            username: PropTypes.string,
            password: PropTypes.string,
            passwordConfirmation: PropTypes.string
        }),
        errors: PropTypes.shape({
            passwordRequired: PropTypes.string,
            passwordMinLength: PropTypes.string,
            passwordLetterPattern: PropTypes.string,
            passwordDigitPattern: PropTypes.string,
            passwordConfirmationRequired: PropTypes.string,
            passwordConfirmationValidator: PropTypes.string
        })
    })
};
AuthInformationForm.defaultProps = {
    ...AbstractForm.defaultProps,
    formData: {
        username: '',
        password: '',
        passwordConfirmation: ''
    },
    labels: {
        title: 'Dein Kundenkonto',
        submit: 'Nächster Schritt',
        cancel: 'Vorheriger Schritt',
        fields: {
            username: 'Kundenlogin',
            password: 'Passwort',
            passwordConfirmation: 'Passwortbestätigung'
        },
        errors: {
            passwordRequired: 'Enter password.',
            passwordMinLength: 'Use 8 characters or more.',
            passwordLetterPattern: 'Use 1 letter or more.',
            passwordDigitPattern: 'Use 1 number or more.',
            passwordConfirmationRequired: 'Enter password again.',
            passwordConfirmationValidator: 'Passwords should match.'
        }
    }
};

export default AuthInformationForm;
