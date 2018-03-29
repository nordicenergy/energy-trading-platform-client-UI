import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    Test,
    App,
    Login,
    RestorePassword,
    Overview,
    Documents,
    SubmitMeter,
    Trading,
    Profile
} from '../containers';

const AppLayout = () => (
    <div id="app-layout">
        <App>
            <Route exact path="/" component={Overview} />
            <Route path="/documents" component={Documents} />
            <Route path="/submit_meter" component={SubmitMeter} />
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
            <Route path="/" component={AppLayout} />
            <Route path="/testRoute" component={Test} />
        </Switch>
    </div>
);
