import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { MenuSideBar, Header, Footer, Confirm } from '../../components';
import { performLogout } from '../../action_performers/users';
import './App.css';
import { PATHS } from '../../services/routes';
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

    defineLabels() {
        return defineMessages({
            overview: {
                id: 'app.menuBar.overview',
                defaultMessage: 'Overview'
            },
            documents: {
                id: 'app.menuBar.documents',
                defaultMessage: 'My Documents'
            },
            submitMetric: {
                id: 'app.menuBar.submitMetric',
                defaultMessage: 'Submit Metric Readings'
            },
            trading: {
                id: 'app.menuBar.trading',
                defaultMessage: 'Trading'
            },
            profile: {
                id: 'app.menuBar.profile',
                defaultMessage: 'Profile'
            },
            about: {
                id: 'app.footer.about',
                defaultMessage: 'About Us'
            },
            team: {
                id: 'app.footer.team',
                defaultMessage: 'Our Team'
            },
            service: {
                id: 'app.footer.service',
                defaultMessage: 'Question&Service'
            },
            address: {
                id: 'app.footer.address',
                defaultMessage: '2018 Lition. All rights reserved.'
            },
            logoutConfirm: {
                id: 'app.header.logoutConfirm',
                defaultMessage: "Are you sure that you'd like to logout from the system?"
            },
            logoutLabel: {
                id: 'app.header.logoutLabel',
                defaultMessage: 'Logout'
            },
            notificationLabel: {
                id: 'app.header.notificationLabel',
                defaultMessage: 'Notifications'
            }
        });
    }

    render() {
        const { isConfirmVisible } = this.state;
        const { pathname } = window.location;
        const labels = this.defineLabels();
        const { formatMessage } = this.context.intl;
        const [, headRoute = ''] = pathname.split('/');

        const icons = {
            '': 'faHome',
            documents: 'faBook',
            submit_metric: 'faCalculator',
            trading: 'faChartBar',
            profile: 'faUser'
        };

        const menuItems = [
            {
                id: PATHS.overview.id,
                icon: icons[''],
                label: formatMessage(labels.overview),
                active: headRoute === PATHS.overview.id,
                path: PATHS.overview.path
            },
            {
                id: PATHS.documents.id,
                icon: icons.documents,
                label: formatMessage(labels.documents),
                active: headRoute === PATHS.documents.id,
                path: PATHS.documents.path
            },
            {
                id: PATHS.submit_metric.id,
                icon: icons.submit_metric,
                label: formatMessage(labels.submitMetric),
                active: headRoute === PATHS.submit_metric.id,
                path: PATHS.submit_metric.path
            },
            {
                id: PATHS.trading.id,
                icon: icons.trading,
                label: formatMessage(labels.trading),
                active: headRoute === PATHS.trading.id,
                path: PATHS.trading.path
            },
            {
                id: PATHS.profile.id,
                icon: icons.profile,
                label: formatMessage(labels.profile),
                active: headRoute === PATHS.profile.id,
                path: PATHS.profile.path
            }
        ];

        const footerItems = [
            {
                href: PATHS.about.path,
                label: formatMessage(labels.about),
                active: pathname === PATHS.about.path
            },
            {
                href: PATHS.team.path,
                label: formatMessage(labels.team),
                active: pathname === PATHS.team.path
            },
            {
                href: PATHS.service.path,
                label: formatMessage(labels.service),
                active: pathname === PATHS.service.path
            }
        ];

        return (
            <div className="app">
                <Confirm
                    labels={{
                        message: "Are you sure that you'd like to logout from the system?",
                        confirmButton: 'Yes',
                        cancelButton: 'No'
                    }}
                    show={isConfirmVisible}
                    onConfirm={() => this.handleLogoutConfirm()}
                    onCancel={() => this.handleLogoutCancel()}
                />
                <Header
                    onLogoutButtonClickHandler={() => this.logout(formatMessage(labels.logoutConfirm))}
                    navigateTo={route => this.navigateTo(route)}
                    logoutLabel={formatMessage(labels.logoutLabel)}
                    notificationLabel={formatMessage(labels.notificationLabel)}
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
                            addressLabel={formatMessage(labels.address)}
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
