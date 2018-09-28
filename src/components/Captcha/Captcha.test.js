import React from 'react';
import { mount } from 'enzyme';
import googleReCaptcha from '../../services/googleReCaptcha';
import Captcha from './Captcha';

jest.mock('../../services/googleReCaptcha');

const onRender = jest.fn();
const onVerify = jest.fn();

function renderComponent(props = {}, mountFn = mount) {
    return mountFn(<Captcha onRender={onRender} onVerify={onVerify} {...props} />);
}

describe('<Captcha /> component', () => {
    afterEach(() => {
        onRender.mockClear();
        onVerify.mockClear();
        googleReCaptcha.renderWidget.mockClear();
        googleReCaptcha.resetWidget.mockClear();
        googleReCaptcha.getResponse.mockClear();
    });

    it('should not throw error if `onRender` property is not given', () => {
        const captcha = renderComponent({ onRender: undefined });

        expect(() => {
            captcha.props().onRender();
        }).not.toThrow();
    });

    it('should not throw error if `onVerify` property is not given', () => {
        const captcha = renderComponent({ onVerify: undefined });

        expect(() => {
            captcha.props().onVerify();
        }).not.toThrow();
    });

    it('should render without errors', () => {
        const captcha = renderComponent();
        const [[container, parameters, callback]] = googleReCaptcha.renderWidget.mock.calls;

        expect(container).toBe(container);
        expect(parameters).toEqual({
            theme: 'light',
            size: 'normal',
            tabindex: 0,
            callback: onVerify
        });
        expect(callback).toEqual(expect.any(Function));

        callback(1);

        expect(onRender).toHaveBeenCalled();
        expect(captcha.instance().widgetId).toBe(1);
    });

    it('should render with error message', () => {
        const captcha = renderComponent({ error: 'accept the terms' });

        expect(captcha.contains(<small className="captcha-error">accept the terms</small>)).toBeTruthy();
    });

    it('should reset reCAPTCHA widget', () => {
        const captcha = renderComponent();
        captcha.instance().widgetId = 1;
        captcha.instance().reset();

        expect(googleReCaptcha.resetWidget).toHaveBeenCalledWith(1);
    });

    it('should return reCAPTCHA response', () => {
        const captcha = renderComponent();
        captcha.instance().widgetId = 1;
        googleReCaptcha.getResponse.mockReturnValue('abc');

        expect(captcha.instance().getResponse()).toBe('abc');
        expect(googleReCaptcha.getResponse).toHaveBeenCalledWith(1);
    });
});
