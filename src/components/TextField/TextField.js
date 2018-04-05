import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TextField.css';

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false
        };
    }

    handleFocus(event) {
        const { onFocus } = this.props;
        this.setState({ focused: true });

        if (typeof onFocus === 'function') {
            onFocus(event);
        }
    }

    handleBlur(event) {
        const { onBlur } = this.props;
        this.setState({ focused: false });

        if (typeof onBlur === 'function') {
            onBlur(event);
        }
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
            onChange,
            addon,
            helperText,
            error,
            ...otherProps
        } = this.props;
        const { focused } = this.state;
        const classes = classNames(
            'text-field',
            focused && 'text-field--focused',
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
                            {...otherProps}
                            className="text-field-input"
                            id={id}
                            disabled={disabled}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            onFocus={event => this.handleFocus(event)}
                            onBlur={event => this.handleBlur(event)}
                        />
                        {addon && (
                            <span className="text-field-addon">{addon}</span>
                        )}
                    </div>
                </label>
                {helperText && (
                    <p className="text-field-helper-text">{helperText}</p>
                )}
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
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    addon: PropTypes.string,
    helperText: PropTypes.node,
    error: PropTypes.string
};
TextField.defaultProps = {
    darkMode: false,
    type: 'text',
    disabled: false
};

export default TextField;
