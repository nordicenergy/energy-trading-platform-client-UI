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
    Profile,
    Service,
    About,
    Team
} from '../containers';

const AppMainLayout = () => (
    <div id="app-layout">
        <App>
            <Route exact path="/" component={Overview} />
            <Route path="/documents" component={Documents} />
            <Route path="/submit_metric" component={SubmitMetric} />
            <Route path="/trading" component={Trading} />
            <Route path="/profile" component={Profile} />
            <Route path="/team" component={Team} />
            <Route path="/about" component={About} />
            <Route path="/service" component={Service} />
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
