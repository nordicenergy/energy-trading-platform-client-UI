import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { store } from './store';
import { LocalizationProvider } from './providers';
import history from './services/history';
import { Routes } from './services/routes';
import setupPolyfills from './polyfills';
import configureAxios from './services/axios';
import './index.css';

function bootstrap() {
    ReactDOM.render(
        <Provider store={store}>
            <LocalizationProvider>
                <Router history={history}>
                    <Routes />
                </Router>
            </LocalizationProvider>
        </Provider>,
        document.getElementById('root')
    );
}
setupPolyfills();
configureAxios();
bootstrap();
