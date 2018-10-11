import React from 'react';
import AbstractForm from './AbstractForm';
import Wizard from '../Wizard';
import TextField from '../TextField';
import DateField from '../DateField';
import Validator from 'async-validator';
import PropTypes from 'prop-types';

class PersonalInformationForm extends AbstractForm {
    prepareValidator(field) {
        const { labels } = this.props;
        const validationScheme = {
            email: [
                { required: true, message: labels.errors.emailRequired },
                { type: 'email', message: labels.errors.emailType }
            ],
            birthday: { required: true, message: labels.errors.birthdayRequired },
            phoneAreaCode: [
                { pattern: /^\d+[\d- ]*$/, message: labels.errors.phoneAreaCodePattern },
                {
                    validator(rule, value, done, source) {
                        const errors = [];

                        if (!value && source.phone) {
                            errors.push(new Error(labels.errors.phoneAreaCodeValidator));
                        }

                        done(errors);
                    }
                }
            ],
            phone: [
                { pattern: /^\d+[\d- ]*$/, message: labels.errors.phonePattern },
                {
                    validator(rule, value, done, source) {
                        const errors = [];

                        if (!value && source.phoneAreaCode) {
                            errors.push(new Error(labels.errors.phoneValidator));
                        }

                        done(errors);
                    }
                }
            ]
        };

        return new Validator(validationScheme);
    }

    render() {
        const { formData, labels, labels: { fields }, onCancel } = this.props;
        const { errors } = this.state;

        return (
            <Wizard.Content
                className="wizard-content--with-shadow"
                title={labels.title}
                subTitle={labels.subTitle}
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
                        label={fields.email}
                        type="email"
                        name="email"
                        value={formData.email}
                        error={errors.email}
                        onChange={this.handleChange}
                    />
                    <DateField
                        className="registration-form-field"
                        required
                        label={fields.birthday}
                        helperText={fields.birthdayHelperText}
                        name="birthday"
                        value={formData.birthday}
                        error={errors.birthday}
                        onChange={this.handleDateChange}
                    />
                    <fieldset className="registration-form-field registration-form-fieldset registration-form-fieldset--phone">
                        <div>
                            <TextField
                                className="text-field--phone-code"
                                label={fields.phoneAreaCode}
                                name="phoneAreaCode"
                                value={formData.phoneAreaCode}
                                error={errors.phoneAreaCode}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                className="text-field--phone"
                                label={fields.phone}
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                error={errors.phone}
                                onChange={this.handleChange}
                            />
                        </div>
                    </fieldset>
                    <input type="submit" hidden aria-hidden />
                </form>
            </Wizard.Content>
        );
    }
}

PersonalInformationForm.propTypes = {
    ...AbstractForm.propTypes,
    formData: PropTypes.shape({
        email: PropTypes.string,
        birthday: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        phoneAreaCode: PropTypes.string,
        phone: PropTypes.string
    }),
    labels: PropTypes.shape({
        title: PropTypes.string,
        subTitle: PropTypes.string,
        submit: PropTypes.string,
        cancel: PropTypes.string,
        fields: PropTypes.shape({
            email: PropTypes.string,
            birthday: PropTypes.string,
            birthdayHelperText: PropTypes.string,
            phoneAreaCode: PropTypes.string,
            phone: PropTypes.string
        }),
        errors: PropTypes.shape({
            emailRequired: PropTypes.string,
            emailType: PropTypes.string,
            birthdayRequired: PropTypes.string,
            phoneAreaCodePattern: PropTypes.string,
            phonePattern: PropTypes.string
        })
    })
};
PersonalInformationForm.defaultProps = {
    ...AbstractForm.defaultProps,
    formData: {
        email: '',
        birthday: '',
        phoneAreaCode: '',
        phone: ''
    },
    labels: {
        title: 'Weitere Angaben',
        subTitle: 'Persönliche Daten',
        submit: 'Nächster Schritt',
        cancel: 'Vorheriger Schritt',
        fields: {
            email: 'Email',
            birthday: 'Geburtsdatum',
            birthdayHelperText: 'Format bearbeiten dd.mm.yyyy',
            phoneAreaCode: 'Vorwahl',
            phone: 'Telefonnummer'
        },
        errors: {
            emailRequired: 'Enter email address.',
            emailType: 'Email address is invalid.',
            birthdayRequired: 'Enter date of birth.',
            phoneAreaCodePattern: 'Phone code is invalid.',
            phoneAreaCodeValidator: 'Enter phone code.',
            phonePattern: 'Phone is invalid.',
            phoneValidator: 'Enter phone.'
        }
    }
};

export default PersonalInformationForm;
