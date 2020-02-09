/**
 * filter component which is used to render filter widgets
 */


import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import sharedStyles from '../../sharedStyles';

/**
 * Styles for filter component
 * @param {*} theme 
 */
const styles = theme => ({
    ...sharedStyles(theme),
    filter: {
        display: "flex",
        margin: "12px 0",
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

const Filter = (props) => {
    const { classes } = props;

    const [colorFilter, setColorState] = useState(' ');

    const [manufacturerFilter, setmanufacturerState] = useState(' ');

    const [sortBy, setSortBy] = useState('asc');

    useEffect(() => {
        props.getColorFilterHandler();
        props.getManufacturerFilterHandler();
    }, []);

    const handleFilterChange = () => {
        props.filterClick(colorFilter, manufacturerFilter, sortBy);
    }

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
                    value={sortBy}>
                    <MenuItem value="asc">Mileage - Ascending</MenuItem>
                    <MenuItem value="desc">Mileage - Descending</MenuItem>
                </Select>
            </FormControl>
            <div className={classes.filterButtonPanel}>
                <FilterButton variant="contained" disableElevation onClick={() => handleFilterChange()}>Filter</FilterButton>
            </div>
        </div>
    )
}

export default withStyles(styles)(Filter);