import { documentsReducer, initialState } from '../documents';

const { ACTIONS } = fixtures();

describe('Documents reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_DOCUMENTS', () => {
            const result = documentsReducer(initialState, ACTIONS.getDocuments.pending);
            expect(result.documents.loading).toBeTruthy();
            expect(result.documents.error).toBeNull();
            expect(result.documents.data).toEqual(initialState.documents.data);
        });
    });

    describe('Error cases:', () => {
        it('should handle GET_DOCUMENTS', () => {
            const result = documentsReducer(initialState, ACTIONS.getDocuments.fail);
            expect(result.documents.loading).toBeFalsy();
            expect(result.documents.error).toEqual(ACTIONS.getDocuments.fail.error);
            expect(result.documents.data).toEqual(initialState.documents.data);
        });
    });

    describe('Success cases:', () => {
        it('should handle GET_DOCUMENTS', () => {
            const result = documentsReducer(initialState, ACTIONS.getDocuments.success);
            expect(result.documents.loading).toBeFalsy();
            expect(result.documents.error).toBeNull();
            expect(result.documents.data).toEqual(ACTIONS.getDocuments.success.payload.documents);
        });
    });
});

function fixtures() {
    const ACTIONS = {
        getDocuments: {
            success: {
                type: 'GET_DOCUMENTS',
                payload: {
                    documents: [
                        {
                            id: 1,
                            dateOfCreation: '2017-01-31',
                            Name: 'Invoice',
                            link: '/test1.pdf'
                        },
                        {
                            id: 2,
                            dateOfCreation: '2017-01-30',
                            Name: 'Monthly Installment',
                            link: '/test2.pdf'
                        }
                    ]
                },
                error: null,
                loading: false
            },
            fail: {
                type: 'GET_DOCUMENTS',
                payload: null,
                error: { message: 'Response error' },
                loading: false
            },
            pending: {
                type: 'GET_DOCUMENTS',
                payload: null,
                error: null,
                loading: true
            }
        }
    };
    return { ACTIONS };
}
