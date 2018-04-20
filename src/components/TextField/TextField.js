import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import './TextField.css';

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
            hasFocus: props.hasFocus
        };
    }

    getState() {
        return { ...this.state, ...pick(this.props, ['value', 'hasFocus']) };
    }

    handleFocus(event) {
        this.setState(
            () => ({ hasFocus: true }),
            () => {
                const { onFocus } = this.props;
                if (typeof onFocus === 'function') {
                    onFocus(event);
                }
            }
        );
    }

    handleBlur(event) {
        this.setState(
            () => ({ hasFocus: false }),
            () => {
                const { onBlur } = this.props;
                if (typeof onBlur === 'function') {
                    onBlur(event);
                }
            }
        );
    }

    handleChange(event) {
        const { value } = event.currentTarget;

        this.setState(
            () => ({ value }),
            () => {
                const { onChange } = this.props;
                if (typeof onChange === 'function') {
                    onChange(event);
                }
            }
        );
    }

    render() {
        const {
            className,
            darkMode,
            label,
            id,
            type,
            name,
            disabled,
            placeholder,
            value,
            addon,
            helperText,
            error
        } = this.props;
        const { hasFocus } = this.getState();
        const classes = classNames(
            'text-field',
            hasFocus && 'text-field--focused',
            error && 'text-field--error',
            darkMode && 'text-field--dark',
            className
        );

        return (
            <div className={classes}>
                <label className="text-field-layout">
                    <strong className="text-field-label">{label}</strong>
                    <div className="text-field-input-group">
                        <input
                            className="text-field-input"
                            id={id}
                            disabled={disabled}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={value}
                            onChange={event => this.handleChange(event)}
                            onFocus={event => this.handleFocus(event)}
                            onBlur={event => this.handleBlur(event)}
                        />
                        {addon && <span className="text-field-addon">{addon}</span>}
                    </div>
                </label>
                {helperText && <p className="text-field-helper-text">{helperText}</p>}
                {error && (
                    <div role="alert" className="text-field-error">
                        {error}
                    </div>
                )}
            </div>
        );
    }
}

TextField.propTypes = {
    className: PropTypes.string,
    darkMode: PropTypes.bool,
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    hasFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    addon: PropTypes.node,
    helperText: PropTypes.node,
    error: PropTypes.string
};
TextField.defaultProps = {
    darkMode: false,
    type: 'text',
    disabled: false,
    defaultValue: ''
};

export default TextField;
