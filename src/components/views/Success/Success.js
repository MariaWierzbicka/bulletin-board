import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Success.module.scss';

const Component = ({className, children}) => (
  <Grid container justify="center" className={clsx(className, styles.root)}>
    <Grid item>
      <Typography variant="h2">
        Post saved!
      </Typography>
    </Grid> 
  </Grid>
);

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
  Component as Success,
  // Container as Success,
  Component as SuccessComponent,
};
