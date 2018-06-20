import { documentsReducer, initialState } from '../documents';

const { ACTIONS } = fixtures();

describe('Documents reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_DOCUMENTS', () => {
            const result = documentsReducer(initialState, ACTIONS.getDocuments.pending);
            expect(result.documentsList.loading).toBeTruthy();
            expect(result.documentsList.error).toBeNull();
            expect(result.documentsList.data).toEqual(initialState.documentsList.data);
            ``;
        });
    });

    describe('Error cases:', () => {
        it('should handle GET_DOCUMENTS', () => {
            const result = documentsReducer(initialState, ACTIONS.getDocuments.fail);
            expect(result.documentsList.loading).toBeFalsy();
            expect(result.documentsList.error).toEqual(ACTIONS.getDocuments.fail.error);
            expect(result.documentsList.data).toEqual(initialState.documentsList.data);
        });
    });

    describe('Success cases:', () => {
        it('should handle GET_DOCUMENTS', () => {
            const result = documentsReducer(initialState, ACTIONS.getDocuments.success);
            expect(result.documentsList.loading).toBeFalsy();
            expect(result.documentsList.error).toBeNull();
            expect(result.documentsList.data).toEqual(ACTIONS.getDocuments.success.payload);
        });
    });
});

function fixtures() {
    const ACTIONS = {
        getDocuments: {
            success: {
                type: 'GET_DOCUMENTS',
                payload: {
                    numberOfDocuments: 8,
                    documents: [
                        {
                            id: 1,
                            date: 1521911833,
                            description: 'Annual bill',
                            type: 'invoice',
                            name: 'Invoice'
                        },
                        {
                            id: 2,
                            date: '2017-01-30',
                            description: 'Annual bill',
                            type: 'invoice',
                            name: 'Monthly Installment'
                        }
                    ]
                },
                error: null,
                loading: false,
                meta: [0]
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
