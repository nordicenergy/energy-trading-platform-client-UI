```jsx
const profile = {
    email: 'aquaman@example.com',
    firstName: 'Arthur',
    lastName: 'Curry',
    country: 'Germany',
    postcode: '10115',
    city: 'Berlin',
    street: 'justice-league',
    streetNumber: '5',
    birthday: 1535587200,
    IBAN: 'DE89370400440532013000'
};
<ProfileForm profile={profile} onSubmit={formData => console.log(formData)} />;
```
