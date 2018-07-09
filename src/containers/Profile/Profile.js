import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Validator from 'async-validator';
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
            loading: state.Users.profile.loading,
            error: state.Users.profile.error
        };
    }

    componentDidMount() {
        performGetUserData();
    }

    componentDidUpdate({ loading, profile, error }) {
        const loaded = this.props.loading !== loading && loading;
        if (!this.props.error && loaded && profile !== this.props.profile && this.state.updated) {
            performPushNotification({
                type: 'success',
                message: 'Profile successfully updated.'
            });
            this.setState({
                updated: false
            });
        }
        if (this.props.error && this.props.error !== error) {
            performPushNotification({
                type: 'error',
                message: this.props.error.message
            });
        }

        performSetupLoaderVisibility(this.props.loading);
    }

    prepareValidator() {
        const { formatMessage } = this.context.intl;
        const validationSchema = {
            firstName: {
                type: 'string',
                required: true,
                message: formatMessage(messages.emptyFirstName)
            },
            lastName: {
                type: 'string',
                required: true,
                message: formatMessage(messages.emptyLastName)
            },
            city: {
                type: 'string',
                required: true,
                message: formatMessage(messages.emptyCity)
            },
            street: {
                type: 'string',
                required: true,
                message: formatMessage(messages.emptyStreet)
            },
            streetNumber: {
                type: 'string',
                required: true,
                message: formatMessage(messages.emptyStreetNumber)
            },
            postcode: {
                type: 'string',
                required: true,
                message: formatMessage(messages.emptyPostcode)
            },
            email: [
                {
                    required: true,
                    message: formatMessage(messages.emptyEmail)
                },
                {
                    type: 'email',
                    message: formatMessage(messages.invalidEmail)
                }
            ],
            IBAN: {
                required: true,
                type: 'string',
                message: formatMessage(messages.emptyIban)
            },
            newPassword(rule, value, callback, source) {
                if (source.newPassword !== undefined && source.newPassword.length === 0) {
                    return callback({
                        message: formatMessage(messages.emptyPassword)
                    });
                }
                callback();
            },
            oldPassword(rule, value, callback, source) {
                if (source.oldPassword !== undefined && source.oldPassword.length === 0) {
                    return callback({
                        message: formatMessage(messages.emptyOldPassword)
                    });
                }
                callback();
            },
            confirmNewPassword: [
                {
                    validator(rule, value, callback, source) {
                        if (source.confirmNewPassword !== undefined && source.confirmNewPassword.length === 0) {
                            return callback({
                                message: formatMessage(messages.emptyConfirmPassowrd)
                            });
                        }
                        callback();
                    }
                },
                {
                    validator(rule, value, callback, source) {
                        if (source.newPassword !== source.confirmNewPassword) {
                            return callback({
                                message: formatMessage(messages.passwordsMismatch)
                            });
                        }
                        callback();
                    }
                }
            ]
        };

        return new Validator(validationSchema);
    }

    updateProfile(profile) {
        const validator = this.prepareValidator();

        validator.validate(profile, errors => {
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
                performUpdateUserData(profile);
                this.setState({
                    errors: {},
                    updated: true
                });
            }
        });
    }

    render() {
        const { locale, formatMessage } = this.context.intl;
        const labels = this.prepareLabels(messages);
        const isProfileSuccessfullyUpdated = !this.props.loading && this.state.updated && !this.props.error;
        return (
            <section className="profile-page">
                <h1>{formatMessage(messages.header)}</h1>
                <div className="profile-form-container">
                    <ProfileForm
                        isSuccessfullyUpdated={isProfileSuccessfullyUpdated}
                        locale={locale}
                        labels={labels}
                        profile={this.props.profile}
                        onSubmit={profile => this.updateProfile(profile)}
                        errors={this.state.errors}
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
    error: PropTypes.object
};
Profile.defaultProps = {
    loading: false,
    profile: {},
    error: null
};

export default connect(Profile.mapStateToProps)(Profile);
