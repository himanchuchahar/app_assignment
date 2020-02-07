/**
 * Root file to combine list, detail & filter reducer and return single reducer to store
 */
import { combineReducers } from 'redux';
import carListReducer from './carList';
import carDetailsReducer from './carDetails';
import { colorFilterReducer, manuFilterReducer } from './carFilters';

const rootReducer = combineReducers({
    list: carListReducer,
    details: carDetailsReducer,
    colorFilter: colorFilterReducer,
    manuFilter: manuFilterReducer
});

export default rootReducer;