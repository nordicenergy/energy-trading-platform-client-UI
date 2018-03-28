import { combineReducers } from 'redux';
import { itemsReducer } from './tempItems';
import { usersReducer } from './users';

const reducers = combineReducers({
    TempItems: itemsReducer,
    Users: usersReducer
});

export default reducers;
