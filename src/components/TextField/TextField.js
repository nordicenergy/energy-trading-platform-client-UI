import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TextField.css';

const TextField = props => {
    const {
        className,
        label,
        id,
        type,
        name,
        disabled,
        placeholder,
        value,
        onChange,
        onFocus,
        onBlur,
        helperText,
        ...otherProps
    } = props;
    const classes = classNames('text-field', className);

    return (
        <div className={classes} {...otherProps}>
            <label className="input-wrapper">
                <strong className="label">{label}</strong>
                <input
                    className="input"
                    id={id}
                    disabled={disabled}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </label>
            {helperText && <p className="helper-text">{helperText}</p>}
        </div>
    );
};

TextField.propTypes = {
    className: PropTypes.string,
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
    helperText: PropTypes.node
};
TextField.defaultProps = {
    type: 'text',
    disabled: false
};

export default TextField;
