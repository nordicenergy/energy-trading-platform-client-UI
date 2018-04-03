import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { MenuSideBar, Header, Footer } from '../../components';
import { performLogout } from '../../action_performers/users';
import './App.css';

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
                id: 'app.logout.confirm',
                defaultMessage:
                    "Are you sure that you'd like to logout from the system?"
            }
        });
    }

    render() {
        const labels = this.defineLabels();
        const { formatMessage } = this.context.intl;

        const menuItems = [
            {
                id: '',
                icon: 'faHome',
                label: formatMessage(labels.overview)
            },
            {
                id: 'documents',
                icon: 'faBook',
                label: formatMessage(labels.documents)
            },
            {
                id: 'submit_metric',
                icon: 'faCalculator',
                label: formatMessage(labels.submitMetric)
            },
            {
                id: 'trading',
                icon: 'faChartBar',
                label: formatMessage(labels.trading)
            },
            {
                id: 'profile',
                icon: 'faUser',
                label: formatMessage(labels.profile)
            }
        ];

        const footerItems = [
            {
                href: 'about',
                label: formatMessage(labels.about)
            },
            {
                href: 'team',
                label: formatMessage(labels.team)
            },
            {
                href: 'service',
                label: formatMessage(labels.service)
            }
        ];

        return (
            <div className="app">
                <Header
                    onLogoutButtonClickHandler={() =>
                        this.logout(formatMessage(labels.logoutConfirm))
                    }
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
