/**
 * Map file responsible for:
 * - dispatching an action
 * - getting a data when reducer returns the data
 * 
 */
import CarList from './carList.container';
import { connect } from 'react-redux';
import { getCarList, getColorFilter, getManufacturerFilter } from '../../store/actions/index';

const mapStateToProps = (state) => {
    return {
        carListData: state.list,
        clrFilter: state.colorFilter,
        manuFilter: state.manuFilter
    }
};

const mapDistpatchToProps = (dispatch) => ({
    getCarListHandler: (color, manufacturer, sortBy, page) => dispatch(getCarList(color, manufacturer, sortBy, page)),
    getColorFilterHandler: () => dispatch(getColorFilter()),
    getManufacturerFilterHandler: () => dispatch(getManufacturerFilter())
});

export default connect(mapStateToProps, mapDistpatchToProps)(CarList);