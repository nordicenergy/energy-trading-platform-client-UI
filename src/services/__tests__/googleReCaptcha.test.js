import googleReCaptcha from '../googleReCaptcha';

describe('googleReCaptcha Service', () => {
    it('should load all dependencies and render widgets', async () => {
        const widget1Container = document.createElement('div');
        const widget2Container = document.createElement('div');
        const widget3Container = document.createElement('div');
        const renderWidgetMock = (widgetContainer, parameters) =>
            new Promise(resolve => {
                googleReCaptcha.renderWidget(widgetContainer, parameters, widgetId => {
                    resolve(widgetId);
                });
            });
        const scriptMock = document.createElement('script');
        jest.spyOn(document, 'createElement').mockReturnValue(scriptMock);
        jest.spyOn(document.body, 'appendChild').mockImplementation(() => {
            window.grecaptcha = {
                ready: jest.fn().mockImplementation(callback => callback()),
                render: jest
                    .fn()
                    .mockImplementationOnce((container, parameters) => {
                        expect(container).toBe(widget1Container);
                        expect(parameters).toEqual({ sitekey: process.env.REACT_APP_SITE_KEY, theme: 'dark' });
                        return 1;
                    })
                    .mockImplementationOnce((container, parameters) => {
                        expect(container).toBe(widget2Container);
                        expect(parameters).toEqual({ sitekey: process.env.REACT_APP_SITE_KEY, size: 'compact' });
                        return 2;
                    })
                    .mockImplementationOnce((container, parameters) => {
                        expect(container).toBe(widget3Container);
                        expect(parameters).toEqual({
                            sitekey: process.env.REACT_APP_SITE_KEY,
                            theme: 'light',
                            size: 'compact'
                        });
                        return 3;
                    })
            };

            setTimeout(() => scriptMock.dispatchEvent(new Event('load')), 0);
        });

        expect(
            await Promise.all([
                renderWidgetMock(widget1Container, { theme: 'dark' }),
                renderWidgetMock(widget2Container, { size: 'compact' })
            ])
        ).toEqual([1, 2]);
        expect(await renderWidgetMock(widget3Container, { theme: 'light', size: 'compact' })).toBe(3);
        expect(document.body.appendChild).toHaveBeenCalledTimes(1);

        document.createElement.mockRestore();
        document.body.appendChild.mockRestore();
    });

    it('should reset widget by widget identifier', () => {
        window.grecaptcha = { reset: jest.fn() };
        googleReCaptcha.isGoogleReCaptchaReady = false;
        googleReCaptcha.resetWidget(3);

        expect(window.grecaptcha.reset).not.toHaveBeenCalled();

        googleReCaptcha.isGoogleReCaptchaReady = true;
        googleReCaptcha.resetWidget(3);

        expect(window.grecaptcha.reset).toHaveBeenCalledWith(3);
    });

    it('should return response by widget identifier', () => {
        window.grecaptcha = { getResponse: jest.fn().mockReturnValue('abc') };
        googleReCaptcha.isGoogleReCaptchaReady = false;
        googleReCaptcha.getResponse(3);

        expect(window.grecaptcha.getResponse).not.toHaveBeenCalled();

        googleReCaptcha.isGoogleReCaptchaReady = true;
        const response = googleReCaptcha.getResponse(3);

        expect(window.grecaptcha.getResponse).toHaveBeenCalledWith(3);
        expect(response).toBe('abc');
    });
});
