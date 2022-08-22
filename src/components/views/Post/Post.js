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
import { makeStyles } from '@material-ui/core/styles';

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

  
}));

const Component = ({className, children}) => {
  const styles = useStyles();

  const {id} = useParams();
  const post = useSelector(state => getPost(state, id));
  const { author, title, text, photo, price, phone, location } = post;

  // const currentStatus = useSelector(getStatus);
  const loggedUser = useSelector(getUser);

  console.log(loggedUser, post);
  return (
    <Grid container className={styles.root}>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h4">{post.title}</Typography>
        </Grid>
        {(loggedUser._id === post.authorId || loggedUser.admin) && 
        <Grid item xs={2} align="center">
          <Button href={`/post/${post._id}/edit`} className={styles.button}>Edit post</Button>
        </Grid>}
      </Grid>
      <Grid container direction="row">
        <Grid container direction="column" sm={6}>  
          <Typography variant="overline" gutterBottom>
            {location}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            {text}
          </Typography>
          <Typography variant="h6" display="block" gutterBottom>
          Price: ${price}
          </Typography>
          <Grid item className={styles.info}>
            <Typography variant="overline" className={styles.contact} display="block">
              Contact
            </Typography>
            <Typography variant="p" display="block">
              {author}<br></br>{phone}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" sm={6} justify="center" alignItems="center">
          <img src={photo} alt={title} />
        </Grid>
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
  Component as Post,
  // Container as Post,
  Component as PostComponent,
};
