import { defineMessages } from 'react-intl';

const messages = defineMessages({
    header: {
        id: 'app.submitMeterReadingsPage.header',
        defaultMessage: 'Submit Meter Readings'
    },
    meterReadingsField: {
        id: 'app.submitMeterReadingsPage.labels.meterReadingsField',
        defaultMessage: 'Meter readings'
    },
    dateField: {
        id: 'app.submitMeterReadingsPage.labels.dateField',
        defaultMessage: 'Date of reading'
    },
    dateHelperText: {
        id: 'app.submitMeterReadingsPage.labels.dateHelperText',
        defaultMessage: 'Editing format dd.mm.yyyy'
    },
    submitButton: {
        id: 'app.submitMeterReadingsPage.labels.submitButton',
        defaultMessage: 'Submit'
    },
    meterNumberTitle: {
        id: 'app.submitMeterReadingsPage.labels.meterNumberTitle',
        defaultMessage: 'Number of meter'
    },
    incorrectMeterNumber: {
        id: 'app.submitMeterReadingsPage.labels.incorrectMeterNumber',
        defaultMessage: 'Number of meter is still not defined.'
    },
    noData: {
        id: 'app.submitMeterReadingsPage.messages.noData',
        defaultMessage: 'Sorry, not live metering data available for you…'
    },
    meterReadingNumber: {
        id: 'app.submitMeterReadingsPage.errors.meterReadingNumber',
        defaultMessage: 'Meter readings is not a number'
    },
    dateRequired: {
        id: 'app.submitMeterReadingsPage.errors.dateRequired',
        defaultMessage: 'Date is required'
    },
    historyCaption: {
        id: 'app.submitMeterReadingsPage.labels.historyCaption',
        defaultMessage: 'History'
    },
    successMessage: {
        id: 'app.submitMeterReadingsPage.messages.success',
        defaultMessage: 'Meter reading value was successfully saved'
    },
    loadingErrorMessage: {
        id: 'app.submitMeterReadingsPage.errors.loadingErrorMessage',
        defaultMessage:
            "Can't load meter readings data from Lition web server. Please contact administrator to resolve the error."
    },
    submitErrorMessage: {
        id: 'app.submitMeterReadingsPage.errors.submitErrorMessage',
        defaultMessage: 'An error occurred while sending meter readings'
    }
});

export default messages;
