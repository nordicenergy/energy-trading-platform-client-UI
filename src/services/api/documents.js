export function getDocuments(/* page */) {
    return new Promise(resolve =>
        setTimeout(resolve, 1000, {
            data: {
                numberOfDocuments: 8,
                documents: [
                    { id: 1, type: 'invoice', date: 1521911833, name: 'Invoice.pdf', description: 'Annual bill' },
                    {
                        id: 2,
                        type: 'archivedDocument',
                        date: 1521911833,
                        name: 'Monthly Installment.pdf',
                        description: 'Annual bill'
                    },
                    { id: 3, type: 'invoice', date: 1521911833, name: 'Annual bill.pdf', description: 'Annual bill' },
                    {
                        id: 4,
                        type: 'invoice',
                        date: 1521911833,
                        name: 'Monthly Installment.pdf',
                        description: 'Annual bill'
                    },
                    {
                        id: 5,
                        type: 'invoice',
                        date: 1521911833,
                        name: 'Monthly Installment.pdf',
                        description: 'Annual bill'
                    },
                    {
                        id: 6,
                        type: 'invoice',
                        date: 1521911833,
                        name: 'Monthly Installment.pdf',
                        description: 'Annual bill'
                    },
                    {
                        id: 7,
                        type: 'archivedDocument',
                        date: 1521911833,
                        name: 'Monthly Installment.pdf',
                        description: 'Annual bill'
                    },
                    { id: 8, type: undefined, date: undefined, name: undefined, description: undefined }
                ]
            }
        })
    );
    // TODO: return Axios.get(`${SESSION_API_URL}/documents/${userId}`);
}
