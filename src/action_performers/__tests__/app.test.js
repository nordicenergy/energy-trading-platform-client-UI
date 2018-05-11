import { dispatcher } from '../../store';
import { performSetupBreadcrumbs, performSetupLocale } from '../app';

describe('Users action performers', () => {
    beforeEach(() => {
        dispatcher.dispatchAction = jest.fn();
        dispatcher.dispatchPromise = jest.fn();
    });

    it('should call dispatch method for get user data', () => {
        performSetupBreadcrumbs([
            {
                id: 'testId',
                label: 'Test',
                path: '/test'
            }
        ]);

        const [firstCall] = dispatcher.dispatchAction.mock.calls;
        const [type, meta] = firstCall;
        expect(dispatcher.dispatchAction.mock.calls.length).toEqual(1);
        expect(type).toEqual('SETUP_BREADCRUMBS');
        expect(meta).toEqual([
            {
                id: 'testId',
                label: 'Test',
                path: '/test'
            }
        ]);
    });

    it('should call dispatch method for get localization content', () => {
        performSetupLocale('en');

        const [[method, type, loadingFunc, meta]] = dispatcher.dispatchPromise.mock.calls;
        const loading = loadingFunc({
            App: { localization: { loading: 'TEST' } }
        });

        expect(dispatcher.dispatchPromise).toHaveBeenCalledTimes(1);
        expect(method.name).toEqual('getLocalizationContent');
        expect(type).toEqual('SETUP_LOCALE');
        expect(loading).toEqual('TEST');
        expect(meta).toEqual(['en']);
    });
});
