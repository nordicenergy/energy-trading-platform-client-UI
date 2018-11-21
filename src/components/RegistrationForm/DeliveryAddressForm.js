import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Validator from 'async-validator';
import AbstractForm from './AbstractForm';
import RadioButton from '../RadioButton';
import TextField from '../TextField';
import SelectField from '../SelectField';
import Wizard from '../Wizard';

class DeliveryAddressForm extends AbstractForm {
    prepareValidator(field) {
        const { formData: { business, billingAlternativeAddress }, labels: { errors } } = this.props;
        const requiredFieldValidationScheme = {
            firstName: { required: true, message: errors.firstNameRequired },
            lastName: { required: true, message: errors.lastNameRequired },
            postcode: [
                { required: true, message: errors.postcodeRequired },
                { pattern: /^\d{5,6}$/, message: errors.postcodePattern }
            ],
            city: { required: true, message: errors.cityRequired },
            street: { required: true, message: errors.streetRequired },
            streetNumber: [
                { required: true, message: errors.streetNumberRequired },
                { pattern: /^\d+[a-z]?$/, message: errors.streetNumberPattern }
            ]
        };
        const optionalFieldsValidationScheme = {
            billingFirstName: requiredFieldValidationScheme.firstName,
            billingSurname: requiredFieldValidationScheme.lastName,
            billingZip: requiredFieldValidationScheme.postcode,
            billingCity: requiredFieldValidationScheme.city,
            billingStreet: requiredFieldValidationScheme.street,
            billingHouseNumber: requiredFieldValidationScheme.streetNumber
        };

        if (business) {
            requiredFieldValidationScheme.company = { required: true, message: errors.companyRequired };
            requiredFieldValidationScheme.legalForm = { required: true, message: errors.legalFormRequired };
            optionalFieldsValidationScheme.billingCompany = requiredFieldValidationScheme.company;
            optionalFieldsValidationScheme.billingLegalForm = requiredFieldValidationScheme.legalForm;
        }

        return new Validator(
            billingAlternativeAddress
                ? { ...requiredFieldValidationScheme, ...optionalFieldsValidationScheme }
                : requiredFieldValidationScheme
        );
    }

    handleBusinessChange(event) {
        const { setFormData } = this.props;
        const { value } = event.target;
        const formData = { business: value === 'yes' };

        if (!formData.business) {
            formData.company = '';
            formData.legalForm = '';
            formData.billingCompany = '';
            formData.billingLegalForm = '';

            const errors = Object.assign({}, this.state.errors);
            delete errors.company;
            delete errors.legalForm;
            delete errors.billingCompany;
            delete errors.billingLegalForm;

            this.setState({ errors });
        }

        setFormData(formData);
    }

    handleAlternativeBillingAddressChange(event) {
        const { setFormData } = this.props;
        const { value } = event.target;
        const formData = { billingAlternativeAddress: value === 'yes' };

        if (!formData.billingAlternativeAddress) {
            formData.billingCompany = '';
            formData.billingLegalForm = '';
            formData.billingSalutation = '1';
            formData.billingFirstName = '';
            formData.billingSurname = '';
            formData.billingZip = '';
            formData.billingCity = '';
            formData.billingStreet = '';
            formData.billingHouseNumber = '';

            const errors = Object.assign({}, this.state.errors);
            delete errors.billingCompany;
            delete errors.billingLegalForm;
            delete errors.billingSalutation;
            delete errors.billingFirstName;
            delete errors.billingSurname;
            delete errors.billingZip;
            delete errors.billingCity;
            delete errors.billingStreet;
            delete errors.billingHouseNumber;

            this.setState({ errors });
        }

        setFormData(formData);
    }

