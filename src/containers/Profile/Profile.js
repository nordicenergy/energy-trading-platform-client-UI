import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Validator from 'async-validator';
import IBAN from 'iban';
import pick from 'lodash.pick';
import { PAYMENT_METHODS } from '../../constants';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { performGetUserData, performUpdateUserData } from '../../action_performers/users';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import { Profile as messages } from '../../services/translations/messages';
import { ProfileForm } from '../../components';
import './Profile.css';

export class Profile extends AbstractContainer {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: {},
            updated: false
        };
    }

    static mapStateToProps(state) {
        return {
            profile: state.Users.profile.data.user,
            updatedProfile: state.Users.updatedProfile.data.user,
            loading: state.Users.profile.loading || state.Users.updatedProfile.loading,
            loadingError: state.Users.profile.error,
            updatingError: state.Users.updatedProfile.error
        };
    }

    componentDidMount() {
        performGetUserData();
    }

    componentDidUpdate({ loading, updatedProfile, loadingError, updatingError }) {
        const { formatMessage } = this.context.intl;
        const loaded = this.props.loading !== loading && loading;

        if (
            !this.props.loadingError &&
            !this.props.updatingError &&
            loaded &&
            updatedProfile !== this.props.updatedProfile
        ) {
            performPushNotification({ type: 'success', message: formatMessage(messages.profileUpdatedMessage) });
            performGetUserData();
        }

        if (this.props.loadingError && this.props.loadingError !== loadingError) {
            performPushNotification({ type: 'error', message: formatMessage(messages.profileLoadingErrorMessage) });
        }

        if (this.props.updatingError && this.props.updatingError !== updatingError) {
            performPushNotification({
                type: 'error',
                message: `${formatMessage(messages.profileUpdatedErrorMessage)}: [${this.props.updatingError.message}]`
            });
        }

        if (loading !== this.props.loading) {
            performSetupLoaderVisibility(this.props.loading);
        }
    }

    prepareValidator(formData) {
        const { formatMessage } = this.context.intl;
        const validationSchema = {
            firstName: { required: true, message: formatMessage(messages.emptyFirstName) },
            lastName: { required: true, message: formatMessage(messages.emptyLastName) },
            city: { required: true, message: formatMessage(messages.emptyCity) },
            street: { required: true, message: formatMessage(messages.emptyStreet) },
            streetNumber: { required: true, message: formatMessage(messages.emptyStreetNumber) },
            postcode: { required: true, message: formatMessage(messages.emptyPostcode) },
            email: [
                { required: true, message: formatMessage(messages.emptyEmail) },
                { type: 'email', message: formatMessage(messages.invalidEmail) }
            ]
        };

        if (formData.paymentMethod === PAYMENT_METHODS.debit) {
            validationSchema.IBAN = [
                { required: true, message: formatMessage(messages.emptyIban) },
                {
                    validator(rule, value, callback) {
                        const errors = [];

                        if (value && !IBAN.isValid(value)) {
                            errors.push(new Error(`Invalid IBAN value: ${value}`));
                        }

                        callback(errors);
                    },
                    message: formatMessage(messages.invalidIban)
                }
            ];
            validationSchema.sepaApproval = {
                validator(rule, value, callback) {
                    const errors = [];

                    if (!value) {
                        errors.push(new Error('SEPA approval is not accepted'));
                    }

                    callback(errors);
                }
            };
        }

        if (formData.oldPassword || formData.newPassword || formData.confirmNewPassword) {
            validationSchema.newPassword = { required: true, message: formatMessage(messages.emptyPassword) };
            validationSchema.oldPassword = { required: true, message: formatMessage(messages.emptyOldPassword) };
            validationSchema.confirmNewPassword = [
                { required: true, message: formatMessage(messages.emptyConfirmPassowrd) },
                {
                    validator(rule, value, callback, source) {
                        const errors = [];

                        if (value !== source.newPassword) {
                            errors.push(new Error(formatMessage(messages.passwordsMismatch)));
                        }

                        callback(errors);
                    }
                }
            ];
        }

        return new Validator(validationSchema);
    }

    updateProfile(formData) {
        const allowedProperties = [
            'email',
            'firstName',
            'lastName',
            'birthday',
            'country',
            'postcode',
            'city',
            'street',
            'streetNumber',
            'IBAN'
        ];
        const validator = this.prepareValidator(formData);

        validator.validate(formData, errors => {
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
                if (formData.newPassword && formData.oldPassword) {
                    allowedProperties.push('oldPassword', 'newPassword');
                }

                performUpdateUserData(pick(formData, allowedProperties));
                this.setState({ errors: {} });
            }
        });
    }

    render() {
        const { locale, formatMessage } = this.context.intl;
        const labels = this.prepareLabels(messages);

        return (
            <section className="profile-page">
                <header className="profile-page-header">
                    <h1>{formatMessage(messages.header)}</h1>
                </header>
                <div className="profile-page-form">
                    <ProfileForm
                        locale={locale}
                        labels={labels}
                        profile={this.props.profile}
                        errors={this.state.errors}
                        onSubmit={formData => this.updateProfile(formData)}
                    />
                </div>
            </section>
        );
    }
}

Profile.contextTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};

Profile.propTypes = {
    loading: PropTypes.bool,
    profile: PropTypes.object,
    updatedProfile: PropTypes.object,
    loadingError: PropTypes.object,
    updatingError: PropTypes.object
};
Profile.defaultProps = {
    loading: false,
    profile: {},
    updatedProfile: {},
    loadingError: null,
    updatingError: null
};

export default connect(Profile.mapStateToProps)(Profile);
