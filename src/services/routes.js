import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import withoutBreadCrumbs from '../HOC/withoutBreadCrumbs';
import { getToken } from './browserStorage';
import {
    App,
    Login,
    RestorePassword,
    Overview,
    Documents,
    SubmitMetric,
    Profile,
    Service,
    About,
    Team,
    TradingContainer
} from '../containers';

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
        path: '/trading'
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
        id: 'myProducer',
        path: '/my_producer'
    }
};

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
                    <Route
                        path={PATHS.trading.path}
                        component={TradingContainer}
                    />
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
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/restore-password" component={RestorePassword} />
            <Route path="/" component={AppMainLayout} />
        </Switch>
    </div>
);
