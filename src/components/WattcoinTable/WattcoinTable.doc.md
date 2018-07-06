WattcoinTable example:

```jsx
const props = {
          labels: {
              caption: 'Wattcoin',
              producer: 'Producer',
              energyType: 'Type of energy',
              total: 'Total',
              trx: 'Transaction',
              sent: 'Sent',
              received: 'Received',
              button: 'More'
          },
          data: {
              producer: 'Peter Producer',
              type: 'Solar panels',
              total: 0.03,
              count: {
                  trx: 5,
                  sent: 3,
                  received: 6
              }
          },
          onMoreClick: f => f
};


<div style={{ backgroundColor: '#f3f3f3', margin: '10px', padding: '10px', textAlign: 'center' }}>
    <WattcoinTable {...props} />
</div>
```
