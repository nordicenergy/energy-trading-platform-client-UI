export function getDocuments(/* userId */) {
    return new Promise(resolve =>
        setTimeout(resolve, 3000, {
            data: {
                documents: [
                    {
                        id: 1,
                        dateOfCreation: '2017-01-31',
                        Name: 'Invoice.pdf',
                        link: '/test1.pdf'
                    },
                    {
                        id: 2,
                        dateOfCreation: '2017-01-30',
                        Name: 'Monthly Installment.pdf',
                        link: '/test2.pdf'
                    },
                    {
                        id: 3,
                        dateOfCreation: '2017-01-29',
                        Name: 'Annual bill.pdf',
                        link: '/test3.pdf'
                    },
                    {
                        id: 4,
                        dateOfCreation: '2017-01-28',
                        Name: 'Monthly Installment.pdf',
                        link: '/test4.pdf'
                    },
                    {
                        id: 5,
                        dateOfCreation: '2017-01-27',
                        Name: 'Monthly Installment.pdf',
                        link: '/test5.pdf'
                    },
                    {
                        id: 6,
                        dateOfCreation: '2017-01-26',
                        Name: 'Monthly Installment.pdf',
                        link: '/test6.pdf'
                    },
                    {
                        id: 7,
                        dateOfCreation: '2017-01-25',
                        Name: 'Monthly Installment.pdf',
                        link: '/test7.pdf'
                    },
                    { id: 8, dateOfCreation: undefined, Name: undefined, url: undefined }
                ]
            }
        })
    );
    // return Axios.get(`${SESSION_API_URL}/documents/${userId}`);
}