    renderBillingAddressFields() {
        const { formData, labels: { fields } } = this.props;
        const { errors } = this.state;

        return (
            <Fragment>
                {formData.business && (
                    <Fragment>
                        <TextField
                            className="registration-form-field"
                            required
                            label={fields.billingCompany}
                            name="billingCompany"
                            value={formData.billingCompany}
                            error={errors.billingCompany}
                            onChange={this.handleChange}
                        />
                        <TextField
                            className="registration-form-field"
                            required
                            label={fields.billingLegalForm}
                            name="billingLegalForm"
                            value={formData.billingLegalForm}
                            error={errors.billingLegalForm}
                            onChange={this.handleChange}
                        />
                    </Fragment>
                )}
                <SelectField
                    className="registration-form-field"
                    required
                    label={fields.billingSalutation}
                    name="billingSalutation"
                    value={formData.billingSalutation}
                    options={[
                        { value: '1', label: fields.salutationOptions[0] },
                        { value: '2', label: fields.salutationOptions[1] }
                    ]}
                    onChange={this.handleSelectChange}
                />
                <TextField
                    className="registration-form-field"
                    required
                    label={fields.billingFirstName}
                    name="billingFirstName"
                    value={formData.billingFirstName}
                    error={errors.billingFirstName}
                    onChange={this.handleChange}
                />
                <TextField
                    className="registration-form-field"
                    required
                    label={fields.billingSurname}
                    name="billingSurname"
                    value={formData.billingSurname}
                    error={errors.billingSurname}
                    onChange={this.handleChange}
                />
                <TextField
                    className="registration-form-field"
                    required
                    label={fields.billingZip}
                    name="billingZip"
                    value={formData.billingZip}
                    error={errors.billingZip}
                    onChange={this.handleChange}
                />
                <TextField
                    className="registration-form-field"
                    required
                    label={fields.billingCity}
                    name="billingCity"
                    value={formData.billingCity}
                    error={errors.billingCity}
                    onChange={this.handleChange}
                />
                <TextField
                    className="registration-form-field"
                    required
                    label={fields.billingStreet}
                    name="billingStreet"
                    value={formData.billingStreet}
                    error={errors.billingStreet}
                    onChange={this.handleChange}
                />
                <TextField
                    className="registration-form-field"
                    required
                    label={fields.billingHouseNumber}
                    name="billingHouseNumber"
                    value={formData.billingHouseNumber}
                    error={errors.billingHouseNumber}
                    onChange={this.handleChange}
                />
            </Fragment>
        );
    }

    render() {
        const { formData, labels, labels: { fields } } = this.props;
        const { errors } = this.state;

        // TODO: remove disable attribute from business radio button after implementing BS-361
        return (
            <Wizard.Content
                className="wizard-content--with-shadow"
                title={labels.title}
                labels={{ nextButton: labels.submit }}
                allowPreviousStep={false}
                onNextButtonClick={this.handleSubmit}
            >
                <form noValidate onSubmit={this.handleSubmit}>
                    <fieldset className="registration-form-field registration-form-fieldset">
                        <legend className="registration-form-label">{fields.business}</legend>
                        <div>
                            <RadioButton
                                label={fields.businessOptions[0]}
                                name="business"
                                value="no"
                                checked={!formData.business}
                                onChange={event => this.handleBusinessChange(event)}
                            />
                        </div>
                        <div>
                            <RadioButton
                                label={fields.businessOptions[1]}
                                name="business"
                                value="yes"
                                checked={formData.business}
                                onChange={event => this.handleBusinessChange(event)}
                            />
                        </div>
                    </fieldset>
                    {formData.business && (
                        <Fragment>
                            <TextField
                                className="registration-form-field"
                                required
                                label={fields.company}
                                name="company"
                                value={formData.company}
                                error={errors.company}
                                onChange={this.handleChange}
                            />
                            <TextField
                                className="registration-form-field"
                                required
                                label={fields.legalForm}
                                name="legalForm"
                                value={formData.legalForm}
                                error={errors.legalForm}
                                onChange={this.handleChange}
                            />
                        </Fragment>
                    )}
                    <SelectField
                        className="registration-form-field"
                        required
                        label={fields.salutation}
                        name="salutation"
                        value={formData.salutation}
                        options={[
                            { value: '1', label: fields.salutationOptions[0] },
                            { value: '2', label: fields.salutationOptions[1] }
                        ]}
                        onChange={this.handleSelectChange}
                    />
                    <TextField
                        className="registration-form-field"
                        required
                        label={fields.firstName}
                        name="firstName"
                        value={formData.firstName}
                        error={errors.firstName}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className="registration-form-field"
                        required
                        label={fields.lastName}
                        name="lastName"
                        value={formData.lastName}
                        error={errors.lastName}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className="registration-form-field"
                        required
                        label={fields.postcode}
                        name="postcode"
                        value={formData.postcode}
                        error={errors.postcode}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className="registration-form-field"
                        required
                        label={fields.city}
                        name="city"
                        value={formData.city}
                        error={errors.city}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className="registration-form-field"
                        required
                        label={fields.street}
                        name="street"
                        value={formData.street}
                        error={errors.street}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className="registration-form-field"
                        required
                        label={fields.streetNumber}
                        name="streetNumber"
                        value={formData.streetNumber}
                        error={errors.streetNumber}
                        onChange={this.handleChange}
                    />
                    <fieldset className="registration-form-field registration-form-fieldset">
                        <legend className="registration-form-label">{fields.billingAlternativeAddress}</legend>
                        <div>
                            <RadioButton
                                name="billingAlternativeAddress"
                                label={fields.billingAlternativeAddressOptions[0]}
                                value="no"
                                checked={!formData.billingAlternativeAddress}
                                onChange={event => this.handleAlternativeBillingAddressChange(event)}
                            />
                        </div>
                        <div>
                            <RadioButton
                                name="billingAlternativeAddress"
                                label={fields.billingAlternativeAddressOptions[1]}
                                value="yes"
                                checked={formData.billingAlternativeAddress}
                                onChange={event => this.handleAlternativeBillingAddressChange(event)}
                            />
                        </div>
                    </fieldset>
                    {formData.billingAlternativeAddress && this.renderBillingAddressFields()}
                    <input type="submit" hidden aria-hidden />
                </form>
            </Wizard.Content>
        );
    }
}

