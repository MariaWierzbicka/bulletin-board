import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


// import clsx from 'clsx';
import { Header } from '../Header/Header';

import { Container, Grid} from '@material-ui/core';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

// import styles from './MainLayout.module.scss';
const useStyles = makeStyles((theme) => ({

  root: {    
    padding: '50px 0',
    minHeight: '500px',
  },
  footer: {
    background: theme.palette.primary.light,
  },
}));

const Component = ({className, children}) => {
  const styles = useStyles();
  return (

    <>
      <Header />
      <Container maxWidth="md" className={styles.root}>
        {children}
      </Container>
      <Grid container className={styles.footer} justify="center">
      ©  MW 2022
      </Grid>
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
