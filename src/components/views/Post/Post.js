import React from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';

// import { connect } from 'react-redux';
import { Button, Grid, Typography} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// import styles from './Post.module.scss';

import {getUser, loadUserRequest} from '../../../redux/usersRedux';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoading, getPost, loadSinglePostRequest} from '../../../redux/postsRedux';

import { makeStyles } from '@material-ui/core/styles';
import { NotFound } from '../NotFound/NotFound';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 0 0 40px',
  },
  button: {
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
  },
  contact: {
    color: theme.palette.secondary.dark,
    fontSize: 16,
  },
  info: {
    margin: '20px 0',
  },
  date: {
    lineHeight: 1,
    fontSize: 10,
  },
  dateItem: {
    margin: '0 0 20px 0',
  },
  icon: {
    fontSize: 'small',
  },
  section: {
    margin: '30px 0 0 0',
  },
}));

const Component = ({className, children}) => {
  const styles = useStyles();
  const {id} = useParams();

  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const post = useSelector(state => getPost(state, id));
  const user = useSelector(getUser);
  
  useEffect(() => {
    if(!post) dispatch(loadSinglePostRequest(id));
    dispatch(loadUserRequest());
  }, [dispatch]);

  if(loading.active) {
    return <h1>Loading</h1>;
  } else if(loading.error) {
    return <h1>Error</h1>;
  } else if(!post) { return <NotFound />;
  } else { 
    const { author, created, updated, title, text, photo, price, phone, location } = post;
    const dateCreated = new Date(created);
    const dateUpdated = new Date(updated);

    return (
  
      <Grid container className={styles.root}>
        <Grid container justify="flex-start" >
          <Grid item  className={styles.dateItem}>
            <Typography className={styles.date} variant="overline" >
              Created: {dateCreated.toDateString()}  /  Last update: {dateUpdated.toDateString()}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9} >
            <Typography variant="h4">{post.title}</Typography>
          </Grid>
          { user && (user.userId === post.authorId || user.admin) && 
          <Grid item xs={2} container justify="flex-end">
            <Button href={`/post/${post._id}/edit`} className={styles.button}>Edit post</Button>
          </Grid>}
        </Grid>
        <Grid container >
          <Grid item  sm={7}> 
            <Grid item sm={10}> 
              <Typography variant="overline" gutterBottom>
                <LocationOnIcon className={styles.icon}/>{location}
              </Typography>
            </Grid>
            <Grid item sm={10} className={styles.section}> 
              <Typography variant="body1" display="block" gutterBottom>
                {text}
              </Typography>
            </Grid>
            <Grid item sm={10} className={styles.section}> 
              <Typography variant="h6" display="block" gutterBottom>
            Price: ${price}
              </Typography>
            </Grid>
            <Grid item sm={10}className={styles.info}>
              <Typography variant="overline" className={styles.contact} display="block">
                Contact
              </Typography>
              <Typography display="block">
                {author}<br></br>{phone}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justify="flex-end" alignItems="center" sm={4}>
            <Grid item className={styles.section}>
              <img src={photo} alt={title} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Post,
  // Container as Post,
  Component as PostComponent,
};
