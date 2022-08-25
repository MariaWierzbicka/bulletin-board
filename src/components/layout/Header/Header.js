import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loadUserRequest, getUser, logoutRequest } from '../../../redux/usersRedux';
import { useEffect } from 'react';
import clsx from 'clsx';
import {AppBar, Button, Grid, Link, Toolbar, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.contrastText,
  },
}));

const Component = ({className, children}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(loadUserRequest());
  }, [dispatch]);

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logoutRequest());
    window.location.reload();
  };


  return(
    <div className={clsx(className, styles.root)}>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-around" alignItems="center">
            <Grid item xs={4}  align="center">
              <Typography variant="h6"><Link href="/" className={styles.root} >BulletinBoard</Link></Typography>
            </Grid>
            <Grid item xs={4} align="center">
              { !user &&
                <Button href="http://localhost:8000/auth/google" className={styles.root}>Log in</Button>}
              { user && <>
                <Button href="/user/posts" className={styles.root}>My posts</Button>
                <Button onClick={handleLogout}  className={styles.root}>Log out</Button>
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

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
