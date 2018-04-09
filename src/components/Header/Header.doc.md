Header example:

```js
<Header/>
```

Header example with breadcrumbs:

```js
const path = '/trading/my_producer/john_doe';

const iconsTypes = {
    '': 'faHome',
    documents: 'faBook',
    submit_metric: 'faCalculator',
    trading: 'faChartBar',
    profile: 'faUser'
};
<Header path={path} iconsTypes={iconsTypes} />
```
