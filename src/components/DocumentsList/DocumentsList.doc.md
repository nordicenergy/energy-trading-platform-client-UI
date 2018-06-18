DocumentsList example (without pagination):
```
const documents = [
    { id: 1, dateOfCreation: '2017-01-31', Name: 'Invoice', link: '/test1.pdf' },
    { id: 2, dateOfCreation: '2017-02-31', Name: 'Monthly Installment', link: '/test2.pdf' },
    { id: 3, dateOfCreation: '2017-03-31', Name: 'Annual bill', link: '/test3.pdf' },
    { id: 4, dateOfCreation: '2017-04-31', Name: 'Monthly Installment', link: '/test4.pdf' },
    { id: 5, dateOfCreation: '2017-05-31', Name: 'Monthly Installment', link: '/test5.pdf' },
    { id: 6, dateOfCreation: '2017-06-31', Name: 'Monthly Installment', link: '/test6.pdf' },
    { id: 7, dateOfCreation: '2017-07-31', Name: 'Monthly Installment', link: '/test7.pdf' },
    { id: 8, dateOfCreation: undefined, Name: undefined, link: undefined }
];

const wrapperStyles = {
    backgroundColor: '#F0F4F7',
    padding: '20px'
};
<div style={wrapperStyles}>
    <DocumentsList documents={documents} />
</div> 
```


DocumentsList example (extended, with pagination):
```
const documents = [
    { id: 1, dateOfCreation: '2017-01-31', Name: 'Invoice', link: '/test1.pdf' },
    { id: 2, dateOfCreation: '2017-02-31', Name: 'Monthly Installment', link: '/test2.pdf' },
    { id: 3, dateOfCreation: '2017-03-31', Name: 'Annual bill', link: '/test3.pdf' },
    { id: 4, dateOfCreation: '2017-04-31', Name: 'Monthly Installment', link: '/test4.pdf' },
    { id: 5, dateOfCreation: '2017-05-31', Name: 'Monthly Installment', link: '/test5.pdf' },
    { id: 6, dateOfCreation: '2017-06-31', Name: 'Monthly Installment', link: '/test6.pdf' },
    { id: 7, dateOfCreation: '2017-07-31', Name: 'Monthly Installment', link: '/test7.pdf' },
    { id: 8, dateOfCreation: undefined, Name: undefined, link: undefined }
];

const wrapperStyles = {
    backgroundColor: '#F0F4F7',
    padding: '20px'
};
<div style={wrapperStyles}>
    <DocumentsList pagination loading documents={documents} />
</div> 
```
