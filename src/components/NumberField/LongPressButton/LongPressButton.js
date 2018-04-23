import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './LongPressButton.css';

const UPDATE_VALUE_INTERVAL = 50; // milliseconds.
const UPDATE_VALUE_DELAY = 300; // milliseconds.

class LongPressButton extends Component {
    constructor(props) {
        super(props);
        this.timeoutId = null;
        this.intervalId = null;
        this.handlePress = this.handlePress.bind(this);
        this.state = {
            isPressed: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        clearTimeout(this.timeoutId);

        const { isPressed } = this.state;

        if (isPressed !== prevState.isPressed) {
            clearTimeout(this.intervalId);
        }

        this.timeoutId = setTimeout(() => {
            if (isPressed) {
                this.intervalId = setInterval(this.handlePress, UPDATE_VALUE_INTERVAL);
            }
        }, UPDATE_VALUE_DELAY);
    }

    handlePress() {
        const { onPress } = this.props;
        if (typeof onPress === 'function') {
            onPress();
        }
    }

    handleMouseDown() {
        this.setState({ isPressed: true });
        this.handlePress();
    }

    handleMouseUp() {
        this.setState({ isPressed: false });
    }

    render() {
        const { className, sign } = this.props;
        const classes = classNames('long-press-button', className);

        return (
            <button
                className={classes}
                onMouseDown={() => this.handleMouseDown()}
                onMouseUp={() => this.handleMouseUp()}
            >
                {sign}
            </button>
        );
    }
}

LongPressButton.propTypes = {
    className: PropTypes.string,
    sign: PropTypes.oneOf(['-', '+']),
    onPress: PropTypes.func
};
LongPressButton.defaultProps = {
    sign: '+'
};

export default LongPressButton;
