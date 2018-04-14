import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Validator from 'async-validator';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { performGetUserData, performUpdateUserData } from '../../action_performers/users';
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

    componentDidUpdate({ loading, error }) {
        const loaded = this.props.loading !== loading && !loading;
        if (loaded && this.state.updated) {
            performPushNotification({
                type: 'success',
                message: 'Profile successfully updated.'
            });
            this.setState({
                updated: false
            });
        }
        if (this.props.error && this.props.error.message) {
            performPushNotification({
                type: 'error',
                message: this.props.error.message
            });
        }
    }

    prepareLabels() {
        const { formatMessage } = this.context.intl;
        const entries = Object.keys(messages).map(key => [key, messages[key]]);

        return entries.reduce((labels, [labelName, messageDescriptor]) => {
            return {
                ...labels,
                [labelName]: formatMessage(messageDescriptor)
            };
        }, {});
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
            password(rule, value, callback, source) {
                if (source.password !== undefined && source.password.length === 0) {
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
                        if (source.password !== source.confirmNewPassword) {
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
                this.setState({
                    errors: {},
                    updated: true
                });
                performUpdateUserData(profile);
            }
        });
    }

    render() {
        const { locale } = this.context.intl;
        const labels = this.prepareLabels();
        return (
            <div className="profile-page">
                <h1>Profile</h1>
                <div className="profile-form-container">
                    <ProfileForm
                        locale={locale}
                        labels={labels}
                        profile={this.props.profile}
                        onSubmit={profile => this.updateProfile(profile)}
                        errors={this.state.errors}
                    />
                </div>
            </div>
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
