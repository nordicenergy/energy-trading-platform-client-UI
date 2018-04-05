import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast } from '../../components';
import { Transition } from 'react-transition-group';

const animationDuration = 300; // 300 milliseconds
const defaultStyle = {
    transition: `transform ${animationDuration}ms`,
    transform: 'translateY(-100%)'
};
const transitionStyles = {
    entering: { transform: 'translateY(-100%)' },
    entered: { transform: 'translateY(0)' }
};

class Notification extends Component {
    constructor(props) {
        super(props);
        this.autoHideTimeout = null;
        this.state = {
            animationEnded: !props.open
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            this.setAutoHideTimeout();
            this.setState({ animationEnded: false });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.autoHideTimeout);
    }

    componentDidMount() {
        const { notification } = this.props;
        if (notification) {
            this.setAutoHideTimeout();
        }
    }

    setAutoHideTimeout() {
        const { autoHideTimeout } = this.props;
        clearTimeout(this.autoHideTimeout);
        this.autoHideTimeout = setTimeout(
            this.props.onClose,
            autoHideTimeout
        );
    }

    handleExited() {
        this.setState({ animationEnded: true });
        this.props.onClose();
    }

    renderToast(state) {
        const style = { ...defaultStyle, ...transitionStyles[state] };
        const { notification: { type, message } } = this.props;

        return (
            <div style={style}>
                <Toast type={type} message={message} />
            </div>
        );
    }

    render() {
        const { open, notification } = this.props;

        if ((!open && this.state.animationEnded) || !notification) {
            return null;
        }

        return <Transition appear in={open} timeout={animationDuration} onExited={() => this.handleExited()}>
                {state => this.renderToast(state)}
            </Transition>;
    }
}

Notification.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    notification: PropTypes.object,
    autoHideTimeout: PropTypes.number
};
Notification.defaultProps = {
    notification: null,
    autoHideTimeout: 10000 // 10 seconds
};

export default Notification;
