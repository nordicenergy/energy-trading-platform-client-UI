import React from 'react';
import { Route } from 'react-router-dom';
import {
    Test,
    App,
    Login,
    Overview,
    Documents,
    SubmitMeter,
    Trading,
    Profile
} from '../containers';

export const Routes = () => (
    <div id="routes">
        <App>
            <Route exact path="/" component={Overview} />
            <Route path="/documents" component={Documents} />
            <Route path="/submit_meter" component={SubmitMeter} />
            <Route path="/trading" component={Trading} />
            <Route path="/profile" component={Profile} />
        </App>
        <Route path="/login" component={Login} />
        <Route path="/testRoute" component={Test} />
    </div>
);
