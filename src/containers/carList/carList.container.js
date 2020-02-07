/**
 * car list container
 */

import React, { useState, useEffect } from 'react';
import Car from '../../components/car/car.component';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { getCarData } from '../../store/PersistStore'
import sharedStyles from '../../sharedStyles';
import ContentLoader from 'react-content-loader'


const styles = theme => ({
    ...sharedStyles(theme),
    root: {
        flexGrow: 1,
        paddingBottom: "100px",
    },
    filter: {
        display: "flex",
        margin: "12px 0",

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
    filterButtonPanel: {
        display: "flex",
        justifyContent: "flex-end",
    },
});

/**
* Style for filter button
*/
const FilterButton = withStyles(theme => ({
    root: {
        color: "#fff",
        width: "128px",
        backgroundColor: "#EA7F28",
        "&:hover": {
            backgroundColor: "#D37324",
        },
    },
}))(Button);


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
    const [currentPage, updatePage] = useState(1);

    const [colorFilter, setColorState] = useState(' ');

    const [manufacturerFilter, setmanufacturerState] = useState(' ');

    const [sortBy, setSortBy] = useState('asc');

    useEffect(() => {
        if (!props.location.pathname.includes("savedcars")) {
            setCars({ isLoading: true })
            props.getColorFilterHandler();
            props.getManufacturerFilterHandler();
            props.getCarListHandler(colorFilter, manufacturerFilter, sortBy, currentPage)
        } else {
            setCars({ isLocal: true, cars: getCarData() })
        }
    }, []);


    /**
    *	Method called when cars array changes and re-render the list with new cars data
    */

    useEffect(() => {
        if (props.carListData.carList && !props.location.pathname.includes("savedcars")) {
            setCars(prevState => { return { isLocal: prevState.isLocal, cars: props.carListData.carList.cars, isLoading: false } })
        }
    }, [props.carListData.carList]);


    /**
    *	Method to make server call, when page changes
    */
    useEffect(() => {
        if (!props.location.pathname.includes("savedcars")) {
            props.getCarListHandler(colorFilter, manufacturerFilter, sortBy, currentPage)
        }
    }, [currentPage]);


    /**
    *	Method to handle pagination clicks
    */
    const handlePaginationClick = (action) => {
        switch (action) {
            case 'FIRST':
                updatePage(1);
                break;
            case 'LAST':
                updatePage(props.carListData.carList.totalPageCount);
                break;
            case 'SUBTRACT':
                if (currentPage > 1)
                    updatePage(currentPage - 1);
                break;
            case 'ADD':
                if (currentPage < props.carListData.carList.totalPageCount)
                    updatePage(currentPage + 1);
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
                <span className={`${classes.textLinks} ${classes.paginationAction}`} onClick={() => { handlePaginationClick('FIRST') }}>First</span>
                <span className={`${classes.textLinks} ${classes.paginationAction}`} onClick={() => { handlePaginationClick('SUBTRACT') }}>Previous</span>
                Page {currentPage} of {props.carListData.carList.totalPageCount}
                <span className={`${classes.textLinks} ${classes.paginationAction}`} onClick={() => { handlePaginationClick('ADD') }}>Next</span>
                <span className={`${classes.textLinks} ${classes.paginationAction}`} onClick={() => { handlePaginationClick('LAST') }}>Last</span>
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
                        <span className={classes.mediumText}>Showing {props.carListData.carList.cars.length || 0} of {props.carListData.carList.totalCarsCount || 0} results</span>
                    }
                    <List className={classes.list}>
                        {carsArray.cars.map(car => {
                            return <Car key={car.stockNumber} car={{ ...car, "isLocal": carsArray.isLocal }}/>
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

    const filterCar = () => {
        props.getCarListHandler(colorFilter, manufacturerFilter, sortBy, currentPage);
    }

    const filterPanel = () => {
        return (
            <div className={`${classes.panel} ${classes.filterPanel}`}>
                <FormControl className={classes.filter}>
                    <InputLabel id="color-filter-label">Color</InputLabel>
                    <Select
                        labelId="color-filter-label"
                        id="color-filter-label"
                        onChange={(event) => {
                            setColorState(event.target.value);
                        }}
                        value={colorFilter}>
                        <MenuItem value={' '}>All Colors</MenuItem>
                        {
                            (props.clrFilter.colorFilter &&
                                props.clrFilter.colorFilter.colors.map(color => {
                                    return <MenuItem key={color} value={color}>{color}</MenuItem>
                                }))
                        }
                    </Select>
                </FormControl>
                <FormControl className={classes.filter}>
                    <InputLabel id="manufacturer-filter-label">Manufacturer</InputLabel>
                    <Select
                        labelId="manufacturer-filter-label"
                        id="manufacturer-filter-label"
                        onChange={(event) => {
                            setmanufacturerState(event.target.value);
                        }}
                        value={manufacturerFilter}>
                        <MenuItem value={' '}>All Manufacturer</MenuItem>
                        {
                            (props.manuFilter.manufacturerFilter &&
                                props.manuFilter.manufacturerFilter.map(manu => {
                                    return <MenuItem key={manu} value={manu}>{manu}</MenuItem>
                                }))
                        }
                    </Select>
                </FormControl>
                <FormControl className={classes.filter}>
                    <InputLabel id="sort-filter-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-filter-label"
                        id="sort-filter-label"
                        onChange={(event) => {
                            setSortBy(event.target.value);
                        }}
                        value={"asc"}>
                        <MenuItem value="asc">Mileage - Ascending</MenuItem>
                        <MenuItem value="desc">Mileage - Descending</MenuItem>
                    </Select>
                </FormControl>
                <div className={classes.filterButtonPanel}>
                    <FilterButton variant="contained" disableElevation onClick={() => filterCar()}>Filter</FilterButton>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    {!carsArray.isLocal && filterPanel()}
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