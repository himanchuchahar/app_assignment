import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

/**
*	Styles for notFound
*/
const useStyles = makeStyles(theme => ({
    root: {
        textAlign:"center",
    },
    errorHeading: {
        fontWeight: "bold",
        fontSize: "32px",
    },
    errorDescription: {
        fontSize: "18px",
    },
    linkClass: {
        textDecoration: "none",
        color: "#EA7F28",
    },
}));


const NotFound = () => {

    const classes = useStyles();

    const homePageLink = () => {
        return (
            <span>
                <Link
                    to='/'
                    className={classes.linkClass}>
                    HomePage
            </Link>
            </span>
        )
    }


    return (
        <div className={classes.root}>
            <p className={classes.errorHeading}>404 - Not Found</p>
            <span className={classes.errorDescription}>
                Sorry, the page you are looking for does not exist.
                <p>You can always go back to the {homePageLink()}.</p>
            </span>
        </div>
    )
}

export default NotFound;