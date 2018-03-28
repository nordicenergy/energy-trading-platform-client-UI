import React from 'react';
import PropTypes from 'prop-types';

import './App.css';

class App extends React.Component {
    render() {
        return <div className="app" />;
    }
}

App.contextTypes = {
    router: PropTypes.object
};

export default App;
