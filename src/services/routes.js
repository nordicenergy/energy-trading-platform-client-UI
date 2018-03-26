import React from 'react';
import { Route } from 'react-router-dom';
import { Test, App } from '../components';

export const Routes = () => (
    <div>
        <Route path="/" component={App} />
        <Route path="/testRoute" component={Test} />
    </div>
);
