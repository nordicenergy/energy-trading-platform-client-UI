import React from 'react';
import HeaderButton from './HeaderButton';
import './Header.css';
import PropTypes from 'prop-types';
import Logo from '../Logo';

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
                <Logo size="small" />
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
            </header>
        );
    }
}

Header.propTypes = {
    logoutLabel: PropTypes.string,
    notificationLabel: PropTypes.string,
    notifications: PropTypes.array,
    onLogoutButtonClickHandler: PropTypes.func
};

export default Header;
