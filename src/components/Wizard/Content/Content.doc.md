```jsx
<Content
    title="Step title"
    subTitle="Lorem ipsum dolor"
    onPreviousClick={() => alert('Go to previous step')}
    onNextClick={() => alert('Go to next step')}
>
    <div style={{ marginBottom: 56 }}>
        <SelectField label="Select salutation" options={[{ value: 1, label: 'Mr.' }, { value: 2, label: 'Mrs.' }]} />
    </div>
    <div style={{ marginBottom: 56 }}>
        <TextField label="First Name" />
    </div>
    <div>
        <TextField label="Last Name" />
    </div>
</Content>
```
