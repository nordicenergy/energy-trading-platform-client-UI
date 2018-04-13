import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { getToken } from './browserStorage';
import {
    Notifications,
    App,
    Login,
    RestorePassword,
    Overview,
    Documents,
    SubmitMetric,
    Trading,
    Profile,
    Service,
    About,
    Team,
    MyProducer,
    Producer,
    BuyEnergy,
    SellEnergy,
    Wattcoin
} from '../containers';
import { defineMessages } from 'react-intl';

const pathsLabels = defineMessages({
    trading: {
        id: 'app.breadCrumbs.trading',
        defaultMessage: 'Trading'
    },
    wattcoin: {
        id: 'app.breadCrumbs.wattcoin',
        defaultMessage: 'Wattcoin'
    },
    myProducer: {
        id: 'app.breadCrumbs.myProducer',
        defaultMessage: 'My Producer'
    },
    producer: {
        id: 'app.breadCrumbs.producer',
        defaultMessage: 'Selected Producer'
    },
    sellEnergy: {
        id: 'app.breadCrumbs.sellEnergy',
        defaultMessage: 'Sell Energy'
    },
    buyEnergy: {
        id: 'app.breadCrumbs.buyEnergy',
        defaultMessage: 'Buy Energy'
    }
});

export const PATHS = {
    overview: {
        id: '',
        path: '/'
    },
    documents: {
        id: 'documents',
        path: '/documents'
    },
    submit_metric: {
        id: 'submit_metric',
        path: '/submit_metric'
    },
    trading: {
        id: 'trading',
        path: '/trading',
        icon: 'faChartBar',
        label: pathsLabels.trading
    },
    profile: {
        id: 'profile',
        path: '/profile'
    },
    team: {
        id: 'team',
        path: '/team'
    },
    about: {
        id: 'about',
        path: '/about'
    },
    service: {
        id: 'service',
        path: '/service'
    },
    myProducer: {
        id: 'my_producer',
        path: '/trading/my_producer',
        label: pathsLabels.myProducer
    },
    producer: {
        id: 'producer',
        path: '/trading/buy_energy/producer/:producerId',
        label: pathsLabels.producer
    },
    buyEnergy: {
        id: 'buy_energy',
        path: '/trading/buy_energy',
        label: pathsLabels.buyEnergy
    },
    sellEnergy: {
        id: 'sell_energy',
        label: pathsLabels.sellEnergy,
        path: '/trading/sell_energy'
    },
    wattcoin: {
        id: 'wattcoin',
        label: pathsLabels.wattcoin,
        path: '/trading/wattcoin'
    }
};

const BuyEnergyRoute = () => (
    <React.Fragment>
        <Route exact path={PATHS.buyEnergy.path} component={BuyEnergy} />
        <Route path={PATHS.producer.path} component={Producer} />
    </React.Fragment>
);

const TradingRoute = () => (
    <React.Fragment>
        <Route exact path={PATHS.trading.path} component={Trading} />
        <Route path={PATHS.myProducer.path} component={MyProducer} />
        <Route path={PATHS.sellEnergy.path} component={SellEnergy} />
        <Route path={PATHS.wattcoin.path} component={Wattcoin} />
        <BuyEnergyRoute />
    </React.Fragment>
);

const PublicRoute = ({ component: Component, ...otherProps }) => (
    <Route
        {...otherProps}
        render={props => {
            if (getToken()) {
                return <Redirect to="/" />;
            }

            return <Component {...props} />;
        }}
    />
);

const AppMainLayout = () => {
    if (getToken()) {
        return (
            <div id="app-layout">
                <App>
                    <Route exact path={PATHS.overview.path} component={Overview} />
                    <Route path={PATHS.documents.path} component={Documents} />
                    <Route path={PATHS.submit_metric.path} component={SubmitMetric} />
                    <TradingRoute />
                    <Route path={PATHS.profile.path} component={Profile} />
                    <Route path={PATHS.team.path} component={Team} />
                    <Route path={PATHS.about.path} component={About} />
                    <Route path={PATHS.service.path} component={Service} />
                </App>
            </div>
        );
    }

    return <Redirect to={`/login?next=${encodeURIComponent(window.location.pathname)}`} />;
};

export const Routes = () => (
    <div id="routes">
        <Notifications />
        <Switch>
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/restore-password" component={RestorePassword} />
            <Route path="/" component={AppMainLayout} />
        </Switch>
    </div>
);
