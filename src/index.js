import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';

import { store } from './store';
import messagesEn from './services/translations/en.json';
import history from './services/history';
import { Routes } from './services/routes';
import configureAxios from './services/axios';
import registerServiceWorker from './services/registerServiceWorker';

/* Core common styles */
import './index.css';

function bootstrap() {
    addLocaleData(enLocaleData);
    const defaultLocale = 'en';

    const messages = { en: messagesEn };

    ReactDOM.render(
        <Provider store={store}>
            <IntlProvider
                locale={defaultLocale}
                messages={messages[defaultLocale]}
            >
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
