import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BackLinkIcon from './back-link.svg';
import './BackLink.css';

const BackLink = ({ className, link, onClick }) => {
    const classes = classNames('back-link', className);
    return (
        <a className={classes} href={link} onClick={onClick}>
            <img src={BackLinkIcon} width={34} height={34} alt="arrow back icon" />
        </a>
    );
};

BackLink.propTypes = {
    className: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func
};
BackLink.defaultProps = {
    link: '#back'
};

export default BackLink;
