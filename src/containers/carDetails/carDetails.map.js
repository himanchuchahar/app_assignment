/**
 * Map file responsible for:
 * - dispatching an action
 * - getting a data when reducer returns the data
 * 
 */
import CarDetails from './carDetails.container';
import { connect } from 'react-redux';
import { getCarDetails } from '../../store/actions/index';

const mapStateToProps = (state) => ({
    carDetailsData: state.details
});

const mapDistpatchToProps = (dispatch) => ({
    getCarDetailsHandler: (stockNumber) => dispatch(getCarDetails(stockNumber))
});

export default connect(mapStateToProps, mapDistpatchToProps)(CarDetails);