import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getPublishedPosts } from '../../../redux/postsRedux';
import { getStatus } from '../../../redux/statusRedux';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { Button, Grid, Typography} from '@material-ui/core';
import styles from './Homepage.module.scss';

const Component = ({className, children}) => {
  const posts = useSelector(getPublishedPosts);
  const currentStatus = useSelector(getStatus);
  return(
    <div className={clsx(className, styles.root)}>
      <Grid container>
        {(currentStatus === 'logged' || currentStatus === 'admin') && 
          <Button href="/post/add"  size="lg" className="btn-pill">Add new post</Button>}
      </Grid>
      <Grid container>
        {posts.map(post => 
          <Grid item key={post._id} xs={3} align="center">
            <Typography>{post.title}</Typography>
          </Grid>)}
      </Grid>
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
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
