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
            <i className="loader-icon" />
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
