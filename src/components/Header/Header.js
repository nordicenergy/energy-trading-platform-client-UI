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

    formatLabel(label) {
        const splittedLabels = label.split('_');
        let formattedLabel = '';
        for (let i = 0; i < splittedLabels.length; i++) {
            formattedLabel +=
                splittedLabels[i].charAt(0).toUpperCase() +
                splittedLabels[i].slice(1) +
                ' ';
        }
        return formattedLabel;
    }

    createBreadcrumbsItems() {
        const paths = this.props.path.split('/').slice(1);
        let breadcrumbsPaths = '';
        return paths.map((path, index) => {
            breadcrumbsPaths += index === 0 ? path : `/${path}`;
            const label = this.formatLabel(path);
            return {
                id: path,
                label,
                path: breadcrumbsPaths
            };
        });
    }

    logout() {
        this.props.onLogoutButtonClickHandler();
    }

    render() {
        const breadcrumbsItems = this.createBreadcrumbsItems();

        return (
            <header className="header-desktop">
                <div className="logo-container">
                    <Logo size="small" />
                </div>
                <div className="main-header-container">
                    <Breadcrumbs
                        items={breadcrumbsItems}
                        iconsTypes={this.props.iconsTypes}
                        navigateTo={this.props.navigateTo}
                    />
                    <nav className="header-buttons">
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
                    </nav>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    notifications: PropTypes.array,
    onLogoutButtonClickHandler: PropTypes.func,
    path: PropTypes.string,
    iconsTypes: PropTypes.object,
    navigateTo: PropTypes.func
};

Header.defaultProps = {
    notifications: [],
    path: '/',
    iconsTypes: {},
    navigateTo: () => {}
};

export default Header;
