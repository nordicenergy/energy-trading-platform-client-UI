import { combineReducers } from 'redux';
import { producersReducer } from './producers';
import { usersReducer } from './users';
import { appReducer } from './app';
import { notificationsReducer } from './notifications';
import { transactionsReducer } from './transactions';
import { aboutUsReducer } from './aboutUs';

const reducers = combineReducers({
    Users: usersReducer,
    Notifications: notificationsReducer,
    Transactions: transactionsReducer,
    Producers: producersReducer,
    App: appReducer,
    AboutUs: aboutUsReducer
});

export default reducers;
