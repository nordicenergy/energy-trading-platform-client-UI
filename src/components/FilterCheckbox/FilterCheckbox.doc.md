#### FilterCheckbox component

```jsx
const wrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 2rem',
    background: '#e9eef2'
};
const itemStyle = {
    marginRight: '0.5rem',
    marginBottom: '0.5rem'
};

<div style={wrapperStyle}>
    <span style={itemStyle}>
        <FilterCheckbox type="all" label="all" />
    </span>
    <span style={itemStyle}>
        <FilterCheckbox type="wind" label="wind" />
    </span>
    <span style={itemStyle}>
        <FilterCheckbox type="solar" label="solar" />
    </span>
    <span style={itemStyle}>
        <FilterCheckbox type="biomass" label="biomass" />
    </span>
    <span style={itemStyle}>
        <FilterCheckbox type="local" label="local production" />
    </span>
    <span style={itemStyle}>
        <FilterCheckbox type="renewable" label="any renewable" />
    </span>
</div>;
```
