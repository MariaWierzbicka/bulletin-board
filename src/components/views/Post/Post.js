import React from 'react';
import PropTypes from 'prop-types';

// import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { Button, Grid, Typography} from '@material-ui/core';

// import styles from './Post.module.scss';
// import { getStatus } from '../../../redux/statusRedux';
import { getUser } from '../../../redux/usersRedux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPost } from '../../../redux/postsRedux';


const Component = ({className, children}) => {
  const {id} = useParams();
  const post = useSelector(state => getPost(state, id));
  // const { author, authorId, created, updated, title, text, photo, price, phone, location } = post;

  // const currentStatus = useSelector(getStatus);
  const loggedUser = useSelector(getUser);

  console.log(loggedUser, post);
  return (
    <Grid container>
      <Grid item xs={10}>
        <Typography variant="h4">{post.title}</Typography>
      </Grid>
      {loggedUser._id === post.authorId && 
      <Grid item xs={2}>
        <Button href={`/post/${post._id}/edit`}>Edit post</Button>
      </Grid>}
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
  Component as Post,
  // Container as Post,
  Component as PostComponent,
};
