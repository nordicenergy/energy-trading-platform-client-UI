import { combineReducers } from 'redux';
import { producersReducer } from './producers';
import { usersReducer } from './users';
import { appReducer } from './app';
import { notificationsReducer } from './notifications';
import { transactionsReducer } from './transactions';
import { offersReducer } from './offers';

const reducers = combineReducers({
    Users: usersReducer,
    Notifications: notificationsReducer,
    Transactions: transactionsReducer,
    Producers: producersReducer,
    App: appReducer,
    Offer: offersReducer
});

export default reducers;
