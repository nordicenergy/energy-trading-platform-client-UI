import { aboutUsReducer, initialState } from '../aboutUs';

const ACTIONS = fixtures();

describe('AboutUs reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_ABOUT_US_INFO', () => {
            const result = aboutUsReducer(initialState, ACTIONS.getAboutUsInfo.pending);
            expect(result.loading).toEqual(true);
            expect(result.error).toEqual(null);
            expect(result.data).toEqual([]);
        });
    });

    describe('Error cases:', () => {
        it('should handle GET_ABOUT_US_INFO', () => {
            const result = aboutUsReducer(initialState, ACTIONS.getAboutUsInfo.fail);
            expect(result.loading).toEqual(false);
            expect(result.error).toEqual(ACTIONS.getAboutUsInfo.fail.error);
            expect(result.data).toEqual([]);
        });
    });

    describe('Success cases:', () => {
        it('should handle GET_ABOUT_US_INFO', () => {
            const result = aboutUsReducer(initialState, ACTIONS.getAboutUsInfo.success);
            expect(result.loading).toEqual(false);
            expect(result.error).toEqual(null);
            expect(result.data).toEqual(ACTIONS.getAboutUsInfo.success.payload);
        });
    });
});

function fixtures() {
    return {
        getAboutUsInfo: {
            success: {
                type: 'GET_ABOUT_US_INFO',
                payload: ['test1', 'test2', 'test3'],
                error: null,
                loading: false
            },
            pending: {
                type: 'GET_ABOUT_US_INFO',
                payload: null,
                error: null,
                loading: true
            },
            fail: {
                type: 'GET_ABOUT_US_INFO',
                payload: null,
                error: { message: 'Producer Error Message' },
                loading: false
            }
        }
    };
}
