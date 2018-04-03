import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { MenuSideBar, Header, Footer } from '../../components';
import './App.css';

class App extends React.Component {
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
            }
        });
    }

    render() {
        const { pathname } = window.location;
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
                label: formatMessage(labels.about),
                active: pathname === '/about'
            },
            {
                href: 'team',
                label: formatMessage(labels.team),
                active: pathname === '/team'
            },
            {
                href: 'service',
                label: formatMessage(labels.service),
                active: pathname === `/service`
            }
        ];

        return (
            <div className="app">
                <Header
                    onLogoutButtonClickHandler={() => this.navigateTo('login')}
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
