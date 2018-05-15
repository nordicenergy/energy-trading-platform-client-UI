```jsx
const tradePosition = {
    offerAddressUrl: 'http://offer.address.test/0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    offerAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    producerUrl: 'http://producer.test/1',
    producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss',
    offerIssued: 'May 06, 2018 3:00',
    validOn: 'May 25, 2018',
    energyOffered: 3800,
    energyAvailable: 3500,
    price: 3.5
};

<div style={{ padding: '1rem' }}>
    <TradePosition tradePosition={tradePosition} />
</div>;
```
