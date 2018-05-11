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

    describe('Pending cases:', () => {
        it('should handle SETUP_LOCALE', () => {
            const result = appReducer(initialState, ACTIONS.setupLocale.pending);
            const [locale] = ACTIONS.setupLocale.fail.meta;
            expect(result.localization.loading).toEqual(true);
            expect(result.localization.error).toEqual(null);
            expect(result.localization.data).toEqual({ ...initialState.localization.data, locale });
        });
    });

    describe('Error cases:', () => {
        it('should handle SETUP_LOCALE', () => {
            const result = appReducer(initialState, ACTIONS.setupLocale.fail);
            const [locale] = ACTIONS.setupLocale.fail.meta;
            expect(result.localization.loading).toEqual(false);
            expect(result.localization.error).toEqual(ACTIONS.setupLocale.fail.error);
            expect(result.localization.data).toEqual({ ...initialState.localization.data, locale });
        });
    });

    describe('Success cases:', () => {
        it('should handle SETUP_LOCALE', () => {
            const result = appReducer(initialState, ACTIONS.setupLocale.success);
            expect(result.localization.loading).toEqual(false);
            expect(result.localization.error).toEqual(null);
            expect(result.localization.data).toEqual({
                ...ACTIONS.setupLocale.success.payload,
                locale: ACTIONS.setupLocale.success.meta[0]
            });
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
        },
        setupLocale: {
            success: {
                type: 'SETUP_LOCALE',
                payload: {
                    aboutUs: 'about us content',
                    FAQ: ['faq 1', 'faq 2']
                },
                error: null,
                loading: false,
                meta: ['en']
            },
            fail: {
                type: 'SETUP_LOCALE',
                payload: null,
                error: { message: 'Response error' },
                loading: false,
                meta: ['en']
            },
            pending: {
                type: 'SETUP_LOCALE',
                payload: null,
                error: null,
                loading: true,
                meta: ['en']
            }
        }
    };
    return { ACTIONS };
}
