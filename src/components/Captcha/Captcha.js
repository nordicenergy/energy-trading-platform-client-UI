import React from 'react';
import PropTypes from 'prop-types';
import googleReCaptcha from '../../services/googleReCaptcha';
import './Captcha.css';

class Captcha extends React.Component {
    constructor(props) {
        super(props);
        this.widgetId = null;
    }

    componentDidMount() {
        googleReCaptcha.renderWidget(
            this.captchaContainer,
            {
                theme: this.props.theme,
                size: this.props.size,
                tabindex: this.props.tabIndex,
                callback: this.props.onVerify
            },
            widgetId => {
                this.props.onRender();
                this.widgetId = widgetId;
            }
        );
    }

    reset() {
        googleReCaptcha.resetWidget(this.widgetId);
    }

    getResponse() {
        return googleReCaptcha.getResponse(this.widgetId);
    }

    render() {
        return (
            <div className="captcha">
                {this.props.error && <small className="captcha-error">{this.props.error}</small>}
                <div ref={ref => (this.captchaContainer = ref)} className="captcha-widget" />
            </div>
        );
    }
}

Captcha.propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    size: PropTypes.oneOf(['compact', 'normal']),
    tabIndex: PropTypes.number,
    error: PropTypes.string,
    onRender: PropTypes.func,
    onVerify: PropTypes.func
};
Captcha.defaultProps = {
    theme: 'light',
    size: 'normal',
    tabIndex: 0,
    error: '',
    onRender: () => {},
    onVerify: () => {}
};

export default Captcha;
