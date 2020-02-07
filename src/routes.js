import React from 'react';
import { store } from './store/store'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CarList from './containers/carList/carList.map';
import CarDetails from './containers/carDetails/carDetails.map';
import NotFound from './containers/notFound/notFound.container';
import sharedStyles from './sharedStyles';

const styles = theme => ({
  ...sharedStyles(theme),
  title: {
    flexGrow: 1,
    color: "black"
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
  activeLink: {
    color: "#ea7f28",
    textDecoration: "underline",
  }
})
const AppRoutes = (props) => {
  const { classes } = props;
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppBar position="fixed" className={classes.appHeader}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              AppName
            </Typography>
            <Button>
              <NavLink to="/" exact  activeClassName={classes.activeLink} className={classes.link}>All Cars</NavLink>
            </Button>
            <Button>
              <NavLink to="/savedcars" exact activeClassName={classes.activeLink} className={classes.link}>Saved Cars</NavLink>
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ height: "80px" }}></div>
        <Switch>
        <Route key="savedcars" path="/savedcars" exact component={CarList} />
        <Route key="cars" path="/" exact component={CarList} />
        <Route path="/detail/:id" exact component={CarDetails} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter >
    </Provider>
  )
};

export default withStyles(styles)(AppRoutes);
