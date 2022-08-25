import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { Button, Grid, List, ListItem, ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import styles from './UserPosts.module.scss';
import { getUser, loadUserRequest } from '../../../redux/usersRedux';
import { getPostsByUser, loadUserPostsRequest} from '../../../redux/postsRedux';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
  },
  listItem: {
    margin: '5px',
    padding: '0 30px',
  },

}));

const Component = ({className, children}) => {
  const styles = useStyles();
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!user) dispatch(loadUserRequest());
    if(user) dispatch(loadUserPostsRequest(user.userId));
  }, [user]);

  const posts = useSelector(state => {
    if(user) return getPostsByUser(state, user.userId);
    return [];
  });

  return(
    <Grid container justify="center">
      <Grid item xs={8}>
        <List className={styles.root}>
          {posts && posts.map(post=> 
            <ListItem key={post._id} className={styles.listItem}>
              <ListItemText primary={post.title} secondary={post.status} />
              <Button href={`/post/${post._id}/edit`}size="large">Edit</Button>
            </ListItem>)}          
        </List>
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
  Component as UserPosts,
  // Container as UserPosts,
  Component as UserPostsComponent,
};
