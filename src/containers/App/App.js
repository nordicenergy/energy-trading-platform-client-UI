import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { MenuSideBar, Header } from '../../components';
import './App.css';

class App extends React.Component {
    navigateTo(route) {
        this.context.router.history.push(`/${route}`);
    }

    render() {
        const messages = defineMessages({
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
            }
        });
        // const { formatMessage } = this.context.intl;

        const items = [
            {
                id: '',
                icon: 'faHome',
                label: messages.documents.defaultMessage
            },
            {
                id: 'documents',
                icon: 'faBook',
                label: messages.documents.defaultMessage
            },
            {
                id: 'submit_meter',
                icon: 'faCalculator',
                label: messages.submitMetric.defaultMessage
            },
            {
                id: 'trading',
                icon: 'faChartBar',
                label: messages.trading.defaultMessage
            },
            {
                id: 'profile',
                icon: 'faUser',
                label: messages.profile.defaultMessage
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
                            items={items}
                            onSelect={id => this.navigateTo(id)}
                        />
                    </div>
                    <main>{this.props.children}</main>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object
};

export default App;
