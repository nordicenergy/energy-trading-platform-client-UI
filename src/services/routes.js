import React from 'react';
import { Route } from 'react-router-dom';
import { Test, App, Login } from '../containers';

export const Routes = () => (
    <div id="routes">
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/testRoute" component={Test} />
    </div>
);
