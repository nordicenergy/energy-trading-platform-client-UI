import { combineReducers } from 'redux';
import { itemsReducer } from './tempItems';
import { usersReducer } from './users';
import { notificationsReducer } from './notifications';

const reducers = combineReducers({
    TempItems: itemsReducer,
    Users: usersReducer,
    Notifications: notificationsReducer
});

export default reducers;
