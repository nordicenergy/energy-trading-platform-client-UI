Example with data:
```jsx
const props = {
    title: 'History',
    consumptionUnitLabel: 'kWh',
    noDataMessage: 'message',
    data: [
        {
            date: 1521911833,
            consumption: 9950.3
        },
        {
            date: 1522911833,
            consumption: 9600.7
        },
        {
            date: 1623911833,
            consumption: 9600.6   
         },
         {
            date: 1724911833,
            consumption: 0
         },
         {
            date: '',
            consumption: null
         },
         {
            date: undefined,
            consumption: undefined
         }
    ]
};

<div style={{ backgroundColor: 'white', padding: '10px', 'maxWidth': '356px' }}>
    <MeterReadingsHistory {...props} />
</div>;
```

Example without data:
```jsx
const props = {
    title: 'History',
    consumptionUnitLabel: 'kWh',
    noDataMessage: 'Sorry, not live metering data available for you…',
    data: []
};
<div style={{ backgroundColor: 'white', padding: '10px', 'maxWidth': '356px' }}>
    <MeterReadingsHistory {...props} />
</div>;
```
