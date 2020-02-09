/**
 * Map file responsible for:
 * - dispatching an action
 * - getting a data when reducer returns the data
 * 
 */
import Filter from './filter.component';
import { connect } from 'react-redux';
import { getColorFilter, getManufacturerFilter } from '../../store/actions/index';

const mapStateToProps = (state) => {
    return {
        clrFilter: state.colorFilter,
        manuFilter: state.manuFilter
    }
};

const mapDistpatchToProps = (dispatch) => ({
    getColorFilterHandler: () => dispatch(getColorFilter()),
    getManufacturerFilterHandler: () => dispatch(getManufacturerFilter())
});

export default connect(mapStateToProps, mapDistpatchToProps)(Filter);