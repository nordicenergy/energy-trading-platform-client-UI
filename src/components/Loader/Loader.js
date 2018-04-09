import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Loader.css';

const Loader = ({ className, show, fullScreen }) => {
    const classes = classNames(
        'loader-backdrop',
        show && 'loader-backdrop--show',
        fullScreen && 'loader-backdrop--full-screen',
        className
    );

    return (
        <div className={classes}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="loader-spinner"
                width="66px"
                height="66px"
                viewBox="0 0 66 66"
            >
                <circle
                    className="loader-path"
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    cx="33"
                    cy="33"
                    r="26"
                />
            </svg>
        </div>
    );
};

Loader.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
    fullScreen: PropTypes.bool
};
Loader.defaultProps = {
    show: false,
    fullScreen: true
};

export default Loader;
