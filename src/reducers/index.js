import { combineReducers } from 'redux';
import { producersReducer } from './producers';
import { usersReducer } from './users';
import { notificationsReducer } from './notifications';
import { transactionsReducer } from './transactions';

const reducers = combineReducers({
    Users: usersReducer,
    Notifications: notificationsReducer,
    Transactions: transactionsReducer,
    Producers: producersReducer
});

export default reducers;
