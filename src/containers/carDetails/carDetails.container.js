/**
 * car list container
 */

import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { setCarData, isSaved } from '../../store/PersistStore';
import sharedStyles from '../../sharedStyles';
import { deleteCar } from '../../store/PersistStore';

const styles = theme => ({
    ...sharedStyles(theme),
    root: {
        width: "800px",
        margin: "auto",
        flexGrow: 1,
    },
    carModelName: {
        display: "block",
    },
    carSecondaryDetails: {
        fontSize: "18px",
        padding: "24px 0",
        display: "block",
    },
    filterButtonPanel: {
        display: "flex",
        justifyContent: "flex-end",
    },
});

const SaveButton = withStyles(theme => ({
    root: {
        color: "#fff",
        width: "128px",
        backgroundColor: "#EA7F28",
        "&:hover": {
            backgroundColor: "#D37324",
        },
    },
}))(Button);

const CarDetails = (props) => {

    const { classes } = props;

    const [isCarSaved, saveHandler] = useState(false);


    /**
    * Component did mount
    */
    useEffect(() => {
        saveHandler(isSaved(props.match.params.id));
        props.getCarDetailsHandler(props.match.params.id);
    }, []);

    /**
    * Method to save car in localStorage
    */
    const onSaveHandler = () => {
        setCarData(props.carDetailsData.carDetails);
        saveHandler(true);
    }


    /**
    *	Method to handle delete for saved cars
    */
    const onRemoveHandler = () => {
        deleteCar(props.carDetailsData.carDetails.stockNumber);
        saveHandler(false);
    }

    const onToggleHandler = () => {
        isCarSaved
            ? onRemoveHandler()
            : onSaveHandler()
    }

    const carDetailsContent = () => {
        return (<Grid container spacing={3}>
            <Grid item sm={7} xs={12}>
                <div className={classes.detailsPanel}>
                    <span className={`${classes.carModelName} ${classes.bigText}`}>{props.carDetailsData.carDetails.car_name}</span>
                    <span className={classes.carSecondaryDetails}>{props.carDetailsData.carDetails.secondary_details}</span>
                    <p className={classes.smallText}>
                        This car is currently available and can be delivered as soon as tomorrow morning. Please be aware that delivery times shown in this page are not definitive and may change due to bad weather conditions.
            </p>
                </div>
            </Grid>
            <Grid item sm={5} xs={12}>
                <div className={`${classes.panel} ${classes.filterPanel}`}>
                    <p>
                        If you like this car, click the button and save it in your collection of favourite items.
                    </p>
                    <div className={classes.filterButtonPanel}>
                        <SaveButton variant="contained" disableElevation
                            onClick={() => onToggleHandler()}>{isCarSaved ? 'Remove' : 'Save'}</SaveButton>
                    </div>
                </div>
            </Grid>
        </Grid>);
    }

    const notificationText = () => {
        return (
            <h1 className={classes.error}>
                Loading
            </h1>
        );
    }

    return (
        <div className={classes.root}>
            {props.carDetailsData.status === 200
                ? carDetailsContent()
                : notificationText()
            }

        </div >
    )
}

export default withStyles(styles)(CarDetails);