import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    App,
    Login,
    RestorePassword,
    Overview,
    Documents,
    SubmitMetric,
    Trading,
    Profile
} from '../containers';

const AppMainLayout = () => (
    <div id="app-layout">
        <App>
            <Route exact path="/" component={Overview} />
            <Route path="/documents" component={Documents} />
            <Route path="/submit_metric" component={SubmitMetric} />
            <Route path="/trading" component={Trading} />
            <Route path="/profile" component={Profile} />
        </App>
    </div>
);

export const Routes = () => (
    <div id="routes">
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/restore-password" component={RestorePassword} />
            <Route path="/" component={AppMainLayout} />
        </Switch>
    </div>
);
