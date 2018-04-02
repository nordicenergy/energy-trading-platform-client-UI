import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

const Footer = props => {
    const { navItems = [], addressLabel } = props;

    return (
        <footer className="app-footer">
            <address>&copy; {addressLabel}</address>
            <nav>
                {navItems.map(item => (
                    <a key={item.href} href={`/${item.href}`}>
                        {item.label}
                    </a>
                ))}
            </nav>
        </footer>
    );
};

Footer.propTypes = {
    addressLabel: PropTypes.string,
    navItems: PropTypes.array
};

export default Footer;
