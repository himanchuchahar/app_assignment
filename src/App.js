import React from 'react';
import AppRoutes from './routes';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import sharedStyles from './sharedStyles'

const styles = theme => ({
  ...sharedStyles(theme),
  root: {
    flexGrow: 1,
  },
  container: {
    padding: "12px",
    height: "calc(100vh - 100px)",
  }
});


function App(props) {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <AppRoutes />
      </Box>

      <div className={classes.footer}>
        &#64; Copyright AppName
	  </div>
    </div>
  );
}

export default withStyles(styles)(App);
