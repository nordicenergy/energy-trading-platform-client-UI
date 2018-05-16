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
        const { onFocus } = this.props;

        this.setState({ hasFocus: true });
        onFocus && onFocus(event);
    }

    handleBlur(event) {
        const { onBlur } = this.props;

        this.setState({ hasFocus: false });
        onBlur && onBlur(event);
    }

    handleChange(event) {
        const { onChange } = this.props;
        const { value } = event.target;

        this.setState({ value });
        onChange && onChange(event);
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
            addon,
            helperText,
            error,
            onKeyDown
        } = this.props;
        const { value, hasFocus } = this.getState();
        const classes = classNames(
            'text-field',
            hasFocus && 'text-field--focused',
            error && 'text-field--error',
            darkMode && 'text-field--dark',
            disabled && 'text-field--disabled',
            className
        );

        return (
            <div className={classes}>
                <label className="text-field-layout">
                    <strong className="text-field-label">{label}</strong>
                    <span className="text-field-input-group">
                        <input
                            className="text-field-input"
                            id={id}
                            disabled={disabled}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            autoComplete={name}
                            value={value || ''}
                            onChange={event => this.handleChange(event)}
                            onFocus={event => this.handleFocus(event)}
                            onBlur={event => this.handleBlur(event)}
                            onKeyDown={onKeyDown}
                        />
                        {addon && <span className="text-field-addon">{addon}</span>}
                    </span>
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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.string,
    hasFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
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
