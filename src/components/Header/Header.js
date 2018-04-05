import React from 'react';
import HeaderButton from './HeaderButton';
import './Header.css';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import Breadcrumbs from './Breadcrumbs';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNotificationsOpened: false
        };
    }

    logout() {
        this.props.onLogoutButtonClickHandler();
    }

    render() {
        return (
            <header className="header-desktop">
                <div className="logo-container">
                    <Logo size="small" />
                </div>
                <div className="main-header-container">
                    <Breadcrumbs
                        items={this.props.breadCrumbs}
                        iconsTypes={this.props.iconsTypes}
                        onClick={this.props.navigateTo}
                    />
                    <nav className="header-buttons">
                        <HeaderButton
                            hasIndicator={
                                this.props.notifications &&
                                this.props.notifications.length > 0
                            }
                            label={this.props.notificationLabel}
                            icon={'faBell'}
                            onClickHandler={() => {}}
                        />
                        <HeaderButton
                            label={this.props.logoutLabel}
                            icon={'faSignOutAlt'}
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
    iconsTypes: PropTypes.object,
    navigateTo: PropTypes.func
};

Header.defaultProps = {
    notifications: [],
    breadCrumbs: [],
    iconsTypes: {},
    navigateTo: () => {}
};

export default Header;
