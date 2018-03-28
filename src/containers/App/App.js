import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Header from '../../components/Header';
import { Button } from '../../components/index';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header
                    onLogoutButtonClickHandler={() => () => {}}
                    notifications={[]}
                />
                <p className="app-intro">
                    <Button>
                        <FormattedMessage
                            id="app.loginBtn"
                            defaultMessage="Login"
                        />
                    </Button>
                </p>
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object
};

export default App;
