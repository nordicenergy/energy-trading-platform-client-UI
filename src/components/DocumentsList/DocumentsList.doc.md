DocumentsList example (without pagination):
```
const documents = [
    { id: '1', date: 1523707200, description: 'Invoice', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '2', date: 1523807200, description: 'Monthly Installment', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '3', date: 1523907200, description: 'Annual bill', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '4', date: 1523207200, description: 'Monthly Installment', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '5', date: 1523307200, description: 'Monthly Installment', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '6', date: 1523407200, description: 'Monthly Installment', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '7', date: 1523507200, description: 'Monthly Installment', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '8', date: undefined, description: undefined, url: undefined }
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
    { id: '1', date: 1523707200, description: 'Invoice', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '2', date: 1523807200, description: 'Monthly Installment', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '3', date: 1523907200, description: 'Annual bill', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '4', date: 1523207200, description: 'Monthly Installment', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '5', date: 1523307200, description: 'Monthly Installment', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '6', date: 1523407200, description: 'Monthly Installment', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '7', date: 1523507200, description: 'Monthly Installment', url: 'https://www.dbs.com.sg/treasures/aics/pdfController.page?pdfpath=/content/article/pdf/AIO/AIO_2016/SECTOR-19-001-blockchain-lowres.pdf' },
    { id: '8', date: undefined, description: undefined, url: undefined }
];

const wrapperStyles = {
    backgroundColor: '#F0F4F7',
    padding: '20px'
};
<div style={wrapperStyles}>
    <DocumentsList pagination loading documents={documents} />
</div> 
```
