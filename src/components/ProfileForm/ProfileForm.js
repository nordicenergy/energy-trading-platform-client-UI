import React from 'react';
import PropTypes from 'prop-types';
import './ProfileForm.css';
import { TextField, Button, DateField } from '../';

class ProfileForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            birthday: '',
            IBAN: '',
            email: '',
            street: '',
            postcode: '',
            city: '',
            streetNumber: '',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            isEdited: false
        };
    }

    componentDidUpdate() {
        const { profile = {} } = this.props;
        if (!this.state.isEdited) {
            this.setState({
                ...this.state,
                ...profile
            });
        }
    }

    handleChange(event) {
        const { name, value } = event.currentTarget;
        if (this.state.isEdited) {
            this.setState({ [name]: value });
        } else {
            this.setState({
                [name]: value,
                isEdited: true
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            props: { onSubmit },
            state: {
                firstName,
                lastName,
                birthday,
                IBAN,
                email,
                street,
                postcode,
                city,
                streetNumber,
                newPassword,
                confirmNewPassword,
                oldPassword
            }
        } = this;
        if (oldPassword.length || newPassword.length || confirmNewPassword.length) {
            onSubmit({
                firstName,
                lastName,
                birthday,
                IBAN,
                email,
                street,
                postcode,
                city,
                streetNumber,
                password: newPassword,
                confirmNewPassword,
                oldPassword
            });
        } else {
            onSubmit({
                firstName,
                lastName,
                birthday,
                IBAN,
                email,
                street,
                postcode,
                city,
                streetNumber
            });
        }
    }

    handleDateChange(date) {
        this.setState({
            birthday: date,
            isEdited: true
        });
    }

    render() {
        const {
            state: {
                firstName,
                lastName,
                birthday,
                IBAN,
                email,
                street,
                postcode,
                city,
                streetNumber,
                oldPassword,
                newPassword,
                confirmNewPassword
            },
            props: { labels, errors, locale }
        } = this;
        return (
            <form onSubmit={event => this.handleSubmit(event)} className="profile-form" noValidate>
                <TextField
                    label={labels.firstName}
                    name="firstName"
                    value={firstName}
                    onChange={event => this.handleChange(event)}
                    required
                    error={errors.firstName}
                />
                <TextField
                    label={labels.lastName}
                    name="lastName"
                    value={lastName}
                    onChange={event => this.handleChange(event)}
                    required
                    error={errors.lastName}
                />

                <div className="date-of-birth-wrapper">
                    <DateField
                        locale={locale}
                        name="birthday"
                        label={labels.birthday}
                        value={birthday}
                        renderTo={'.profile-form'}
                        onOk={date => this.handleDateChange(date)}
                    />
                </div>
                <TextField
                    label={labels.city}
                    name="city"
                    value={city}
                    error={errors.city}
                    onChange={event => this.handleChange(event)}
                />
                <TextField
                    label={labels.street}
                    name="street"
                    value={street}
                    error={errors.street}
                    onChange={event => this.handleChange(event)}
                />
                <TextField
                    label={labels.streetNumber}
                    name="streetNumber"
                    value={streetNumber}
                    error={errors.streetNumber}
                    onChange={event => this.handleChange(event)}
                />
                <TextField
                    label={labels.postcode}
                    name="postcode"
                    value={postcode}
                    error={errors.postcode}
                    onChange={event => this.handleChange(event)}
                />
                <TextField
                    label={labels.iban}
                    name="IBAN"
                    value={IBAN}
                    error={errors.IBAN}
                    required
                    onChange={event => this.handleChange(event)}
                />
                <TextField
                    label={labels.email}
                    name="email"
                    type="email"
                    value={email}
                    error={errors.email}
                    required
                    onChange={event => this.handleChange(event)}
                />
                <div className="change-password-container">
                    <TextField
                        label={labels.oldPassword}
                        name="oldPassword"
                        type="password"
                        error={errors.oldPassword}
                        value={oldPassword}
                        onChange={event => this.handleChange(event)}
                    />
                    <TextField
                        label={labels.newPassword}
                        name="newPassword"
                        type="password"
                        value={newPassword}
                        error={errors.password}
                        onChange={event => this.handleChange(event)}
                    />
                    <TextField
                        label={labels.confirmNewPassword}
                        name="confirmNewPassword"
                        type="password"
                        value={confirmNewPassword}
                        error={errors.confirmNewPassword}
                        onChange={event => this.handleChange(event)}
                    />
                </div>
                <div className="button-container">
                    <Button>{labels.save}</Button>
                </div>
            </form>
        );
    }
}

const profileShape = PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    dateOfBirth: PropTypes.string,
    email: PropTypes.string,
    bankAccountNumber: PropTypes.string
});

const errorsShape = PropTypes.shape({
    labels: PropTypes.object,
    name: PropTypes.string,
    email: PropTypes.string,
    bankAccountNumber: PropTypes.string,
    confirmNewPassword: PropTypes.string
});

ProfileForm.propTypes = {
    profile: profileShape,
    onSubmit: PropTypes.func,
    errors: errorsShape
};

export default ProfileForm;
