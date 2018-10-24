import { defineMessages } from 'react-intl';

const messages = defineMessages({
    overview: {
        id: 'app.menuBar.overview',
        defaultMessage: 'Overview'
    },
    documents: {
        id: 'app.menuBar.documents',
        defaultMessage: 'My Documents'
    },
    submitMeter: {
        id: 'app.menuBar.submitMeter',
        defaultMessage: 'Submit Meter Readings'
    },
    trading: {
        id: 'app.menuBar.trading',
        defaultMessage: 'Trading'
    },
    buyEnergy: {
        id: 'app.menuBar.buyEnergy',
        defaultMessage: 'Buy energy'
    },
    directTrading: {
        id: 'app.menuBar.directTrading',
        defaultMessage: 'Direct Trading'
    },
    profile: {
        id: 'app.menuBar.profile',
        defaultMessage: 'Profile'
    },
    about: {
        id: 'app.footer.about',
        defaultMessage: 'About Us'
    },
    termsAndConditions: {
        id: 'app.footer.termsAndConditions',
        defaultMessage: 'Terms & Conditions'
    },
    faq: {
        id: 'app.footer.faq',
        defaultMessage: 'FAQ'
    },
    address: {
        id: 'app.footer.address',
        defaultMessage: '2018 Lition. All rights reserved.'
    },
    logoutConfirm: {
        id: 'app.header.logoutConfirm',
        defaultMessage: "Are you sure that you'd like to logout from the system?"
    },
    logoutLabel: {
        id: 'app.header.logoutLabel',
        defaultMessage: 'Logout'
    },
    contractLabel: {
        id: 'app.header.contractLabel',
        defaultMessage: 'Vertrag'
    },
    menuBarLabel: {
        id: 'app.header.menuBarLabel',
        defaultMessage: 'Toggle menu sidebar'
    },
    logoutConfirmMessage: {
        id: 'app.header.logoutConfirmMessage',
        defaultMessage: "Are you sure that you'd like to logout from the system?"
    },
    logoutConfirmButton: {
        id: 'app.header.logoutConfirmButton',
        defaultMessage: 'Yes'
    },
    logoutCancelButton: {
        id: 'app.header.logoutCancelButton',
        defaultMessage: 'No'
    },
    defaultErrorMessage: {
        id: 'app.notifications.defaultErrorMessage',
        defaultMessage: 'Internal web server error. Please try to refresh page later or contact administrator.'
    },
    // TODO add to json's
    loadingContractsErrorMessage: {
        id: 'app.notifications.loadingContractsErrorMessage',
        defaultMessage: 'An error occurred while getting contracts data. Please try to refresh page later or contact administrator.'
    },
    setContractErrorMessage: {
        id: 'app.notifications.loadingContractsErrorMessage',
        defaultMessage: 'An error occurred while selecting contract. Please try select contract later or contact administrator.'
    }
});

export default messages;
