import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.png';
import './Logo.css';

const Logo = ({ size }) => (
    <img
        className={`logo logo-${size}`}
        src={logo}
        alt="Lition logo"
        width={174}
        height={36}
    />
);

Logo.propTypes = {
    size: PropTypes.oneOf(['small', 'medium'])
};
Logo.defaultProps = {
    size: 'medium'
};

export default Logo;
