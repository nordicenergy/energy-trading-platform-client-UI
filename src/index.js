import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import moment from 'moment';

import { store } from './store';
import messagesEn from './services/translations/en.json';
import messagesDe from './services/translations/de.json';
import history from './services/history';
import { Routes } from './services/routes';
import configureAxios from './services/axios';
import registerServiceWorker from './services/registerServiceWorker';

/* Core common styles */
import './index.css';

function bootstrap() {
    addLocaleData(enLocaleData);

    const locale = navigator.language.split('-')[0] || 'en';
    const messages = {
        en: messagesEn,
        de: messagesDe
    };

    moment.locale(locale);

    ReactDOM.render(
        <Provider store={store}>
            <IntlProvider locale={locale} messages={messages[locale]}>
                <Router history={history}>
                    <Routes />
                </Router>
            </IntlProvider>
        </Provider>,
        document.getElementById('root')
    );
}
configureAxios();
bootstrap();
registerServiceWorker();
