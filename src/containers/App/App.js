import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Button } from '../../components/index';
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
                    <Button>
                        <FormattedMessage
                            id="app.loginBtn"
                            defaultMessage="Login"
                        />
                    </Button>
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
