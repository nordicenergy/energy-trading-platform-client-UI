import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import AbstractForm from './AbstractForm';
import Wizard from '../Wizard';
import TextField from '../TextField';
import RadioButton from '../RadioButton';
import DateField from '../DateField';
import Validator from 'async-validator';

class ConsumptionForm extends AbstractForm {
    prepareValidator(field) {
        const { formData: { customerSpecification }, labels: { errors } } = this.props;
        const validationScheme = {
            usage: [
                {
                    required: true,
                    message: errors.usageRequired
                },
                {
                    type: 'number',
                    transform(value) {
                        return Number(value);
                    },
                    min: 1000,
                    max: 100000,
                    message: errors.usageNumber
                }
            ],
            counterNumber: [
                { required: true, message: errors.counterNumberRequired },
                { pattern: /^\d+$/, message: errors.counterNumberPattern }
            ]
        };

        if (customerSpecification === 'relocation_at') {
            validationScheme.relocationDate = { required: true, message: errors.relocationDateRequired };
        }

        if (field) {
            return new Validator(pick(validationScheme, field));
        }

        return new Validator(validationScheme);
    }

    handleCustomerSpecificationChange(event) {
        const { setFormData } = this.props;
        const { value } = event.target;
        const formData = { customerSpecification: value };

        if (formData.customerSpecification !== 'relocation_at') {
            formData.relocationDate = '';
        }

        setFormData(formData);
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
                        label={fields.usage}
                        addon="kWh"
                        helperText={fields.usageHelp}
                        name="usage"
                        value={formData.usage}
                        error={errors.usage}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                    <fieldset className="registration-form-field registration-form-fieldset">
                        <legend className="registration-form-label">{fields.customerSpecification}</legend>
                        <div>
                            <RadioButton
                                label={fields.customerSpecificationOptions[0]}
                                name="customerSpecification"
                                value="earliest_possible_date"
                                checked={formData.customerSpecification === 'earliest_possible_date'}
                                onChange={event => this.handleCustomerSpecificationChange(event)}
                            />
                        </div>
                        <div>
                            <RadioButton
                                label={fields.customerSpecificationOptions[1]}
                                name="customerSpecification"
                                value="relocation_at"
                                checked={formData.customerSpecification === 'relocation_at'}
                                onChange={event => this.handleCustomerSpecificationChange(event)}
                            />
                        </div>
                    </fieldset>
                    <TextField
                        className="registration-form-field"
                        required
                        label={fields.counterNumber}
                        helperText={fields.counterNumberHelp}
                        name="counterNumber"
                        value={formData.counterNumber}
                        error={errors.counterNumber}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                    {formData.customerSpecification === 'relocation_at' && (
                        <DateField
                            className="registration-form-field"
                            required
                            label={fields.relocationDate}
                            name="relocationDate"
                            helperText={fields.relocationDateHelp}
                            value={formData.relocationDate}
                            error={errors.relocationDate}
                            onFocus={this.handleDateFieldFocus}
                            onBlur={this.handleDateFieldBlur}
                            onChange={this.handleDateChange}
                        />
                    )}
                    <input type="submit" hidden aria-hidden />
                </form>
            </Wizard.Content>
        );
    }
}

ConsumptionForm.propTypes = {
    ...AbstractForm.propTypes,
    formData: PropTypes.shape({
        customerSpecification: PropTypes.oneOf(['earliest_possible_date', 'relocation_at']),
        usage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        counterNumber: PropTypes.string,
        relocationDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    labels: PropTypes.shape({
        title: PropTypes.string,
        submit: PropTypes.string,
        cancel: PropTypes.string,
        fields: PropTypes.shape({
            usage: PropTypes.string,
            usageHelp: PropTypes.string,
            customerSpecification: PropTypes.string,
            customerSpecificationOptions: PropTypes.arrayOf(PropTypes.string),
            counterNumber: PropTypes.string,
            counterNumberHelp: PropTypes.string,
            relocationDate: PropTypes.string,
            relocationDateHelp: PropTypes.string
        }),
        errors: PropTypes.shape({
            usageRequired: PropTypes.string,
            usageNumber: PropTypes.string,
            counterNumberRequired: PropTypes.string,
            counterNumberPattern: PropTypes.string,
            relocationDateRequired: PropTypes.string
        })
    })
};
ConsumptionForm.defaultProps = {
    ...AbstractForm.defaultProps,
    formData: {
        customerSpecification: 'earliest_possible_date',
        usage: '',
        counterNumber: '',
        relocationDate: ''
    },
    labels: {
        title: 'Lieferbeginn',
        submit: 'Nächster Schritt',
        cancel: 'Vorheriger Schritt',
        fields: {
            usage: 'Jahresverbrauch',
            usageHelp:
                'Dies ist der Wert den Du eben bei der Preisberechnung eingegeben hast. Wenn Du ihn jetzt änderst, verändert sich auch dein Preis.',
            customerSpecification: 'AUmzug oder Lieferantenwechsel',
            customerSpecificationOptions: ['Wechsel zu Lition', 'Umzug'],
            counterNumber: 'Zählernummer',
            counterNumberHelp: 'Die Zählernummer brauchen wir zur Ummeldung deines Stromanschlusses.',
            relocationDate: 'Datum des Einzuges',
            relocationDateHelp: 'An welchem Tag ist bzw. war der Ein/Umzug?'
        },
        errors: {
            usageRequired: 'Enter usage.',
            usageNumber: 'Usage should be greater than 1000 and less than 100000.',
            counterNumberRequired: 'Enter counter number.',
            counterNumberPattern: 'You can use only number.',
            relocationDateRequired: 'Enter relocation date.'
        }
    }
};

export default ConsumptionForm;
