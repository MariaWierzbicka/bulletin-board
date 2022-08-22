import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getPublishedPosts } from '../../../redux/postsRedux';
import { getStatus } from '../../../redux/statusRedux';
import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';
// import styles from './Homepage.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    minheight: 400,
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
  const styles = useStyles();
  const posts = useSelector(getPublishedPosts);
  const currentStatus = useSelector(getStatus);
  
  const postsSorted = posts.sort((a, b) => {
    return a.updated - b.updated  ;
  });

  return(
    <Grid className={clsx(className, styles.root)}>
      <Grid container direction="row"
        justify="center"
        alignItems="center">
        {(currentStatus === 'logged' || currentStatus === 'admin') && 
          <Button href="/post/add"  size="large" className={styles.button}>Add new post</Button>}
      </Grid>
      <Grid container className={styles.posts} spacing={8}>
        {postsSorted.map(post =>
          <Grid item xs={3} key={post._id}>
            <Card >
              <CardActionArea>
                <CardMedia  image={post.photo} title={post.photo}/>
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
                <Button href={`/post/${post._id}`} size="small" color="primary">
                  Read more
                </Button>                
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

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
