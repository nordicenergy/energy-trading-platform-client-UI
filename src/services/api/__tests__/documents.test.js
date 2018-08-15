import Axios from 'axios';
import { getDocuments } from '../documents';

describe('Documents API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
    });

    it('should provide method for getting documents', async () => {
        Axios.get.mockReturnValue(
            Promise.resolve({
                data: {
                    documents: [
                        {
                            id: 1,
                            type: 'invoice',
                            date: 1521911833,
                            name: 'Invoice.pdf',
                            description: 'Annual bill'
                        },
                        {
                            id: 2,
                            type: 'archivedDocument',
                            date: 1521211833,
                            name: 'Monthly Installment.pdf',
                            description: 'Annual bill'
                        }
                    ]
                }
            })
        );

        const documents = await getDocuments(2);

        expect(Axios.get).toHaveBeenCalledWith('/api/documents', { params: { limit: 10, offset: 20 } });

        expect(documents).toEqual({
            data: {
                documents: [
                    {
                        date: 1521911833,
                        description: 'Annual bill',
                        id: 1,
                        name: 'Invoice.pdf',
                        type: 'invoice',
                        url: '/api/documents/download?invoiceID=1'
                    },
                    {
                        date: 1521211833,
                        description: 'Annual bill',
                        id: 2,
                        name: 'Monthly Installment.pdf',
                        type: 'archivedDocument',
                        url: '/api/documents/download?archivedDocumentID=2'
                    }
                ]
            }
        });
    });
});
