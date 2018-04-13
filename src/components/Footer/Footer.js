import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

const Footer = props => {
    const { navItems = [], addressLabel, onSelect = f => f } = props;

    return (
        <footer className="app-footer">
            <address>&copy; {addressLabel}</address>
            <nav>
                {navItems.map(item => (
                    <a
                        className={item.active ? 'footer-item--active' : ''}
                        key={item.href}
                        href={item.href}
                        onClick={event => {
                            event.preventDefault();
                            onSelect(item.href);
                        }}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </footer>
    );
};

Footer.propTypes = {
    addressLabel: PropTypes.string,
    navItems: PropTypes.array,
    onSelect: PropTypes.func
};

export default Footer;
