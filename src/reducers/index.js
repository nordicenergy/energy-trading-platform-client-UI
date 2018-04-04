import { combineReducers } from 'redux';
import { itemsReducer } from './tempItems';
import { usersReducer } from './users';
import { transactionsReducer } from './transactions';

const reducers = combineReducers({
    TempItems: itemsReducer,
    Users: usersReducer,
    Transactions: transactionsReducer
});

export default reducers;
