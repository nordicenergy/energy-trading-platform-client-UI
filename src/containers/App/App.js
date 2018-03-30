import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { MenuSideBar, Header } from '../../components';
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
            }
        });
    }

    render() {
        const labels = this.defineLabels();
        const { formatMessage } = this.context.intl;

        const items = [
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
    router: PropTypes.object,
    intl: PropTypes.object
};

export default App;
