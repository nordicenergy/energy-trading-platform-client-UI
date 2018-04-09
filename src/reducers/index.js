import { combineReducers } from 'redux';
import { itemsReducer } from './tempItems';
import { usersReducer } from './users';
import { appReducer } from './app';
import { notificationsReducer } from './notifications';
import { transactionsReducer } from './transactions';

const reducers = combineReducers({
    TempItems: itemsReducer,
    Users: usersReducer,
    Notifications: notificationsReducer,
    Transactions: transactionsReducer,
    App: appReducer
});

export default reducers;
