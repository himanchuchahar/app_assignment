/**
 * Action file for car detail
 */

import * as actionTypes from '../actions/actionTypes';
import api from '../../api/api.config';

/**
*	Method to make server request to get car details
*/
export const getCarDetails = (stockNumber) => {
    return async (dispatch) => {
        return await api.get("cars/" + stockNumber).then((success) => {
            dispatch({
                type: actionTypes.FETCH_CAR_DETAILS,
                payload: {
                    status: success.status,
                    data: success.data
                }
            })
        }).catch((error) => {
            dispatch({
                type: actionTypes.FETCH_CAR_DETAILS,
                payload: {
                    status: error
                }
            })
            throw new Error(error);
        })
    }
}