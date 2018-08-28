import { defineMessages } from 'react-intl';

const messages = defineMessages({
    header: {
        id: 'app.profilePage.header',
        defaultMessage: 'Profile'
    },
    save: {
        id: 'app.profilePage.labels.save',
        defaultMessage: 'Save'
    },
    firstName: {
        id: 'app.profilePage.labels.firstName',
        defaultMessage: 'First name'
    },
    lastName: {
        id: 'app.profilePage.labels.lastName',
        defaultMessage: 'Last name'
    },
    birthday: {
        id: 'app.profilePage.labels.birthday',
        defaultMessage: 'Date of birth'
    },
    iban: {
        id: 'app.profilePage.labels.iban',
        defaultMessage: 'Bank account number'
    },
    email: {
        id: 'app.profilePage.labels.email',
        defaultMessage: 'Email'
    },
    street: {
        id: 'app.profilePage.labels.street',
        defaultMessage: 'Street'
    },
    streetNumber: {
        id: 'app.profilePage.labels.streetNumber',
        defaultMessage: 'Street Number'
    },
    postcode: {
        id: 'app.profilePage.labels.postcode',
        defaultMessage: 'Postcode'
    },
    city: {
        id: 'app.profilePage.labels.city',
        defaultMessage: 'City'
    },
    oldPassword: {
        id: 'app.profilePage.labels.oldPassword',
        defaultMessage: 'Old password'
    },
    newPassword: {
        id: 'app.profilePage.labels.newPassword',
        defaultMessage: 'New password'
    },
    confirmNewPassword: {
        id: 'app.profilePage.labels.confirmNewPassword',
        defaultMessage: 'Repeat new password'
    },
    emptyFirstName: {
        id: 'app.profilePage.errors.firstName',
        defaultMessage: 'Enter your first name.'
    },
    emptyLastName: {
        id: 'app.profilePage.errors.lastName',
        defaultMessage: 'Enter your last name.'
    },
    emptyIban: {
        id: 'app.profilePage.errors.iban',
        defaultMessage: 'Enter your IBAN.'
    },
    emptyStreet: {
        id: 'app.profilePage.errors.street',
        defaultMessage: 'Enter your street.'
    },
    emptyStreetNumber: {
        id: 'app.profilePage.errors.streetNumber',
        defaultMessage: 'Enter your street number.'
    },
    emptyPostcode: {
        id: 'app.profilePage.errors.postcode',
        defaultMessage: 'Enter your postcode.'
    },
    emptyCity: {
        id: 'app.profilePage.errors.city',
        defaultMessage: 'Enter your city.'
    },
    emptyEmail: {
        id: 'app.profilePage.errors.emptyEmail',
        defaultMessage: 'Enter your email.'
    },
    passwordsMismatch: {
        id: 'app.profilePage.errors.passwordsMismatch',
        defaultMessage: "Passwords don't match."
    },
    emptyPassword: {
        id: 'app.profilePage.errors.emptyPassword',
        defaultMessage: 'Enter new password.'
    },
    emptyOldPassword: {
        id: 'app.profilePage.errors.emptyOldPassword',
        defaultMessage: 'Enter old password.'
    },
    emptyConfirmPassowrd: {
        id: 'app.profilePage.errors.emptyConfirmPassowrd',
        defaultMessage: 'Repeat your password.'
    },
    invalidEmail: {
        id: 'app.profilePage.errors.invalidEmail',
        defaultMessage: 'Invalid email address.'
    },
    profileUpdatedMessage: {
        id: 'app.profilePage.notifications.profileUpdated',
        defineMessages: 'Profile successfully updated'
    },
    profileUpdatedErrorMessage: {
        id: 'app.profilePage.errors.profileUpdatedErrorMessage',
        defineMessages: 'An error occurred while updating profile data'
    },
    profileLoadingErrorMessage: {
        id: 'app.profilePage.errors.profileLoadingErrorMessage',
        defineMessages:
            "Can't load profile data from Lition web server. Please contact administrator to resolve the error."
    }
});

export default messages;
