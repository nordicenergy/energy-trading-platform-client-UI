import React from 'react';
import PropTypes from 'prop-types';
import AbstractForm from './AbstractForm';
import Wizard from '../Wizard';
import TextField from '../TextField';
import Checkbox from '../Checkbox';
import Validator from 'async-validator';

class TermsAndConditionsForm extends AbstractForm {
    prepareValidator(field) {
        const { labels } = this.props;
        const validationScheme = {
            agbApproval: {
                validator(rule, value, done) {
                    const errors = [];

                    if (!value) {
                        errors.push(new Error(labels.errors.agbApprovalValidator));
                    }

                    done(errors);
                }
            }
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
                labels={{
                    previousButton: labels.cancel,
                    nextButton: labels.submit
                }}
                nextButtonType="success"
                onPreviousButtonClick={onCancel}
                onNextButtonClick={this.handleSubmit}
            >
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        className="registration-form-field"
                        label={fields.message}
                        multiLine
                        name="message"
                        value={formData.message}
                        error={errors.message}
                        onChange={this.handleChange}
                    />
                    <div className="registration-form-field">
                        <Checkbox
                            required
                            label={<span dangerouslySetInnerHTML={{ __html: fields.agbApproval }} />}
                            name="agbApproval"
                            checked={formData.agbApproval}
                            onChange={this.handleCheckboxChange}
                        />
                    </div>
                    <div className="registration-form-field">
                        <Checkbox
                            label={fields.enableNotifications}
                            name="enableNotifications"
                            checked={formData.enableNotifications}
                            onChange={this.handleCheckboxChange}
                        />
                    </div>
                    <input type="submit" hidden aria-hidden />
                </form>
            </Wizard.Content>
        );
    }
}

TermsAndConditionsForm.propTypes = {
    ...AbstractForm.propTypes,
    formData: PropTypes.shape({
        message: PropTypes.string,
        agbApproval: PropTypes.bool,
        enableNotifications: PropTypes.bool
    }),
    labels: PropTypes.shape({
        title: PropTypes.string,
        submit: PropTypes.string,
        cancel: PropTypes.string,
        fields: PropTypes.shape({
            message: PropTypes.string,
            agbApproval: PropTypes.string,
            enableNotifications: PropTypes.string
        }),
        errors: PropTypes.shape({
            agbApproval: PropTypes.string
        })
    })
};
TermsAndConditionsForm.defaultProps = {
    ...AbstractForm.defaultProps,
    formData: {
        message: '',
        agbApproval: false,
        enableNotifications: false
    },
    labels: {
        title: 'Abschluss',
        submit: 'Kunde werden',
        cancel: 'Vorheriger Schritt',
        fields: {
            message: 'Nachricht an uns',
            agbApproval:
                'Mit <a href="https://www.lition.de/wp-content/uploads/2018/05/Lition-AGB-v2c.pdf" rel="noopener noreferrer" target="_blank">AGBs</a>, <a href="https://www.lition.de/wp-content/uploads/2018/05/Widerrufsformular.pdf" rel="noopener noreferrer" target="_blank">Widerruf</a> und <a href="https://www.lition.de/privacy-policy" rel="noopener noreferrer" target="_blank">Datenschutzerklärung</a> einverstanden?',
            enableNotifications:
                'Dürfen wir Dich über die neuen Entwicklungen und Produkte unserer Firma per E-Mail, per Telefon oder per Post, informieren?'
        },
        errors: {
            agbApprovalValidator: ''
        }
    }
};

export default TermsAndConditionsForm;
