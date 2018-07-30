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
    commentField: {
        id: 'app.submitMeterReadingsPage.labels.commentField',
        defaultMessage: 'Comment'
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
    commentString: {
        id: 'app.submitMeterReadingsPage.errors.commentString',
        defaultMessage: 'Comment is not a string'
    },
    historyCaption: {
        id: 'app.submitMeterReadingsPage.labels.historyCaption',
        defaultMessage: 'History'
    }
});

export default messages;
