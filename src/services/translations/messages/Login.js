import { defineMessages } from 'react-intl';

const messages = defineMessages({
    usernameField: {
        id: 'app.loginPage.usernameField',
        defaultMessage: 'Username'
    },
    passwordField: {
        id: 'app.loginPage.passwordField',
        defaultMessage: 'Password'
    },
    forgotPasswordLink: {
        id: 'app.loginPage.forgotPasswordLink',
        defaultMessage: 'Forgot your password?'
    },
    loginButton: {
        id: 'app.loginPage.loginButton',
        defaultMessage: 'Login'
    },
    emptyUsernameError: {
        id: 'app.loginPage.errors.emptyUsername',
        defaultMessage: 'Enter your username.'
    },
    emptyPasswordError: {
        id: 'app.loginPage.errors.emptyPassword',
        defaultMessage: 'Enter your password.'
    }
});

export default messages;
