```jsx
const tradePosition = {
    offerAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss',
    offerIssued: parseInt(Date.now() / 1000, 10),
    validOn: parseInt(Date.now() / 1000, 10),
    energyOffered: 3800,
    energyAvailable: 3500,
    price: 3.5
};

<div style={{ padding: '1rem' }}>
    <TradePosition tradePosition={tradePosition} />
</div>;
```
