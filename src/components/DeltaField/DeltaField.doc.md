```jsx
const labels = {
    beforeLabel: 'Current Market Price:',
    inputLabel: 'Delta to Market Price',
    afterLabel: 'Sale price:',
    units: 'cent'
};

<div style={{ maxWidth: 570 }}>
    <DeltaField labels={labels} />
</div>
```

#### DeltaField without units

```jsx
const labels = {
    beforeLabel: 'Current Market Price:',
    inputLabel: 'Delta to Market Price',
    afterLabel: 'Sale price:',
};

<div style={{ maxWidth: 570 }}>
    <DeltaField labels={labels} />
</div>
```
