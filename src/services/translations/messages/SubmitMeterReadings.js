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
    submitButton: {
        id: 'app.submitMeterReadingsPage.labels.submitButton',
        defaultMessage: 'Submit'
    },
    meterNumberTitle: {
        id: 'app.submitMeterReadingsPage.labels.meterNumberTitle',
        defaultMessage: 'Number of meter'
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
    }
});

export default messages;
