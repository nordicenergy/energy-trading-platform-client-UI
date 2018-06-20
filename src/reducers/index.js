import { combineReducers } from 'redux';
import { producersReducer } from './producers';
import { usersReducer } from './users';
import { appReducer } from './app';
import { notificationsReducer } from './notifications';
import { transactionsReducer } from './transactions';
import { documentsReducer } from './documents';

const reducers = combineReducers({
    Users: usersReducer,
    Notifications: notificationsReducer,
    Transactions: transactionsReducer,
    Producers: producersReducer,
    Documents: documentsReducer,
    App: appReducer
});

export default reducers;
