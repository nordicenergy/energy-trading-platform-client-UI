import once from 'lodash.once';
import { GOOGLE_RECAPTCHA_API } from '../constants';

class GoogleReCaptcha {
    constructor() {
        this.renderQueue = [];
        this.isGoogleReCaptchaReady = false;
        this._loadDependencies = once(this._loadDependencies);
        this._handleDependenciesLoad = this._handleDependenciesLoad.bind(this);
    }

    _loadDependencies() {
        const script = document.createElement('script');

        script.src = GOOGLE_RECAPTCHA_API;
        script.setAttribute('async', true);
        script.setAttribute('defer', true);
        script.addEventListener('load', this._handleDependenciesLoad);
        document.body.appendChild(script);
    }

    _handleDependenciesLoad() {
        if (window.grecaptcha && typeof window.grecaptcha.ready === 'function') {
            window.grecaptcha.ready(() => {
                const widgetsCount = this.renderQueue.length;

                for (let i = 0; i < widgetsCount; i += 1) {
                    this.renderQueue[i]();
                }

                this.renderQueue.splice(0, widgetsCount);
                this.isGoogleReCaptchaReady = true;
            });
        }
    }

    renderWidget(widgetContainer, parameters, done) {
        const renderWidget = () => {
            done(
                window.grecaptcha.render(widgetContainer, {
                    ...parameters,
                    sitekey: process.env.REACT_APP_SITE_KEY
                })
            );
        };

        this._loadDependencies();

        if (this.isGoogleReCaptchaReady) {
            renderWidget();
        } else {
            this.renderQueue.push(renderWidget);
        }
    }

    resetWidget(widgetId) {
        if (this.isGoogleReCaptchaReady) {
            window.grecaptcha.reset(widgetId);
        }
    }

    getResponse(widgetId) {
        if (this.isGoogleReCaptchaReady) {
            return window.grecaptcha.getResponse(widgetId);
        }

        return '';
    }
}

export default new GoogleReCaptcha();
