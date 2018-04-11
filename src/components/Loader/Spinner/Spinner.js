import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Spinner.css';

const Spinner = ({ className, type, size }) => {
    const classes = classNames(
        'spinner',
        `spinner--${type}`,
        `spinner--size-${size}`,
        className
    );

    return (
        <svg
            className={classes}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
        >
            <circle
                className="path"
                fill="none"
                cx={25}
                cy={25}
                r={20}
                strokeWidth={5}
            />
        </svg>
    );
};

Spinner.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['success', 'primary']),
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
};
Spinner.defaultProps = {
    type: 'success',
    size: 'md'
};

export default Spinner;
