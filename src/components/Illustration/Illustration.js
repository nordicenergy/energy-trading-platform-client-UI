import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import illustration from './Illustration.png';
import './Illustration.css';

const Illustration = ({ className }) => {
    const classes = classNames('illustration', className);
    return (
        <img className={classes} src={illustration} width={632} height={536} />
    );
};

Illustration.propTypes = {
    className: PropTypes.string
};

export default Illustration;
