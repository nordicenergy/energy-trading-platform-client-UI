import React from 'react';
import HeaderButton from './HeaderButton';
import './Header.css';
import PropTypes from 'prop-types';

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
                <div>LOGO BLOCK</div>
                <div className="header-buttons">
                    <HeaderButton
                        hasIndicator={
                            this.props.notifications &&
                            this.props.notifications.length > 0
                        }
                        icon={'notif'}
                        onClickHandler={() => {}}
                    />
                    <HeaderButton
                        icon={'logout'}
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
