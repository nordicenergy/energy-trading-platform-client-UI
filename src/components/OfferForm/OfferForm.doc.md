```jsx
<OfferForm onSubmit={formData => console.log(formData)} />
```

#### OfferForm with delete button

```jsx
const labels = {
    salePriceFieldBefore: 'Current Market Price:',
    salePriceField: 'Delta to Market Price',
    salePriceFieldAfter: 'Sale price:',
    salePriceFieldUnits: 'cent',
    plantTypeField: 'Type of energy',
    nameField: 'Name',
    annualProductionField: 'Annual Production',
    capacityField: 'Peak Capacity',
    dateField: 'Selected since',
    cityField: 'City',
    streetField: 'Street',
    postcodeField: 'Postcode',
    descriptionField: 'Description',
    submitButton: 'Save',
    deleteButton: 'Delete the offer'
};
const formData = {
    salePrice: 2.9,
    plantType: 'biomass',
    annualProduction: '47.8',
    capacity: '312',
    date: parseInt(Date.now() / 1000, 10),
    location: 'Lorem Ipsum Country'
};
<OfferForm
    labels={labels}
    marketPrice={2.5}
    formData={formData}
    onSubmit={formData => console.log(formData)}
    onDelete={() => alert('delete')}
/>;
```
