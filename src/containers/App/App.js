import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { MenuSideBar, Header, Footer } from '../../components';
import { performLogout } from '../../action_performers/users';
import './App.css';
import { PATHS } from '../../services/routes';

class App extends React.Component {
    logout(confirmMessage) {
        // TODO: remake to our modals later
        const answer = window.confirm(confirmMessage);

        if (answer) {
            performLogout();
            this.navigateTo('login');
        }
    }

    navigateTo(route) {
        this.context.router.history.push(`/${route}`);
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
                defaultMessage:
                    "Are you sure that you'd like to logout from the system?"
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
        const { pathname } = window.location;
        const labels = this.defineLabels();
        const { formatMessage } = this.context.intl;
        const [, headRoute = ''] = pathname.split('/');

        const menuItems = [
            {
                id: PATHS.overview.id,
                icon: 'faHome',
                label: formatMessage(labels.overview),
                active: headRoute === PATHS.overview.id
            },
            {
                id: PATHS.documents.id,
                icon: 'faBook',
                label: formatMessage(labels.documents),
                active: headRoute === PATHS.documents.id
            },
            {
                id: PATHS.submit_metric.id,
                icon: 'faCalculator',
                label: formatMessage(labels.submitMetric),
                active: headRoute === PATHS.submit_metric.id
            },
            {
                id: PATHS.trading.id,
                icon: 'faChartBar',
                label: formatMessage(labels.trading),
                active: headRoute === PATHS.trading.id
            },
            {
                id: PATHS.profile.id,
                icon: 'faUser',
                label: formatMessage(labels.profile),
                active: headRoute === PATHS.profile.id
            }
        ];

        const footerItems = [
            {
                href: PATHS.about.id,
                label: formatMessage(labels.about),
                active: pathname === PATHS.about.path
            },
            {
                href: PATHS.team.id,
                label: formatMessage(labels.team),
                active: pathname === PATHS.team.path
            },
            {
                href: PATHS.service.id,
                label: formatMessage(labels.service),
                active: pathname === PATHS.service.path
            }
        ];

        return (
            <div className="app">
                <Header
                    onLogoutButtonClickHandler={() =>
                        this.logout(formatMessage(labels.logoutConfirm))
                    }
                    logoutLabel={formatMessage(labels.logoutLabel)}
                    notificationLabel={formatMessage(labels.notificationLabel)}
                    notifications={[]}
                />
                <div className="content">
                    <div className="menu-container">
                        <MenuSideBar
                            items={menuItems}
                            onSelect={id => this.navigateTo(id)}
                        />
                    </div>
                    <div className="main-container">
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

export default App;
