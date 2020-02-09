/**
 * car list container
 */

import React, { useState, useEffect } from 'react';
import Car from '../../components/car/car.component';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { getCarData } from '../../store/PersistStore'
import sharedStyles from '../../sharedStyles';
import ContentLoader from 'react-content-loader';
import Filter from '../../components/filter/filter.map';


const styles = theme => ({
    ...sharedStyles(theme),
    root: {
        flexGrow: 1,
        paddingBottom: "100px",
    },
    listHeader: {
        marginTop: 0,
    },
    error: {
        textAlign: "center",
    },
    paginationAction: {
        padding: "0 8px",
    },
});



const CarList = (props) => {
    const { classes } = props;

    /**
    * Initial state of cars
    *	The same component will be used to render saved screens and cars from API.
    *	isLocal: set true/false if it is saved cars or cars API
    *	isLoading: show when content is loading
    *	cars: car array
    */
    const [carsArray, setCars] = useState({
        isLocal: false,
        isLoading: false,
        cars: []
    });

    /**
    *	Intial value of current Page
    */
    const [carCounter, updatePage] = useState({
        counterPage: 1,
        carCount: 0
    });

    const [filterObject, setFilterobject] = useState({
        colorFilter: ' ',
        manufacturerFilter: ' ',
        sortBy: 'asc'
    })


    useEffect(() => {
        if (!props.location.pathname.includes("savedcars")) {
            setCars({ isLoading: true })
        } else {
            setCars({ isLocal: true, cars: getCarData() })
        }
    }, []);


    /**
    *	Method called when cars array changes and re-render the list with new cars data
    */

    useEffect(() => {
        if (props.carListData.carList && !props.location.pathname.includes("savedcars")) {
            setCars(prevState => ({ isLocal: prevState.isLocal, cars: props.carListData.carList.cars, isLoading: false }))
            updatePage(prevState => ({ counterPage: prevState.counterPage, carCount: prevState.carCount + props.carListData.carList.cars.length }))
        }
    }, [props.carListData.carList]);


    /**
    *	Method to make server call, when page changes
    */
    useEffect(() => {
        if (!props.location.pathname.includes("savedcars")) {
            props.getCarListHandler(filterObject.colorFilter, filterObject.manufacturerFilter, filterObject.sortBy, carCounter.counterPage)
        }
    }, [carCounter.counterPage]);

    const filterHandler = (colorFilter, manufacturerFilter, sortBy) => {
        setFilterobject({
            colorFilter: colorFilter,
            manufacturerFilter,
            sortBy
        })
        updatePage({ counterPage: 1, carCount: 0 });
        /**
         * Make server call from here only if page number is 1 or else use useEfect to make server call on page change
         */
        if (carCounter.counterPage === 1) {
            props.getCarListHandler(colorFilter, manufacturerFilter, sortBy, carCounter.counterPage);
        }
    }


    /**
    *	Method to handle pagination clicks
    */
    const handlePaginationClick = (action) => {
        switch (action) {
            case 'FIRST':
                updatePage({ counterPage: 1, carCount: 0 });
                break;
            case 'LAST':
                updatePage({
                    counterPage: props.carListData.carList.totalPageCount, carCount:
                        (props.carListData.carList.totalPageCount - 1) * 10
                });
                break;
            case 'SUBTRACT':
                if (carCounter.counterPage > 1)
                    updatePage(prevState => ({
                        counterPage: prevState.counterPage - 1, carCount: prevState.carCount - (
                            props.carListData.carList.cars.length + 10
                        )
                    }));
                break;
            case 'ADD':
                if (carCounter.counterPage < props.carListData.carList.totalPageCount)
                    updatePage(prevState => ({ counterPage: prevState.counterPage + 1, carCount: prevState.carCount }));
                break;
            default:
                break;

        }
    }

    const listLoader = () => {
        return (
            <ContentLoader
                width={500}>
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="10" rx="4" ry="4" width="300" height="13" />
                <rect x="80" y="30" rx="3" ry="3" width="500" height="10" />
                <rect x="80" y="50" rx="3" ry="3" width="200" height="10" />
            </ContentLoader>
        )
    };

    const paginationPanel = () => {
        return (
            <div style={{ textAlign: "right" }}>
                <span className={`${carCounter.counterPage > 1 ? classes.textLinks : classes.textLinkDisabled} ${classes.paginationAction}`} onClick={() => { handlePaginationClick('FIRST') }}>First</span>
                <span className={`${carCounter.counterPage > 1 ? classes.textLinks : classes.textLinkDisabled} ${classes.paginationAction}`} onClick={() => { handlePaginationClick('SUBTRACT') }}>Previous</span>
                Page {carCounter.counterPage} of {props.carListData.carList.totalPageCount}
                <span className={`${carCounter.counterPage < props.carListData.carList.totalPageCount ? classes.textLinks : classes.textLinkDisabled} ${classes.paginationAction}`} onClick={() => { handlePaginationClick('ADD') }}>Next</span>
                <span className={`${carCounter.counterPage < props.carListData.carList.totalPageCount ? classes.textLinks : classes.textLinkDisabled} ${classes.paginationAction}`} onClick={() => { handlePaginationClick('LAST') }}>Last</span>
            </div>
        )
    }

    const carListContent = () => {
        return (<div>{
            (carsArray.cars && carsArray.cars.length > 0)
                ? <div>
                    <p className={`${classes.listHeader} ${classes.mediumTextBold}`}>{carsArray.isLocal ? 'Saved' : 'Available'} cars</p>
                    {
                        !carsArray.isLocal &&
                        <span className={classes.mediumText}>Showing {carCounter.carCount || 0} of {props.carListData.carList.totalCarsCount || 0} results</span>
                    }
                    <List className={classes.list}>
                        {carsArray.cars.map(car => {
                            return <Car key={car.stockNumber} car={{ ...car, "isLocal": carsArray.isLocal }} />
                        })}
                    </List>
                    <div>{!carsArray.isLocal && paginationPanel()}</div>
                </div>
                : notificationText()
        }</div>);
    }


    const notificationText = () => {
        return (
            <h1 className={classes.error}>
                {carsArray.isLocal
                    ? 'No saved cars'
                    : (carsArray.isLoading) ? <div><div>{listLoader()}</div><div>{listLoader()}</div></div>
                        : 'No cars found!!!'}
            </h1>
        );
    }

    const filterPanel = () => {
        if (!carsArray.isLocal)
            return (
                <Filter filterClick={filterHandler} />
            )
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    {filterPanel()}
                </Grid>
                <Grid item sm={carsArray.isLocal ? 12 : 9} xs={12}>
                    {props.carListData.status === 200 || carsArray.isLocal
                        ? carListContent()
                        : notificationText()
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(CarList);