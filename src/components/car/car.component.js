/**
 * Car Item component which is used to render each item in car list
 */


import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CarIcon from '@material-ui/icons/DirectionsCar';
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../../sharedStyles';
import { Link } from 'react-router-dom';

/**
 * Styles for car component
 * @param {*} theme 
 */
const styles = theme => ({
    ...sharedStyles(theme),
    listItem: {
        margin: "12px 0",
    },
    carSecondaryDetails: {
        fontSize: "14px",
        padding: "8px 0",
        display: "block",
        color: "black",
    },
})


const car = (props) => {
    const { classes } = props;

    return (
        <ListItem className={`${classes.listItem} ${classes.panel}`}>
            <ListItemAvatar>
                <Avatar>
                    <CarIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={
                <span className={classes.mediumTextBold}>
                    {props.car.car_name}
                </span>
            } secondary={
                <React.Fragment>
                    <span className={classes.carSecondaryDetails}>{props.car.secondary_details}</span>
                    <span>
                        <Link
                            className={classes.textLinks}
                            to={'/detail/' + props.car.stockNumber}>
                            View details
                        </Link>
                    </span>
                </React.Fragment>
            } />
        </ListItem>
    )
}

export default withStyles(styles)(car);