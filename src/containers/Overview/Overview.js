import React from 'react';
import { connect } from 'react-redux';
// import { NavigationCard } from '../../components';

import './Overview.css';

export class Overview extends React.Component {
    static mapStateToProps(/* state */) {
        return {};
    }

    render() {
        return (
            <div className="overview-page">
                <h1>Overview</h1>
                <nav className="overview-navigation-cards">
                    {/*<NavigationCard type="myProducer" title="My producer" onCardClickHandler={f => f} />*/}
                    {/*<NavigationCard type="buyEnergy" title="Buy energy" onCardClickHandler={f => f} />*/}
                    {/*<NavigationCard type="sellEnergy" title="Sell energy" onCardClickHandler={f => f} />*/}
                </nav>
            </div>
        );
    }
}

export default connect(Overview.mapStateToProps)(Overview);
