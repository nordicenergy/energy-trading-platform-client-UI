```jsx
const tradePositions = [
    {
        offerAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
        producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss',
        offerIssued: parseInt(Date.now() / 1000, 10),
        validOn: parseInt(Date.now() / 1000, 10),
        energyOffered: 3800,
        energyAvailable: 3500,
        price: 3.5
    },
    {
        offerAddress: '0x456f681646d4a755815f9cb19e1acc8565a0c2ac',
        producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss',
        offerIssued: parseInt(Date.now() / 1000, 10),
        validOn: parseInt(Date.now() / 1000, 10),
        energyOffered: 3800,
        energyAvailable: 3500,
        price: 3.5
    },
    {
        offerAddress: '0x789f681646d4a755815f9cb19e1acc8565a0c2ac',
        producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss',
        offerIssued: parseInt(Date.now() / 1000, 10),
        validOn: parseInt(Date.now() / 1000, 10),
        energyOffered: 3800,
        energyAvailable: 3500,
        price: 3.5
    }
];
const sortOptions = [
    { value: 'offerIssued', label: 'Offer Issued' },
    { value: 'validOn', label: 'Valid on' },
    { value: 'energyOffered', label: 'kWh offered' },
    { value: 'energyAvailable', label: 'Energy Available' },
    { value: 'price', label: 'Price' }
];

<div style={{ background: '#f0f4f7', padding: '1rem' }}>
    <TradePositionsList
        sortOptions={sortOptions}
        tradePositions={tradePositions}
        onSortParametersChange={params => console.log(params)}
    />
</div>;
```
