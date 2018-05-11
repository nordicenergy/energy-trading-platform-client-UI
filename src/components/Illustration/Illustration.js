import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import illustration from './Illustration.png';
import './Illustration.css';

const Illustration = ({ className }) => {
    const classes = classNames('illustration', className);
    return (
        <img
            className={classes}
            src={illustration}
            width={632}
            height={536}
            alt="Welcome application illustration. Delivery energy through device to your home"
        />
    );
};

Illustration.propTypes = {
    className: PropTypes.string
};

export default Illustration;
