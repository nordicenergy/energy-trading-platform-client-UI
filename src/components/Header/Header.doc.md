Header example:

```jsx
<Header locales={['en', 'de']} locale="en" onLocaleChange={() => null} />
```

Header example with breadcrumbs:

```jsx
const path = '/trading/my_producer/john_doe';

const iconsTypes = {
    '': 'faHome',
    documents: 'faBook',
    submit_metric: 'faCalculator',
    trading: 'faChartBar',
    profile: 'faUser'
};
<Header path={path} iconsTypes={iconsTypes} locales={['en', 'de']} locale="en" onLocaleChange={() => null} />;
```
