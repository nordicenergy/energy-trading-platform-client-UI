import { combineReducers } from 'redux';
import { itemsReducer } from './tempItems';
import { usersReducer } from './users';
import { appReducer } from './app';

const reducers = combineReducers({
    TempItems: itemsReducer,
    Users: usersReducer,
    App: appReducer
});

export default reducers;
