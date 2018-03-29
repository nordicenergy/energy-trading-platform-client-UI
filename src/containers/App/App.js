import React from 'react';
import PropTypes from 'prop-types';

import { Header } from '../../components';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header
                    onLogoutButtonClickHandler={() => () => {}}
                    notifications={[]}
                />
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object
};

export default App;
