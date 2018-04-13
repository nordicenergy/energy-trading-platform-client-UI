import { appReducer, initialState } from '../app';

const { ACTIONS } = fixtures();

describe('App reducer:', () => {
    describe('Breadcrumbs:', () => {
        it('should handle SETUP_BREADCRUMBS', () => {
            const result = appReducer(initialState, ACTIONS.setupBreadcrumbs);
            expect(result.breadCrumbs.data).toEqual(ACTIONS.setupBreadcrumbs.payload);
        });

        it('should handle SETUP_BREADCRUMBS and reset state', () => {
            const result = appReducer(initialState, ACTIONS.resetBreadcrumbs);
            expect(result.breadCrumbs.data).toEqual([]);
        });
    });
});

function fixtures() {
    const ACTIONS = {
        setupBreadcrumbs: {
            type: 'SETUP_BREADCRUMBS',
            payload: [
                {
                    id: 'testId',
                    label: 'Test',
                    path: '/test'
                }
            ]
        },
        resetBreadcrumbs: {
            type: 'SETUP_BREADCRUMBS',
            payload: undefined
        }
    };
    return { ACTIONS };
}
