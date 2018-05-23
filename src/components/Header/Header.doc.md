Header example:

```jsx
<Header locales={['en', 'de']} locale="en" onLocaleChange={() => null} />
```

Header example with breadcrumbs:

```jsx
const breadCrumbs = [
    {
         id: 'trading',
         label: 'Trading',
         icon: 'faChartBar',
         path: '#breadcrumbs'
    },
    {
        id: 'wattcoin',
        label: 'Wattcoin',
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
<Header breadCrumbs={breadCrumbs} iconsTypes={iconsTypes} locales={['en', 'de']} locale="en" onLocaleChange={() => null} />;
```
