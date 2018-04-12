import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './OptionLinks.css';

const OptionLinks = ({ className, links }) => {
    const classes = classNames('option-links', className);

    return (
        <div className={classes}>
            {links.map(({ link, caption, shouldOpenInNewTab }) => (
                <a
                    key={link}
                    href={link}
                    target={shouldOpenInNewTab ? '_blank' : '_self'}
                >
                    <span>{caption}</span>
                </a>
            ))}
        </div>
    );
};

const LinkType = PropTypes.shape({
    link: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    shouldOpenInNewTab: PropTypes.bool
});
OptionLinks.propTypes = {
    className: PropTypes.string,
    links: PropTypes.arrayOf(LinkType).isRequired
};

export default OptionLinks;
