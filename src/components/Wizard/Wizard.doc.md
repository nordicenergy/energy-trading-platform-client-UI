```jsx
const steps = [
    { number: 1, title: 'Step 1' },
    { number: 2, title: 'Step 2' },
    { number: 3, title: 'Step 3' },
    { number: 4, title: 'Step 4' }
];

<Wizard steps={steps} activeStep={2} succeedSteps={[1]} />;
```
