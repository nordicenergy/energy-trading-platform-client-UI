import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import AbstractForm from './AbstractForm';
import Wizard from '../Wizard';
import TextField from '../TextField';
import RadioButton from '../RadioButton';
import Checkbox from '../Checkbox';
import Validator from 'async-validator';

class PaymentInformationForm extends AbstractForm {
    prepareValidator(field) {
        const { formData: { paymentMethod }, labels } = this.props;
        const validationScheme =
            paymentMethod === 'debit'
                ? {
                      iban: { required: true, message: labels.errors.ibanRequired },
                      sepaApproval: {
                          validator(rule, value, done) {
                              const errors = [];

                              if (!value) {
                                  errors.push(new Error(labels.errors.sepaApprovalValidator));
                              }

                              done(errors);
                          }
                      }
                  }
                : {};

        if (field) {
            return new Validator(pick(validationScheme, field));
        }

        return new Validator(validationScheme);
    }

    handlePaymentMethodChange(event) {
        const { setFormData } = this.props;
        const { value } = event.target;
        const formData = { paymentMethod: value };

        if (value !== 'debit') {
            formData.iban = '';
            formData.alternativeAccountHolder = '';
            formData.sepaApproval = false;
        }

        setFormData(formData);
    }

    renderDebitFields() {
        const { formData, labels: { fields } } = this.props;
        const { errors } = this.state;

        return (
            <Fragment>
                <TextField
                    className="registration-form-field"
                    required
                    label={fields.iban}
                    helperText={fields.ibanHelp}
                    name="iban"
                    value={formData.iban}
                    error={errors.iban}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                />
                <TextField
                    className="registration-form-field"
                    label={fields.alternativeAccountHolder}
                    name="alternativeAccountHolder"
                    value={formData.alternativeAccountHolder}
                    error={errors.alternativeAccountHolder}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                />
                <fieldset className="registration-form-field registration-form-fieldset">
                    <legend className="registration-form-label">{fields.sepaApproval}</legend>
                    <div>
                        <Checkbox
                            required
                            label={fields.sepaApprovalOption}
                            name="sepaApproval"
                            value="confirmed"
                            onChange={this.handleCheckboxChange}
                        />
                        <small className="registration-form-help-text registration-form-help-text--sepa-approval">
                            {fields.sepaApprovalHelp}
                        </small>
                    </div>
                </fieldset>
            </Fragment>
        );
    }

    render() {
        const { formData, labels, labels: { fields }, onCancel } = this.props;

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
                    <fieldset className="registration-form-field registration-form-fieldset">
                        <legend className="registration-form-label">{fields.paymentMethod}</legend>
                        <div>
                            <RadioButton
                                label={fields.paymentMethodOptions[0]}
                                name="paymentMethod"
                                value="debit"
                                checked={formData.paymentMethod === 'debit'}
                                onChange={event => this.handlePaymentMethodChange(event)}
                            />
                        </div>
                        <div>
                            <RadioButton
                                label={fields.paymentMethodOptions[1]}
                                name="paymentMethod"
                                value="remittance"
                                checked={formData.paymentMethod === 'remittance'}
                                onChange={event => this.handlePaymentMethodChange(event)}
                            />
                        </div>
                    </fieldset>
                    {formData.paymentMethod === 'debit' && this.renderDebitFields()}
                    <input type="submit" hidden aria-hidden />
                </form>
            </Wizard.Content>
        );
    }
}

PaymentInformationForm.propTypes = {
    ...AbstractForm.propTypes,
    formData: PropTypes.shape({
        paymentMethod: PropTypes.oneOf(['debit', 'remittance']),
        iban: PropTypes.string,
        alternativeAccountHolder: PropTypes.string,
        sepaApproval: PropTypes.bool
    }),
    labels: PropTypes.shape({
        title: PropTypes.string,
        subTitle: PropTypes.string,
        submit: PropTypes.string,
        cancel: PropTypes.string,
        fields: PropTypes.shape({
            paymentMethod: PropTypes.string,
            paymentMethodOptions: PropTypes.arrayOf(PropTypes.string),
            iban: PropTypes.string,
            ibanHelp: PropTypes.string,
            alternativeAccountHolder: PropTypes.string,
            sepaApproval: PropTypes.string,
            sepaApprovalOption: PropTypes.string,
            sepaApprovalHelp: PropTypes.string
        }),
        errors: PropTypes.shape({
            ibanRequired: PropTypes.string,
            sepaApprovalValidator: PropTypes.string
        })
    })
};
PaymentInformationForm.defaultProps = {
    ...AbstractForm.defaultProps,
    formData: {
        paymentMethod: 'debit',
        iban: '',
        alternativeAccountHolder: '',
        sepaApproval: false
    },
    labels: {
        title: 'Zahlweise / Bankdaten',
        subTitle: 'Gewünschte Zahlungsweise',
        submit: 'Nächster Schritt',
        cancel: 'Vorheriger Schritt',
        fields: {
            paymentMethod: 'Zahlweise',
            paymentMethodOptions: ['Lastschrift', 'Überweisung'],
            iban: 'IBAN',
            ibanHelp: 'Unsere Gläubiger ID ist DE29ZZZ00002101922.',
            alternativeAccountHolder: 'Name des Kontoinhabers',
            sepaApproval: 'Erteilung SEPA-Mandat',
            sepaApprovalOption: 'Zustimmung',
            sepaApprovalHelp:
                'Der genannte Kontoinhaber ermächtigt die Lition Energie GmbH, Zahlungen von seinem Konto mittels Lastschrift einzuziehen. Zugleich weist der genannte Kontoinhaber sein Kreditinstitut an, die von dem Lieferanten auf sein Konto gezogenen Lastschriften einzulösen. Hinweis: Innerhalb von acht Wochen, beginnend mit dem Belastungs-datum, kann die Erstattung des belasteten Betrages zurückverlangt werden. Es gelten dabei die mit dem Kreditinstitut vereinbarten Bedingungen.'
        },
        errors: {
            ibanRequired: 'Enter IBAN.',
            sepaApprovalValidator: ''
        }
    }
};

export default PaymentInformationForm;