DeliveryAddressForm.propTypes = {
    ...AbstractForm.propTypes,
    formData: PropTypes.shape({
        business: PropTypes.bool,
        company: PropTypes.string,
        legalForm: PropTypes.string,
        salutation: PropTypes.oneOf(['1', '2', '3']),
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        postcode: PropTypes.string,
        city: PropTypes.string,
        street: PropTypes.string,
        streetNumber: PropTypes.string,
        billingAlternativeAddress: PropTypes.bool,
        billingCompany: PropTypes.string,
        billingLegalForm: PropTypes.string,
        billingSalutation: PropTypes.oneOf(['1', '2', '3']),
        billingSurname: PropTypes.string,
        billingFirstName: PropTypes.string,
        billingZip: PropTypes.string,
        billingCity: PropTypes.string,
        billingStreet: PropTypes.string,
        billingHouseNumber: PropTypes.string
    }),
    labels: PropTypes.shape({
        title: PropTypes.string,
        submit: PropTypes.string,
        fields: PropTypes.shape({
            business: PropTypes.string,
            businessOptions: PropTypes.arrayOf(PropTypes.string),
            company: PropTypes.string,
            legalForm: PropTypes.string,
            salutation: PropTypes.string,
            salutationOptions: PropTypes.arrayOf(PropTypes.string),
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            postcode: PropTypes.string,
            city: PropTypes.string,
            street: PropTypes.string,
            streetNumber: PropTypes.string,
            billingAlternativeAddress: PropTypes.string,
            billingAlternativeAddressOptions: PropTypes.arrayOf(PropTypes.string),
            billingCompany: PropTypes.string,
            billingLegalForm: PropTypes.string,
            billingSalutation: PropTypes.string,
            billingSurname: PropTypes.string,
            billingFirstName: PropTypes.string,
            billingZip: PropTypes.string,
            billingCity: PropTypes.string,
            billingStreet: PropTypes.string,
            billingHouseNumber: PropTypes.string
        }),
        errors: PropTypes.shape({
            companyRequired: PropTypes.string,
            legalFormRequired: PropTypes.string,
            firstNameRequired: PropTypes.string,
            lastNameRequired: PropTypes.string,
            postcodeRequired: PropTypes.string,
            postcodePatter: PropTypes.string,
            cityRequired: PropTypes.string,
            streetRequired: PropTypes.string,
            streetNumberRequired: PropTypes.string,
            streetNumberPattern: PropTypes.string
        })
    })
};
DeliveryAddressForm.defaultProps = {
    ...AbstractForm.defaultProps,
    formData: {
        business: false,
        company: '',
        legalForm: '',
        salutation: '1',
        firstName: '',
        lastName: '',
        postcode: '',
        city: '',
        street: '',
        streetNumber: '',
        billingAlternativeAddress: false,
        billingCompany: '',
        billingLegalForm: '',
        billingSalutation: '1',
        billingSurname: '',
        billingFirstName: '',
        billingZip: '',
        billingCity: '',
        billingStreet: '',
        billingHouseNumber: ''
    },
    labels: {
        title: 'Lieferadresse',
        submit: 'Nächster Schritt',
        fields: {
            business: 'An diese Adresse liefern wir deinen Strom',
            businessOptions: ['Privat', 'Gewerbe'],
            company: 'Name der Firma',
            legalForm: 'Rechtsform',
            salutation: 'Anrede',
            salutationOptions: ['Herr', 'Frau'],
            firstName: 'Vorname',
            lastName: 'Nachname',
            postcode: 'Postleitzahl',
            city: 'Ort',
            street: 'Straße',
            streetNumber: 'Hausnummer',
            billingAlternativeAddress: 'Abweichender Rechnungsempfänger?',
            billingAlternativeAddressOptions: ['Nein', 'Ja'],
            billingCompany: 'Name der Firma',
            billingLegalForm: 'Rechtsform',
            billingSalutation: 'Anrede',
            billingSurname: 'Vorname',
            billingFirstName: 'Nachname',
            billingZip: 'Postleitzahl',
            billingCity: 'Ort',
            billingStreet: 'Straße',
            billingHouseNumber: 'Hausnummer'
        },
        errors: {
            companyRequired: 'Enter company.',
            legalFormRequired: 'Enter legal form.',
            firstNameRequired: 'Enter first name.',
            lastNameRequired: 'Enter last name.',
            postcodeRequired: 'Enter postcode.',
            postcodePattern: 'Use 5 or 6 numbers.',
            cityRequired: 'Enter city.',
            streetRequired: 'Enter street.',
            streetNumberRequired: 'Enter street number.',
            streetNumberPattern: 'You can use numbers and letter (e.g. 12a).'
        }
    }
};

export default DeliveryAddressForm;
