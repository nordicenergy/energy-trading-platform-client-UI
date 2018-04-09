Breadcrumbs example:

```
const breadcrumbsItems = [
    {
        id: 'trading',
        label: 'Trading',
        type: 'icon',
        path: '#breadcrumbs'
    },
    {
        id: 'wattcoin',
        label: 'Wattcoin',
        type: 'text',
        path: '#breadcrumbs'
    }
];

const iconsTypes = {
    '': 'faHome',
    documents: 'faBook',
    submit_metric: 'faCalculator',
    trading: 'faChartBar',
    profile: 'faUser'
};
const wrapperStyle = {
    backgroundColor: '#051a2d',
    padding: '10px'
};
<div style={wrapperStyle}>
    <Breadcrumbs items={breadcrumbsItems} iconsTypes={iconsTypes}/>
</div>

```
