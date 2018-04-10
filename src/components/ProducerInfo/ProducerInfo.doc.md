ProducerInfo example (square profile image):

```jsx
 
const billProps = {
    labels: {
        name: 'Name',
        price: 'Price',
        energyType: 'Type of energy',
        annualProduction: 'Annual Production',
        purchased: 'Energy purchased',
        capacity: 'Peak Capacity',
        selectedSince: 'Selected since',
        location: 'Location'
    },
    details: {
        name: 'Peter Producer',
        price: 2.4,
        energyType: 'Wind',
        annualProduction: 3000,
        purchased: 1300,
        capacity: 8,
        selectedSince: 'Sep 12 - Feb 22',
        location: 'Lippendorf, Neukieritzsch'
    },
    description: `LTN Supply & Trading is a leading European energy
                  trading house and the interface between the LTN Group's
                  operating companies and global wholesale markets for
                  energy and energy-related raw materials in both their
                  physical and/or derivative forms.`,
    picture: "https://pbs.twimg.com/profile_images/929933611754708992/ioSgz49P_400x400.jpg"
};


<div style={{ backgroundColor: 'white', padding: '10px' }}>
    <ProducerInfo {...billProps} />
</div>
```

ProducerInfo example (rectangle profile image):
```jsx
const lukeProps = {
    labels: {
        name: 'Name',
        price: 'Price',
        energyType: 'Type of energy',
        annualProduction: 'Annual Production',
        purchased: 'Energy purchased',
        capacity: 'Peak Capacity',
        selectedSince: 'Selected since',
        location: 'Location'
    },
    details: {
        name: 'Bernd Ottovordemgentschenfelde',
        price: 2.4,
        energyType: 'Wind',
        annualProduction: 3000,
        purchased: 1300,
        capacity: 8,
        selectedSince: 'Sep 12 - Feb 22',
        location: 'Böhlen, Landkreis Leipzig, Sachsen'
    },
    description: `LTN Supply & Trading is a leading European energy
                  trading house and the interface between the LTN Group's
                  operating companies and global wholesale markets for
                  energy and energy-related raw materials in both their
                  physical and/or derivative forms.`,
    picture: "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg/revision/latest?cb=20170927034529"
};


<div style={{ backgroundColor: 'white', padding: '10px' }}>
    <ProducerInfo {...lukeProps} />
</div>
```

