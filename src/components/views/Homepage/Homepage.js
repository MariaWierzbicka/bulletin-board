import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPosts, loadPostsRequest, getLoading} from '../../../redux/postsRedux';
import { makeStyles } from '@material-ui/core/styles';
import { loadUserRequest, getUser } from '../../../redux/usersRedux';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography} from '@material-ui/core';
// import styles from './Homepage.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  media: {
    height: 140,
  },
  button: {
    background: theme.palette.primary.main,
    margin: '0 0 40px 0',
    color: theme.palette.primary.contrastText,
  },
}));

const Component = ({className, children}) => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const loading = useSelector(getLoading);

  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(loadUserRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadPostsRequest());
  }, [dispatch]);

  const styles = useStyles();
  
  if(loading.active) return <h1>Loading</h1>;
  else if(loading.error) return <h1>Error</h1>;
  else return(
    <Grid className={clsx(className, styles.root)}>
      <Grid container direction="row"
        justify="center"
        alignItems="center">
        { user && 
          <Button href="/post/add"  size="large" className={styles.button}>Add new post</Button>}
      </Grid>
      <Grid container className={styles.posts}  spacing={8}>
        {posts && posts.map(post =>
          <Grid item xs={3} key={post._id}>
            <Card >
              <CardActionArea>
                {/* <CardMedia  image={post.photo} title={post.photo}/> */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {post.text}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to={`/post/${post._id}`}>
                  <Button  size="small" color="primary">
                    Read more
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
