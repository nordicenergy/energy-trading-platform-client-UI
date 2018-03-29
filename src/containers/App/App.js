import React from 'react';
import PropTypes from 'prop-types';
import { NavigationCard } from '../../components';

import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="nav-cards-container">
                    <NavigationCard
                        type="myProducer"
                        title="My Producer"
                        onCardClickHandler={() => {}}
                    />
                    <NavigationCard
                        type="buyEnergy"
                        title="Buy Energy"
                        onCardClickHandler={() => {}}
                    />
                    <NavigationCard
                        type="sellEnergy"
                        title="Sell Energy"
                        onCardClickHandler={() => {}}
                    />
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object
};

export default App;
