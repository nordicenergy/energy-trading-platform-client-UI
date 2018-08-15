Example without errors:
```jsx
const labels = {
    meterReadingsField: 'Meter readings',
    dateField: 'Date of reading',
    commentField: 'Comment',
    submitButton: 'Submit',
    meterNumberTitle: 'Number of meter'
};

const props = {
    labels: labels,
    onSubmit: () => {},
    numberOfMeter: 1234,
    locale: 'en',
    isSuccessfullySubmitted: false,
    errors: {}
};

const numberOfMeter = 12343;
const locale = 'en';

<MeterReadingForm {...props} />
```

Example with errors:
```jsx
const labels = {
    meterReadingsField: 'Meter readings',
    dateField: 'Date of reading',
    commentField: 'Comment',
    submitButton: 'Submit',
    meterNumberTitle: 'Number of meter'
};

const props = {
    labels: labels,
    onSubmit: () => {},
    numberOfMeter: 1234,
    locale: 'en',
    isSuccessfullySubmitted: false,
    errors: {
        meterReadings: 'Meter readings is not a number',
        comment: 'Comment is not a string',
        date: 'Date is required'
    }
};

<MeterReadingForm {...props} />
```
