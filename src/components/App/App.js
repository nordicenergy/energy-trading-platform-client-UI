import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    // openTestPage() {
    //     this.context.router.history.push('/testRoute');
    // }

    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h1 className="app-title">
                        Welcome to Lition front-end app
                    </h1>
                </header>
                <p className="app-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
                {/*<button id="openTest" onClick={() => this.openTestPage()}>*/}
                {/*Open Test Page*/}
                {/*</button>*/}
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object
};

export default App;
