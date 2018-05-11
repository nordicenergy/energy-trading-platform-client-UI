Footer example:

```js
const data = {
    dates: [
        '2013-07-30',
        '2013-08-01',
        '2013-08-07',
        '2013-08-09',
        '2013-08-10',
        '2013-08-13',
        '2013-08-19',
        '2013-08-24',
        '2013-08-28',
        '2013-09-01',
        '2013-09-10',
        '2013-09-21',
        '2013-10-12',
        '2013-10-13' ],
    amounts: [ 2000, 2200, 1300, 1600, 1800, 2100, 2000, 2050, 1500, 2050, 2050, 1500, 2300, 2900 ],
};

<div style={{ backgroundColor: '#f3f3f3', padding: '10px' }}>
    <EnergyAmountGraph title="Amount of energy" subtitle="Peter Producer" data={data} />
</div>

```

