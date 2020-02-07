/**
 * Action file for car filters
 */

import * as actionTypes from '../actions/actionTypes';
import api from '../../api/api.config';

/**
*	Method to make server request to get colors
*/
export const getColorFilter = () => {
    return async (dispatch) => {
        return await api.get("colors").then((success) => {
            dispatch({
                type: actionTypes.FETCH_COLOR_FILTER,
                payload: {
                    status: success.status,
                    data: success.data
                }
            })
        }).catch((error) => {
            dispatch({
                type: actionTypes.FETCH_COLOR_FILTER,
                payload: {
                    status: error
                }
            })
            throw new Error(error);
        })
    }
}

/**
*	Method to make server request to get manufacturers
*/
export const getManufacturerFilter = () => {
    return async (dispatch) => {
        return await api.get("manufacturers").then((success) => {
            dispatch({
                type: actionTypes.FETCH_MANUFACTURER_FILTER,
                payload: {
                    status: success.status,
                    data: success.data
                }
            })
        }).catch((error) => {
            dispatch({
                type: actionTypes.FETCH_MANUFACTURER_FILTER,
                payload: {
                    status: error
                }
            })
            throw new Error(error);
        })
    }
}