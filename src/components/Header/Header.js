import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import Breadcrumbs from './Breadcrumbs';
import LanguageSelect from './LanguageSelect';
import HeaderButton from './HeaderButton';
import './Header.css';

const Header = ({
    breadCrumbs,
    onBreadCrumbsClick,

    menuBarIcon,
    menuBarLabel,
    onToggleMenuBar,

    logoutLabel,
    onLogoutClick,

    locales,
    locale,
    onLocaleChange,

    onLogoClick
}) => {
    return (
        <header className="header-desktop">
            <div aria-live="polite" className="header-menu-bars-button">
                <HeaderButton label={menuBarLabel} icon={menuBarIcon} onClickHandler={() => onToggleMenuBar()} />
            </div>
            <div className="logo-container">
                <Logo className="logo--header" size="small" onClick={() => onLogoClick()} />
            </div>
            <nav className="main-header-container">
                <Breadcrumbs items={breadCrumbs} onClick={onBreadCrumbsClick} />
                <div className="header-buttons">
                    <LanguageSelect locales={locales} value={locale} onChange={onLocaleChange} />
                    <HeaderButton label={logoutLabel} icon="faSignOutAlt" onClickHandler={() => onLogoutClick()} />
                </div>
            </nav>
        </header>
    );
};

Header.propTypes = {
    menuBarIcon: PropTypes.string,
    menuBarLabel: PropTypes.string,
    onToggleMenuBar: PropTypes.func,

    logoutLabel: PropTypes.string,
    onLogoutClick: PropTypes.func,

    breadCrumbs: PropTypes.arrayOf(PropTypes.any),
    onBreadCrumbsClick: PropTypes.func,

    locales: PropTypes.arrayOf(PropTypes.string),
    locale: PropTypes.string.isRequired,
    onLocaleChange: PropTypes.func,

    onLogoClick: PropTypes.func
};

Header.defaultProps = {
    logoutLabel: 'Logout',
    onLogoutClick: f => f,

    menuBarIcon: 'faBars',
    menuBarLabel: 'Toggle Menu Bar',
    onToggleMenuBar: f => f,

    breadCrumbs: [],
    onBreadCrumbsClick: f => f,

    onLocaleChange: f => f,
    locales: ['EN', 'DE'],
    locale: 'EN',

    onLogoClick: f => f
};

export default Header;
