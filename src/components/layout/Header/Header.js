import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getStatus, updateStatus } from '../../../redux/statusRedux';

import clsx from 'clsx';
import {AppBar, Button, FormControl, Grid, InputLabel, MenuItem, Select, Toolbar, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));

const Component = ({className, children}) => {
  // const styles = useStyles();

  const currentStatus = useSelector(getStatus);
  const dispatch = useDispatch();
  
  const handleChange = e => {
    e.preventDefault();
    dispatch(updateStatus(e.target.value));
  };


  return(
    <div className={clsx(className, styles.root)}>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="center" align="center">
            <Grid item xs={4}  align="center">
              <Typography>
                BulletinBoard
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <FormControl>
                {/* <InputLabel>Status</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentStatus}
                  onChange={handleChange}
                >
                  <MenuItem value={'logged'}>Logged</MenuItem>
                  <MenuItem value={'notLogged'}>Not logged</MenuItem>
                  <MenuItem value={'admin'}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} align="center">
              { currentStatus === 'notLogged' &&
              <Button>Log in</Button>}
              { (currentStatus === 'logged' || currentStatus === 'admin') && <>
                <Button href="/user/posts">My posts</Button>
                <Button >Log out</Button>
              </>}



            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
