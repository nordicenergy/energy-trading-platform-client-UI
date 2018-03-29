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
                <div className="logo-container">
                    <Logo size="small" />
                </div>
                <div className="header-buttons">
                    <HeaderButton
                        hasIndicator={
                            this.props.notifications &&
                            this.props.notifications.length > 0
                        }
                        icon={'faBell'}
                        onClickHandler={() => {}}
                    />
                    <HeaderButton
                        icon={'faSignOutAlt'}
                        onClickHandler={() => this.logout()}
                    />
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    notifications: PropTypes.array,
    onLogoutButtonClickHandler: PropTypes.func
};

export default Header;
