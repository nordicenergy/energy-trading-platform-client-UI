import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IBAN from 'iban';
import Validator from 'async-validator';

import { PAYMENT_METHODS } from '../../constants';
import AbstractForm from './AbstractForm';
import Wizard from '../Wizard';
import TextField from '../TextField';
import IBANField from '../IBANField';
import RadioButton from '../RadioButton';
import Checkbox from '../Checkbox';

class PaymentInformationForm extends AbstractForm {
    prepareValidator(field) {
        const { formData: { paymentMethod }, labels } = this.props;
        const validationScheme =
            paymentMethod === PAYMENT_METHODS.debit
                ? {
                      iban: [
                          { required: true, message: labels.errors.ibanRequired },
                          {
                              validator(rule, value, done) {
                                  const errors = [];

                                  if (!IBAN.isValid(value)) {
                                      errors.push(new Error(labels.errors.ibanValidator));
                                  }

                                  done(errors);
                              }
                          }
                      ],
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

        return new Validator(validationScheme);
    }

    handlePaymentMethodChange(event) {
        const { setFormData } = this.props;
        const { value } = event.target;
        const formData = { paymentMethod: value };

        if (value !== PAYMENT_METHODS.debit) {
            formData.iban = '';
            formData.alternativeAccountHolder = '';
            formData.sepaApproval = false;

            const errors = Object.assign({}, this.state.errors);
            delete errors.iban;
            delete errors.sepaApproval;

            this.setState({ errors });
        }

        setFormData(formData);
    }

    renderDebitFields() {
        const { formData, labels: { fields } } = this.props;
        const { errors } = this.state;

        return (
            <Fragment>
                <IBANField
                    className="registration-form-field"
                    required
                    label={fields.iban}
                    helperText={fields.ibanHelp}
                    name="iban"
                    value={formData.iban}
                    error={errors.iban}
                    onChange={this.handleChange}
                />
                <TextField
                    className="registration-form-field"
                    label={fields.alternativeAccountHolder}
                    name="alternativeAccountHolder"
                    value={formData.alternativeAccountHolder}
                    error={errors.alternativeAccountHolder}
                    onChange={this.handleChange}
                />
                <fieldset className="registration-form-field registration-form-fieldset">
                    <legend className="registration-form-label">{fields.sepaApproval}</legend>
                    <div>
                        <Checkbox
                            required
                            label={fields.sepaApprovalOption}
                            helpText={fields.sepaApprovalHelp}
                            name="sepaApproval"
                            value="confirmed"
                            checked={formData.sepaApproval}
                            error={errors.sepaApproval}
                            onChange={this.handleCheckboxChange}
                        />
                    </div>
                </fieldset>
            </Fragment>
        );
    }

    renderBitcoinFields() {
        const { labels: { fields } } = this.props;
        return (
            <div className="profile-form-bitcoin-message">
                <strong>{fields.bitcoinMessage}</strong>
            </div>
        );
    }

    render() {
        const { formData, labels, labels: { fields }, onCancel } = this.props;
        const [debitLabel, transferLabel, bitcoinLabel] = fields.paymentMethodOptions;

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
                                label={debitLabel}
                                name="paymentMethod"
                                value={PAYMENT_METHODS.debit}
                                checked={formData.paymentMethod === PAYMENT_METHODS.debit}
                                onChange={event => this.handlePaymentMethodChange(event)}
                            />
                        </div>
                        <div>
                            <RadioButton
                                label={transferLabel}
                                name="paymentMethod"
                                value={PAYMENT_METHODS.transfer}
                                checked={formData.paymentMethod === PAYMENT_METHODS.transfer}
                                onChange={event => this.handlePaymentMethodChange(event)}
                            />
                        </div>
                        <div>
                            <RadioButton
                                label={bitcoinLabel}
                                name="paymentMethod"
                                value={PAYMENT_METHODS.bitcoin}
                                checked={formData.paymentMethod === PAYMENT_METHODS.bitcoin}
                                onChange={event => this.handlePaymentMethodChange(event)}
                            />
                        </div>
                    </fieldset>
                    {formData.paymentMethod === PAYMENT_METHODS.debit && this.renderDebitFields()}
                    {formData.paymentMethod === PAYMENT_METHODS.bitcoin && this.renderBitcoinFields()}
                    <input type="submit" hidden aria-hidden />
                </form>
            </Wizard.Content>
        );
    }
}

PaymentInformationForm.propTypes = {
    ...AbstractForm.propTypes,
    formData: PropTypes.shape({
        paymentMethod: PropTypes.oneOf([PAYMENT_METHODS.debit, PAYMENT_METHODS.transfer, PAYMENT_METHODS.bitcoin]),
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
            sepaApprovalHelp: PropTypes.string,
            bitcoinMessage: PropTypes.string
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
        paymentMethod: PAYMENT_METHODS.debit,
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
            paymentMethodOptions: ['Lastschrift', 'Überweisung', 'Bitcoin'],
            iban: 'IBAN',
            ibanHelp: 'Unsere Gläubiger ID ist DE29ZZZ00002101922.',
            alternativeAccountHolder: 'Name des Kontoinhabers',
            sepaApproval: 'Erteilung SEPA-Mandat',
            sepaApprovalOption: 'Zustimmung',
            sepaApprovalHelp:
                'Der genannte Kontoinhaber ermächtigt die Lition Energie GmbH, Zahlungen von seinem Konto mittels Lastschrift einzuziehen. Zugleich weist der genannte Kontoinhaber sein Kreditinstitut an, die von dem Lieferanten auf sein Konto gezogenen Lastschriften einzulösen. Hinweis: Innerhalb von acht Wochen, beginnend mit dem Belastungs-datum, kann die Erstattung des belasteten Betrages zurückverlangt werden. Es gelten dabei die mit dem Kreditinstitut vereinbarten Bedingungen.',
            bitcoinMessage:
                'Lition accepts your Monthly payments in Bitcoin. Whenever your monthly installment is due, we will send you a link with instructions how to pay your Energy in Bitcoin or Bitcoin Cash, using the then current Bitcoin-Euro Exchange rate.'
        },
        errors: {
            ibanRequired: 'Enter IBAN.',
            ibanValidator: 'IBAN is invalid.',
            sepaApprovalValidator: 'Please accept the SEPA terms.'
        }
    }
};

export default PaymentInformationForm;
