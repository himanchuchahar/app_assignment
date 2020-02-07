/**
 * Reducer file for car list
 */

import * as actionTypes from '../actions/actionTypes';
import { updateCarsData } from '../utility';

const initialState = {
    status: null,
    carList: null
}

const carListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CAR_LIST:
            return {
                ...state,
                status: action.payload.status,
                carList: updateCarsData(action.payload.data)
            };
        default:
            return state;
    }
}

export default carListReducer;