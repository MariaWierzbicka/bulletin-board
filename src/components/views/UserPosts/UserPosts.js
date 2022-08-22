import React from 'react';
import PropTypes from 'prop-types';

// import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { Button, Grid, List, ListItem, ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import styles from './UserPosts.module.scss';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { getPostsByUser } from '../../../redux/postsRedux';

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

  const loggedUser = useSelector(getUser);
  console.log(loggedUser._id);
  const posts = useSelector(state => getPostsByUser(state, loggedUser._id));

  return(
    <Grid container justify="center">
      <Grid item xs={8}>
        <List className={styles.root}>
          {posts.map(post=> 
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
