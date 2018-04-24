import { dispatcher } from '../../store';

import { performGetAboutUsInfo } from '../aboutUs';

describe('About Us action performers', () => {
    beforeEach(() => {
        dispatcher.dispatchPromise = jest.fn();
    });

    it('should call dispatch method for getting about us information', () => {
        performGetAboutUsInfo('en');

        const [firstCall] = dispatcher.dispatchPromise.mock.calls;
        const [method, type, loadingFunc, meta] = firstCall;
        const loading = loadingFunc({
            AboutUs: { loading: 'TEST' }
        });

        expect(dispatcher.dispatchPromise.mock.calls.length).toEqual(1);
        expect(method.name).toEqual('getAboutUsInfo');
        expect(type).toEqual('GET_ABOUT_US_INFO');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(['en']);
    });
});
