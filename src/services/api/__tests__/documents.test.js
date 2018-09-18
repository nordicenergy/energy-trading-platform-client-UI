import Axios from 'axios';
import { getDocuments, downloadDocument } from '../documents';

describe('Documents API Service', () => {
    const setAttributeSpy = jest.fn();
    const clickSpy = jest.fn();
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
        jest.spyOn(document, 'createElement').mockReturnValue({ setAttribute: setAttributeSpy, click: clickSpy });
    });

    afterAll(() => {
        Axios.get.mockRestore();
        document.document.mockRestore();
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
                            type: 'archived',
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
                        type: 'archived',
                        url: '/api/documents/download?archivedDocumentID=2'
                    }
                ]
            }
        });
    });

    it('should provide method for download document', async () => {
        Axios.get.mockReturnValue(Promise.resolve({ data: 'file' }));

        const documents = await downloadDocument('url', 'name');

        expect(Axios.get).toHaveBeenCalledWith('url', { responseType: 'blob' });
        expect(Blob).toHaveBeenCalledWith(['file'], { type: 'application/pdf' });

        expect(documents).toEqual(undefined);

        expect(setAttributeSpy).toHaveBeenCalledTimes(2);
        expect(setAttributeSpy.mock.calls).toEqual([['href', undefined], ['download', 'name.pdf']]);
        expect(clickSpy).toHaveBeenCalledTimes(1);
    });
});
