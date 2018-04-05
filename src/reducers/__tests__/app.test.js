import { appReducer, initialState } from '../app';

const { ACTIONS } = fixtures();

describe('App reducer:', () => {
    describe('Breadcrumbs:', () => {
        it('should handle SETUP_BREADCRUMBS', () => {
            const result = appReducer(initialState, ACTIONS.setupBreadcrumbs);
            expect(result.breadCrumbs.data).toEqual([
                ACTIONS.setupBreadcrumbs.payload
            ]);
        });

        it('should handle SETUP_BREADCRUMBS with dirty state', () => {
            const dirtyState = {
                breadCrumbs: {
                    data: [
                        {
                            id: 'test1',
                            label: 'Test1',
                            path: '/test1'
                        },
                        ACTIONS.setupBreadcrumbs.payload,
                        {
                            id: 'tes2',
                            label: 'Test2',
                            path: '/test2'
                        }
                    ]
                }
            };
            const result = appReducer(dirtyState, ACTIONS.setupBreadcrumbs);
            expect(result.breadCrumbs.data).toEqual([
                {
                    id: 'test1',
                    label: 'Test1',
                    path: '/test1'
                },
                ACTIONS.setupBreadcrumbs.payload
            ]);
        });

        it('should handle SETUP_ROOT_BREADCRUMB', () => {
            const result = appReducer(
                initialState,
                ACTIONS.setupRootBreadcrumb
            );
            expect(result.breadCrumbs.data).toEqual([
                ACTIONS.setupRootBreadcrumb.payload
            ]);
        });

        it('should handle RESET_BREADCRUMBS', () => {
            const result = appReducer(initialState, ACTIONS.resetBreadcrumbs);
            expect(result.breadCrumbs.data).toEqual([]);
        });
    });
});

function fixtures() {
    const ACTIONS = {
        setupBreadcrumbs: {
            type: 'SETUP_BREADCRUMBS',
            payload: {
                id: 'testId',
                label: 'Test',
                path: '/test'
            }
        },
        resetBreadcrumbs: {
            type: 'RESET_BREADCRUMBS'
        },
        setupRootBreadcrumb: {
            type: 'SETUP_ROOT_BREADCRUMB',
            payload: {
                id: 'testId',
                label: 'Test',
                path: '/test'
            }
        }
    };
    return { ACTIONS };
}
