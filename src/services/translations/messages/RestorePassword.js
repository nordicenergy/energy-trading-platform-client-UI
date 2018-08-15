import { defineMessages } from 'react-intl';

const messages = defineMessages({
    formTitle: {
        id: 'app.restorePasswordPage.formTitle',
        defaultMessage: 'Restore password'
    },
    emailField: {
        id: 'app.restorePasswordPage.emailField',
        defaultMessage: 'Enter Your Email'
    },
    sendButton: {
        id: 'app.restorePasswordPage.sendButton',
        defaultMessage: 'Send'
    },
    loginLink: {
        id: 'app.restorePasswordPage.loginLink',
        defaultMessage: 'Login'
    },
    emptyEmailError: {
        id: 'app.restorePasswordPage.errors.emptyEmail',
        defaultMessage: 'Enter your email.'
    },
    invalidEmailError: {
        id: 'app.restorePasswordPage.errors.invalidEmail',
        defaultMessage: 'Invalid email.'
    },
    tokenWasCreated: {
        id: 'app.restorePasswordPage.info.tokenWasCreated',
        defaultMessage: 'You will receive reset password link on your email'
    }
});

export default messages;
