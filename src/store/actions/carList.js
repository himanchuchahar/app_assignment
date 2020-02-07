/**
 * Action file for car list
 */

import * as actionTypes from '../actions/actionTypes';
import api from '../../api/api.config';


/**
*	Method to make server request to get cars
*/
export const getCarList = (color, manufacturer, sortBy, page) => {
    return async (dispatch) => {
        let url = "cars?sort=" + sortBy + "&page=" + page;
        if (color.trim()) url += "&color=" + color;
        if (manufacturer.trim()) url += "&manufacturer=" + manufacturer;
        return await api.get(url).then((success) => {
            dispatch({
                type: actionTypes.FETCH_CAR_LIST,
                payload: {
                    status: success.status,
                    data: success.data
                }
            })
        }).catch((error) => {
            dispatch({
                type: actionTypes.FETCH_CAR_LIST,
                payload: {
                    status: error
                }
            })
            throw new Error(error);
        })
    }
}


