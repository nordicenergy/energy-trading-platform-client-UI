import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import { KEYBOARD_KEY_VALUES, PAYMENT_METHODS } from '../../constants';
import { TextField, Button, DateField, IBANField, RadioButton, Checkbox } from '../index';
import './ProfileForm.css';

class ProfileForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateFieldChange = this.handleDateFieldChange.bind(this);
        this.handlePaymentMethodChange = this.handlePaymentMethodChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tabs = ['personalData', 'paymentData'];
        this.state = {
            selectedTabIndex: 0,
            formData: this.getFormData(props.profile)
        };
    }

    getFormData(profile) {
        return {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            paymentMethod: profile.IBAN ? PAYMENT_METHODS.debit : PAYMENT_METHODS.transfer,
            sepaApproval: Boolean(profile.IBAN),
            ...ProfileForm.defaultProps.profile,
            ...pick(profile, Object.keys(ProfileForm.defaultProps.profile))
        };
    }

    componentDidUpdate(prevProps) {
        const { profile } = this.props;

        if (profile !== prevProps.profile) {
            this.setState({ formData: this.getFormData(profile) });
        }
    }

    toggleTab(tabIndex) {
        this.setState({ selectedTabIndex: tabIndex });
    }

    handleTabKeyDown(event) {
        const selectedTabIndex = this.state.selectedTabIndex;
        const firstIndex = 0;
        const lastIndex = this.tabs.length - 1;

        switch (event.key) {
            case KEYBOARD_KEY_VALUES.ARROW_LEFT:
                this.setState({ selectedTabIndex: selectedTabIndex > firstIndex ? selectedTabIndex - 1 : lastIndex });
                break;
            case KEYBOARD_KEY_VALUES.ARROW_RIGHT:
                this.setState({ selectedTabIndex: selectedTabIndex < lastIndex ? selectedTabIndex + 1 : firstIndex });
                break;
            case KEYBOARD_KEY_VALUES.HOME:
                event.preventDefault();
                this.setState({ selectedTabIndex: firstIndex });
                break;
            case KEYBOARD_KEY_VALUES.END:
                event.preventDefault();
                this.setState({ selectedTabIndex: lastIndex });
                break;
            default:
                break;
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    }

    handleDateFieldChange({ name, value }) {
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    }

    handlePaymentMethodChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const formData = this.state.formData;

        this.setState({
            formData: {
                ...formData,
                [name]: value,
                IBAN: '',
                sepaApproval: false
            }
        });
    }

    handleSubmit() {
        this.props.onSubmit(this.state.formData);
    }

    render() {
        const { locale, labels, errors } = this.props;
        const { formData } = this.state;
        const selectedTab = this.tabs[this.state.selectedTabIndex];

        return (
            <div className="profile-form">
                <div className="profile-form-tab-list" role="tablist">
                    <button
                        id="personalDataTab"
                        role="tab"
                        aria-selected={selectedTab === 'personalData'}
                        aria-controls="personalDataTabPanel"
                        onKeyDown={event => this.handleTabKeyDown(event)}
                        onClick={() => this.toggleTab(0)}
                    >
                        {labels.personalDataTab}
                    </button>
                    <button
                        id="paymentDataTab"
                        role="tab"
                        aria-selected={selectedTab === 'paymentData'}
                        aria-controls="paymentDataTabPanel"
                        onKeyDown={event => this.handleTabKeyDown(event)}
                        onClick={() => this.toggleTab(1)}
                    >
                        {labels.paymentDataTab}
                    </button>
                </div>
                <div
                    id="personalDataTabPanel"
                    className="profile-form-tab-panel"
                    hidden={selectedTab !== 'personalData'}
                    role="tabpanel"
                    tabIndex={-1}
                    aria-labelledby="personalDataTab"
                >
                    <TextField
                        disabled
                        required
                        label={labels.firstName}
                        name="firstName"
                        value={formData.firstName}
                        error={errors.firstName}
                        onChange={this.handleChange}
                    />
                    <TextField
                        disabled
                        required
                        label={labels.lastName}
                        name="lastName"
                        value={formData.lastName}
                        error={errors.lastName}
                        onChange={this.handleChange}
                    />
                    <DateField
                        disabled
                        locale={locale}
                        name="birthday"
                        helperText={labels.birthdayHelperText}
                        label={labels.birthday}
                        value={formData.birthday}
                        error={errors.birthday}
                        onChange={this.handleDateFieldChange}
                    />
                    <TextField
                        disabled
                        label={labels.city}
                        name="city"
                        value={formData.city}
                        error={errors.city}
                        onChange={this.handleChange}
                    />
                    <TextField
                        disabled
                        label={labels.street}
                        name="street"
                        value={formData.street}
                        error={errors.street}
                        onChange={this.handleChange}
                    />
                    <TextField
                        disabled
                        label={labels.streetNumber}
                        name="streetNumber"
                        value={formData.streetNumber}
                        error={errors.streetNumber}
                        onChange={this.handleChange}
                    />
                    <TextField
                        disabled
                        label={labels.postcode}
                        name="postcode"
                        value={formData.postcode}
                        error={errors.postcode}
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        label={labels.email}
                        name="email"
                        type="email"
                        value={formData.email}
                        error={errors.email}
                        onChange={this.handleChange}
                    />
                    <TextField
                        disabled={!this.props.profile.allowPasswordChange}
                        label={labels.oldPassword}
                        name="oldPassword"
                        type="password"
                        value={formData.oldPassword}
                        error={errors.oldPassword}
                        onChange={this.handleChange}
                    />
                    <TextField
                        disabled={!this.props.profile.allowPasswordChange}
                        label={labels.newPassword}
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        error={errors.newPassword}
                        onChange={this.handleChange}
                    />
                    <TextField
                        disabled={!this.props.profile.allowPasswordChange}
                        label={labels.confirmNewPassword}
                        name="confirmNewPassword"
                        type="password"
                        value={formData.confirmNewPassword}
                        error={errors.confirmNewPassword}
                        onChange={this.handleChange}
                    />
                </div>
                <div
                    id="paymentDataTabPanel"
                    className="profile-form-tab-panel"
                    hidden={selectedTab !== 'paymentData'}
                    role="tabpanel"
                    tabIndex={-1}
                    aria-describedby="paymentDataTab"
                >
                    <div className="profile-form-payment-method">
                        <strong>{labels.paymentMethod}</strong>
                        <ul>
                            <li>
                                <RadioButton
                                    label={labels.paymentMethodDebitOption}
                                    name="paymentMethod"
                                    value="debit"
                                    checked={formData.paymentMethod === 'debit'}
                                    onChange={this.handlePaymentMethodChange}
                                />
                            </li>
                            <li>
                                <RadioButton
                                    name="paymentMethod"
                                    value="transfer"
                                    checked={formData.paymentMethod === 'transfer'}
                                    label={labels.paymentMethodTransferOption}
                                    onChange={this.handlePaymentMethodChange}
                                />
                            </li>
                        </ul>
                    </div>
                    {formData.paymentMethod === PAYMENT_METHODS.debit && (
                        <React.Fragment>
                            <IBANField
                                label={labels.IBAN}
                                name="IBAN"
                                value={formData.IBAN}
                                error={errors.IBAN}
                                required
                                onChange={this.handleChange}
                            />
                            <div className="profile-form-sepa-approval">
                                <strong>{labels.sepaApproval}</strong>
                                <Checkbox
                                    required
                                    label={labels.sepaApprovalOption}
                                    name="sepaApproval"
                                    checked={formData.sepaApproval}
                                    onChange={this.handleChange}
                                />
                                <small>{labels.sepaApprovalHelp}</small>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                <div className="profile-form-actions">
                    <Button onClick={this.handleSubmit}>{labels.submitButton}</Button>
                </div>
            </div>
        );
    }
}

const commonProfilePropTypes = {
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthday: PropTypes.string,
    country: PropTypes.string,
    postcode: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    streetNumber: PropTypes.string,
    IBAN: PropTypes.string,
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmNewPassword: PropTypes.string
};

ProfileForm.propTypes = {
    labels: PropTypes.shape({
        ...commonProfilePropTypes,
        paymentMethod: PropTypes.string,
        paymentMethodDebitOption: PropTypes.string,
        paymentMethodTransferOption: PropTypes.string,
        sepaApproval: PropTypes.string,
        sepaApprovalOption: PropTypes.string,
        sepaApprovalHelp: PropTypes.string,
        submitButton: PropTypes.string
    }),
    profile: PropTypes.shape({
        ...commonProfilePropTypes,
        allowPasswordChange: PropTypes.bool,
        birthday: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    errors: PropTypes.shape(commonProfilePropTypes),
    onSubmit: PropTypes.func
};
ProfileForm.defaultProps = {
    labels: {
        personalDataTab: 'Personal Data',
        paymentDataTab: 'Payment',
        firstName: 'First Name',
        lastName: 'Last Name',
        birthday: 'Date of birth',
        birthdayHelperText: 'Editing format dd.mm.yyyy',
        city: 'City',
        street: 'Street',
        streetNumber: 'Street Number',
        postcode: 'Postcode',
        IBAN: 'Bank account number',
        email: 'Email',
        oldPassword: 'Old password',
        newPassword: 'New password',
        confirmNewPassword: 'Repeat new password',
        paymentMethod: 'Payment options',
        paymentMethodDebitOption: 'Debit',
        paymentMethodTransferOption: 'Transfer',
        sepaApproval: 'Issuing SEPA-Mandate',
        sepaApprovalOption: 'I agree to terms',
        sepaApprovalHelp:
            'The named account holder authorizes the Lition Energie GmbH to collect payments from his account by direct debit. At the same time, said account holder instructs its credit institution to redeem the direct debits drawn by the supplier into its account. Note: Within eight weeks, starting with the debit date, the reimbursement of the debited amount can be reclaimed. The conditions agreed with the bank apply.',
        submitButton: 'Save'
    },
    profile: {
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        country: '',
        postcode: '',
        city: '',
        street: '',
        streetNumber: '',
        IBAN: ''
    },
    errors: {},
    onSubmit: () => {}
};

export default ProfileForm;
