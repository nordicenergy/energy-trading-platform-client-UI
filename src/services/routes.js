import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { getToken } from './browserStorage';
import {
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
    Team
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
                        component={Overview}
                    />
                    <Route path={PATHS.documents.path} component={Documents} />
                    <Route
                        path={PATHS.submit_metric.path}
                        component={SubmitMetric}
                    />
                    <Route path={PATHS.trading.path} component={Trading} />
                    <Route path={PATHS.profile.path} component={Profile} />
                    <Route path={PATHS.team.path} component={Team} />
                    <Route path={PATHS.about.path} component={About} />
                    <Route path={PATHS.service.path} component={Service} />
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
