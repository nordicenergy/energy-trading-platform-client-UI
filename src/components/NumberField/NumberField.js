import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NumberField.css';

const UPDATE_VALUE_INTERVAL = 50; // milliseconds.
const UPDATE_VALUE_DELAY = 300; // milliseconds.

class NumberField extends Component {
    constructor(props) {
        super(props);

        this.timeoutId = null;
        this.intervalId = null;
        this.state = {
            value: isNaN(props.defaultValue) ? '' : props.defaultValue,
            valueIsIncrease: false,
            valueIsDecrease: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        clearTimeout(this.timeoutId);

        const { valueIsIncrease, valueIsDecrease } = this.getState();

        if (valueIsIncrease !== prevState.valueIsIncrease || valueIsDecrease !== prevState.valueIsDecrease) {
            clearTimeout(this.intervalId);
        }

        this.timeoutId = setTimeout(() => {
            if (valueIsIncrease || valueIsDecrease) {
                this.intervalId = setInterval(this.changeValue.bind(this), UPDATE_VALUE_INTERVAL);
            }
        }, UPDATE_VALUE_DELAY);
    }

    getStep(value) {
        const { step } = this.props;

        if (step) {
            return step;
        }

        if (!value || (value < 10 && value > -10)) {
            return 0.1;
        }

        if (value < 100 && value > -100) {
            return 1;
        }

        return 10;
    }

    getState() {
        const value = this.props.value || this.state.value;
        return value ? { ...this.state, value } : this.state;
    }

    changeValue() {
        const { onChange } = this.props;
        const { value, valueIsIncrease, valueIsDecrease } = this.getState();
        const valueFloat = isNaN(value) || !value ? 0 : parseFloat(value);
        const step = !valueIsIncrease && valueIsDecrease ? -this.getStep(valueFloat) : this.getStep(valueFloat);
        const changedValue = Number((valueFloat + step).toFixed(1));

        this.setState(
            () => ({ value: changedValue }),
            () => {
                if (typeof onChange === 'function') {
                    onChange(changedValue);
                }
            }
        );
    }

    handleOnChange(event) {
        const { onChange } = this.props;
        const { value } = event.currentTarget;

        this.setState(
            () => ({ value }),
            () => {
                if (typeof onChange === 'function') {
                    onChange(value);
                }
            }
        );
    }

    handleIncreaseMouseDown() {
        this.setState(() => ({ valueIsIncrease: true }), this.changeValue);
    }

    handleIncreaseMouseUp() {
        this.setState(() => ({ valueIsIncrease: false }));
    }

    handleDecreaseMouseDown() {
        this.setState(() => ({ valueIsDecrease: true }), this.changeValue);
    }

    handleDecreaseMouseUp() {
        this.setState(() => ({ valueIsDecrease: false }));
    }

    render() {
        const { className, label, units, id } = this.props;
        const { value } = this.getState();
        const step = this.getStep(value);
        const classes = classNames('number-field', className);

        return (
            <div className={classes}>
                <label className="number-field-label" htmlFor={id}>
                    {label}
                </label>
                <button
                    className="number-field-control number-field-control--minus"
                    onMouseDown={() => this.handleDecreaseMouseDown()}
                    onMouseUp={() => this.handleDecreaseMouseUp()}
                >
                    -
                </button>
                <input
                    className="number-field-input"
                    id={id}
                    type="number"
                    step={step}
                    value={value}
                    onChange={event => this.handleOnChange(event)}
                />
                <button
                    className="number-field-control number-field-control--plus"
                    onMouseDown={() => this.handleIncreaseMouseDown()}
                    onMouseUp={() => this.handleIncreaseMouseUp()}
                >
                    +
                </button>
                {units && <small className="number-field-units">{units}</small>}
            </div>
        );
    }
}

NumberField.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    units: PropTypes.string,
    step: PropTypes.number,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
NumberField.defaultProps = {
    defaultValue: ''
};

export default NumberField;
