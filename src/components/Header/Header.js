import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import Breadcrumbs from './Breadcrumbs';
import LanguageSelect from './LanguageSelect';
import HeaderButton from './HeaderButton';
import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNotificationsOpened: false
        };
    }

    logout() {
        const { onLogoutButtonClickHandler } = this.props;
        if (typeof onLogoutButtonClickHandler === 'function') {
            onLogoutButtonClickHandler();
        }
    }

    render() {
        const { locales, locale, onLocaleChange } = this.props;
        return (
            <header className="header-desktop">
                <div className="logo-container">
                    <Logo className="logo--header" size="small" />
                </div>
                <div className="main-header-container">
                    <Breadcrumbs items={this.props.breadCrumbs} onClick={this.props.navigateTo} />
                    <nav className="header-buttons">
                        <LanguageSelect locales={locales} value={locale} onChange={onLocaleChange} />
                        <HeaderButton
                            label={this.props.logoutLabel}
                            icon="faSignOutAlt"
                            onClickHandler={() => this.logout()}
                        />
                    </nav>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    logoutLabel: PropTypes.string,
    notificationLabel: PropTypes.string,
    notifications: PropTypes.array,
    onLogoutButtonClickHandler: PropTypes.func,
    path: PropTypes.string,
    navigateTo: PropTypes.func,
    locales: PropTypes.arrayOf(PropTypes.string),
    locale: PropTypes.string.isRequired,
    onLocaleChange: PropTypes.func
};

Header.defaultProps = {
    notifications: [],
    breadCrumbs: [],
    navigateTo: () => {}
};

export default Header;
