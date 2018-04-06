import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import withoutBreadCrumbs from '../HOC/withoutBreadCrumbs';
import withBreadCrumbs from '../HOC/withBreadCrumbs';
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
    MyProducer
} from '../containers';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
    trading: {
        id: 'app.breadCrumbs.trading',
        defaultMessage: 'Trading'
    },
    myProducer: {
        id: 'app.breadCrumbs.myProducer',
        defaultMessage: 'My Producer'
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
        label: messages.trading
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
        label: messages.myProducer
    },
    buyEnergy: {
        id: 'buy_energy',
        path: '/trading/buy_energy',
        label: messages.buyEnergy
    },
    sellEnergy: {
        id: 'sell_energy',
        path: '/trading/sell_energy',
        label: messages.sellEnergy
    }
};

const TradingContainer = withBreadCrumbs(Trading, PATHS.trading);
const MyProducerContainer = withBreadCrumbs(MyProducer, PATHS.myProducer);

const TradingRoute = withBreadCrumbs(
    () => (
        <React.Fragment>
            <Route
                exact
                path={PATHS.trading.path}
                component={TradingContainer}
            />
            <Route
                path={PATHS.myProducer.path}
                component={MyProducerContainer}
            />
        </React.Fragment>
    ),
    { ...PATHS.trading, isRoot: true }
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
                    <Route
                        exact
                        path={PATHS.overview.path}
                        component={withoutBreadCrumbs(Overview)}
                    />
                    <Route
                        path={PATHS.documents.path}
                        component={withoutBreadCrumbs(Documents)}
                    />
                    <Route
                        path={PATHS.submit_metric.path}
                        component={withoutBreadCrumbs(SubmitMetric)}
                    />
                    <Route path={PATHS.trading.path} component={TradingRoute} />
                    <Route
                        path={PATHS.profile.path}
                        component={withoutBreadCrumbs(Profile)}
                    />
                    <Route
                        path={PATHS.team.path}
                        component={withoutBreadCrumbs(Team)}
                    />
                    <Route
                        path={PATHS.about.path}
                        component={withoutBreadCrumbs(About)}
                    />
                    <Route
                        path={PATHS.service.path}
                        component={withoutBreadCrumbs(Service)}
                    />
                </App>
            </div>
        );
    }

    return (
        <Redirect
            to={`/login?next=${encodeURIComponent(window.location.pathname)}`}
        />
    );
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
