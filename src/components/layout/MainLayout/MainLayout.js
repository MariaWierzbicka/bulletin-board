import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// import clsx from 'clsx';
import { Header } from '../Header/Header';

import {Container} from '@material-ui/core';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

// import styles from './MainLayout.module.scss';
const useStyles = makeStyles({
  root: {
    minheight: 400,
    padding: '50px 0',
  },
});
const Component = ({className, children}) => {
  const styles = useStyles();
  return (

    <>
      <Header />
      <Container maxWidth="md" className={styles.root}>
        {children}
      </Container>
    </>
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
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
