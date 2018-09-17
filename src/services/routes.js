import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { getToken } from './browserStorage';
import {
    Notifications,
    PageLoader,
    App,
    Registration,
    Login,
    RestorePassword,
    ResetPassword,
    Overview,
    Profile,
    FAQ,
    About,
    TermsAndConditions,
    MyProducer,
    Producer,
    BuyEnergy,
    ShowTransactions,
    DirectTrading,
    MyDocuments,
    SubmitMeter,
    NotFoundPage
} from '../containers';
import { Breadcrumbs as messages } from '../services/translations/messages';

export const PATHS = {
    overview: {
        id: '',
        path: '/',
        icon: 'faHome',
        label: messages.overview
    },
    documents: {
        id: 'documents',
        path: '/documents'
    },
    submit_meter: {
        id: 'submit_meter',
        path: '/submit_meter'
    },
    trading: {
        id: 'trading',
        path: '/trading',
        icon: 'faChartBar',
        label: messages.trading
    },
    directTrading: {
        id: 'direct_trading',
        path: '/direct_trading',
        label: messages.directTrading
    },
    profile: {
        id: 'profile',
        path: '/profile'
    },
    termsAndConditions: {
        id: 'termsandconditions',
        path: '/termsandconditions'
    },
    about: {
        id: 'about',
        path: '/about'
    },
    faq: {
        id: 'faq',
        path: '/faq'
    },
    myProducer: {
        id: 'my_producer',
        path: '/my_producer',
        label: messages.myProducer
    },
    producer: {
        id: 'producer',
        path: '/buy_energy/producer/:producerId',
        label: messages.producer
    },
    buyEnergy: {
        id: 'buy_energy',
        path: '/buy_energy',
        label: messages.buyEnergy
    },
    sellEnergy: {
        id: 'sell_energy',
        label: messages.sellEnergy,
        path: '/sell_energy'
    },
    showTransactions: {
        id: 'show_transactions',
        label: messages.showTransactions,
        path: '/show_transactions'
    }
};

extendRoute(Route);

const PublicRoute = ({ component: Component, ...otherProps }) => (
    <Route
        {...otherProps}
        render={props => {
            if (getToken()) {
                return <Redirect to="/" />;
            }
            return <Component {...props} />;
        }}
    />
);

const AppMainLayout = () => {
    if (getToken()) {
        return (
            <div id="app-layout">
                <App>
                    <Switch>
                        <Route exact path={PATHS.overview.path} component={Overview} />
                        <Route exact path={PATHS.showTransactions.path} component={ShowTransactions} />
                        <Route exact path={PATHS.myProducer.path} component={MyProducer} />
                        <Route exact path={PATHS.buyEnergy.path} component={BuyEnergy} />
                        <Route exact path={PATHS.producer.path} component={Producer} />
                        <Route exact path={PATHS.directTrading.path} component={DirectTrading} />
                        <Route exact path={PATHS.documents.path} component={MyDocuments} />
                        <Route exact path={PATHS.submit_meter.path} component={SubmitMeter} />
                        <Route exact path={PATHS.profile.path} component={Profile} />
                        <Route exact path={PATHS.termsAndConditions.path} component={TermsAndConditions} />
                        <Route exact path={PATHS.about.path} component={About} />
                        <Route exact path={PATHS.faq.path} component={FAQ} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </App>
            </div>
        );
    }

    return <Redirect to={`/login?next=${encodeURIComponent(window.location.pathname)}`} />;
};

export const Routes = () => (
    <div id="routes">
        <Notifications />
        <PageLoader />
        <Switch>
            <PublicRoute path="/sign-up" component={Registration} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/restore-password" component={RestorePassword} />
            <PublicRoute path="/:resetToken/reset-password" component={ResetPassword} />
            <Route path="/" component={AppMainLayout} />
        </Switch>
    </div>
);

export function extendRoute(RouterClass) {
    const originGetChildContext = RouterClass.prototype.getChildContext;
    RouterClass.prototype.getChildContext = function() {
        const context = Reflect.apply(originGetChildContext, this, []);
        return {
            router: {
                ...context.router,
                getQueryParam(paramName = '') {
                    const { route: { location: { search } = {} } = {} } = context.router || {};
                    const params = search.substr(1).split('&');
                    for (let i = 0; i < params.length; i++) {
                        const [parameterName, value] = params[i].split('=');

                        if (parameterName === paramName && value) {
                            return decodeURIComponent(value);
                        }
                    }
                    return '';
                }
            }
        };
    };
    return RouterClass;
}
