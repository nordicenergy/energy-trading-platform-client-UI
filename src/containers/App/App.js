import React from 'react';
import PropTypes from 'prop-types';
import { MenuSideBar, Header } from '../../components';
import './App.css';

class App extends React.Component {
    navigateTo(route) {
        this.context.router.history.push(`/${route}`);
    }

    render() {
        const items = [
            { id: '', icon: 'faHome', label: 'Overview' },
            { id: 'documents', icon: 'faBook', label: 'My Documents' },
            {
                id: 'submit_meter',
                icon: 'faCalculator',
                label: 'Submit Meter Readings'
            },
            { id: 'trading', icon: 'faChartBar', label: 'Trading' },
            { id: 'profile', icon: 'faUser', label: 'Profile' }
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
