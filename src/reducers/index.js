import { combineReducers } from 'redux';
import { itemsReducer } from './tempItems';

const reducers = combineReducers({
    TempItems: itemsReducer
});

export default reducers;
