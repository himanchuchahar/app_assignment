/**
 * Reducer file for car details
 */


import * as actionTypes from '../actions/actionTypes';
import { updateCarObject } from '../utility';

const initialState = {
    status: null,
    carDetails: null
}

const carDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CAR_DETAILS:
            return {
                ...state,
                status: action.payload.status,
                carDetails: updateCarObject(action.payload.data.car)
            };
        default:
            return state;
    }
}

export default carDetailsReducer;