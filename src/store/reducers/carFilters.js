/**
 * Reducer file for all filters
 * 
 */


import * as actionTypes from '../actions/actionTypes';
import { updateManufacturerObject } from '../utility';

const colorFilterInitialState = {
    status: null,
    colorFilter: null
}

const manuFilterInitialState = {
    status: null,
    manufacturerFilter: null
}


export const colorFilterReducer = (state = colorFilterInitialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COLOR_FILTER:
            return {
                ...state,
                status: action.payload.status,
                colorFilter: action.payload.data
            };
        default:
            return state;
    }
}

export const manuFilterReducer = (state = manuFilterInitialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MANUFACTURER_FILTER:
            return {
                ...state,
                status: action.payload.status,
                manufacturerFilter: updateManufacturerObject(action.payload.data)
            };
        default:
            return state;
    }
}


