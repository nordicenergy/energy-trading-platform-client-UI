import React from 'react';
import PropTypes from 'prop-types';
import { MenuSideBar, Header, Footer, Confirm } from '../../components';
import { performLogout } from '../../action_performers/users';
import './App.css';
import { PATHS } from '../../services/routes';
import { App as messages } from '../../services/translations/messages';
import { connect } from 'react-redux';

export class App extends React.Component {
    static mapStateToProps({ Users, App }) {
        return {
            loggingOut: Users.logout.loading,
            breadCrumbs: App.breadCrumbs.data
        };
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            isConfirmVisible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const loggedOut = this.props.loggingOut !== nextProps.loggingOut && !nextProps.loggingOut;

        if (loggedOut) {
            this.navigateTo('/login');
        }
    }

    logout() {
        this.setState(() => ({
            isConfirmVisible: true
        }));
    }

    handleLogoutConfirm() {
        performLogout();
    }

    handleLogoutCancel() {
        this.setState(() => ({
            isConfirmVisible: false
        }));
    }

    navigateTo(route) {
        this.context.router.history.push(route);
    }

    render() {
        const { isConfirmVisible } = this.state;
        const { pathname } = window.location;
        const { formatMessage } = this.context.intl;
        const [, headRoute = ''] = pathname.split('/');

        const icons = {
            '': 'faHome',
            documents: 'faBook',
            submit_meter: 'faCalculator',
            trading: 'faChartBar',
            profile: 'faUser'
        };

        const menuItems = [
            {
                id: PATHS.overview.id,
                icon: icons[''],
                label: formatMessage(messages.overview),
                active: headRoute === PATHS.overview.id,
                path: PATHS.overview.path
            },
            {
                id: PATHS.documents.id,
                icon: icons.documents,
                label: formatMessage(messages.documents),
                active: headRoute === PATHS.documents.id,
                path: PATHS.documents.path,
                disabled: true
            },
            {
                id: PATHS.submit_meter.id,
                icon: icons.submit_meter,
                label: formatMessage(messages.submitMeter),
                active: headRoute === PATHS.submit_meter.id,
                path: PATHS.submit_meter.path,
                disabled: true
            },
            {
                id: PATHS.trading.id,
                icon: icons.trading,
                label: formatMessage(messages.trading),
                active: headRoute === PATHS.trading.id,
                path: PATHS.trading.path
            },
            {
                id: PATHS.profile.id,
                icon: icons.profile,
                label: formatMessage(messages.profile),
                active: headRoute === PATHS.profile.id,
                path: PATHS.profile.path
            }
        ];

        const footerItems = [
            {
                href: PATHS.about.path,
                label: formatMessage(messages.about),
                active: pathname === PATHS.about.path
            },
            {
                href: PATHS.team.path,
                label: formatMessage(messages.team),
                active: pathname === PATHS.team.path
            },
            {
                href: PATHS.service.path,
                label: formatMessage(messages.service),
                active: pathname === PATHS.service.path
            }
        ];

        return (
            <div className="app">
                <Confirm
                    labels={{
                        message: formatMessage(messages.logoutConfirmMessage),
                        confirmButton: formatMessage(messages.logoutConfirmButton),
                        cancelButton: formatMessage(messages.logoutCancelButton)
                    }}
                    show={isConfirmVisible}
                    onConfirm={() => this.handleLogoutConfirm()}
                    onCancel={() => this.handleLogoutCancel()}
                />
                <Header
                    onLogoutButtonClickHandler={() => this.logout(formatMessage(messages.logoutConfirm))}
                    navigateTo={route => this.navigateTo(route)}
                    logoutLabel={formatMessage(messages.logoutLabel)}
                    notificationLabel={formatMessage(messages.notificationLabel)}
                    notifications={[]}
                    breadCrumbs={this.props.breadCrumbs}
                />
                <div className="content">
                    <div className="menu-container">
                        <MenuSideBar items={menuItems} onSelect={id => this.navigateTo(id)} />
                    </div>
                    <div role="feed" id="main-container">
                        <main>{this.props.children}</main>
                        <Footer
                            addressLabel={formatMessage(messages.address)}
                            navItems={footerItems}
                            onSelect={href => this.navigateTo(href)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object,
    intl: PropTypes.object
};
App.propTypes = {
    loggingOut: PropTypes.bool
};

export default connect(App.mapStateToProps)(App);
