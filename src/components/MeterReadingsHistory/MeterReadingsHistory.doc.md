MeterReadingsHistory example:

```jsx
const props = {
    title: 'History',
    consumptionUnitLabel: 'kWh',
    data: [
        {
            date: 1521911833,
            value: 9950.3
        },
        {
            date: 1522911833,
            value: 9600.7
        },
        {
            date: 1623911833,
            value: 9600.6   
         },
         {
            date: 1724911833,
            value: 0
         },
         {
            date: '',
            value: null
         },
         {
            date: undefined,
            value: undefined
         }
    ]
};

<div style={{ backgroundColor: 'white', padding: '10px', 'maxWidth': '356px' }}>
    <MeterReadingsHistory {...props} />
</div>;
```
