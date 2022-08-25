import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {getUser} from '../../../redux/usersRedux';
import { editPost } from '../../../redux/postsRedux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { getPost } from '../../../redux/postsRedux';
import { useParams } from 'react-router-dom';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { NotFound } from '../NotFound/NotFound';

// import styles from './PostEdit.module.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
  },
  field: {
    margin: '20px 0',
    align: 'center',
  },
}));

const Component = ({className, children}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const loggedUser = useSelector(getUser);
  const {id} = useParams();
  const post = useSelector(state => getPost(state, id));


  const [title, setTitle] = useState(post.title || '');
  const [text, setText] = useState(post.text || '');
  const [location, setLocation] = useState(post.location || '');
  const [phone, setPhone] = useState(post.phone || '');
  const [photo, setPhoto] = useState('');
  const [price, setPrice] = useState(post.price || '');

  const handleSubmit = newStatus => {    
    dispatch(editPost( { 
      _id: post._id,
      author: loggedUser.email,
      authorId: loggedUser._id,
      created: post.created,
      updated: new Date(),
      location,
      status: newStatus,
      title,
      text, 
      photo,
      price,
    }));
  };
  if(post !== undefined && loggedUser && (loggedUser._id === post.authorId || loggedUser.admin)){
    return (
      <Container className={clsx(className, styles.root)}>
        <Grid container direction="column" align="center">      
          <Typography variant="h4" gutterBottom >
            Edit post
          </Typography>   
        </Grid>
        <Grid container direction="column" align="center">      
          <form autoComplete="off">
            <Grid item sm={7} className={styles.field}>            
              <TextField variant="outlined" fullWidth height={1} value={title} id="title" placeholder="Title" type="text" minLength="10"
                onChange={e => setTitle(e.target.value)} />
            </Grid>
            <Grid item sm={7} width={100} className={styles.field} >
              <TextField multiline fullWidth variant="outlined" rows={4} value={text} id="text" placeholder="Text" type="text" minLength="50"
                onChange={e => setText(e.target.value)}/>
            </Grid>
            <Grid item sm={7}>
              <Button variant="contained" component="label">
                Upload photo
                <input type="file" hidden value={photo} onChange={e => setPhoto(e.target.value)} />
              </Button>
            </Grid>
            <Grid item sm={5} className={styles.field}>            
              <TextField variant="outlined" fullWidth value={price} id="price" placeholder="Price" type="text"
                onChange={e => setPrice(e.target.value)} />
            </Grid>
            <Grid item sm={5} className={styles.field}>            
              <TextField variant="outlined" fullWidth value={location} id="location" placeholder="Location" type="text"
                onChange={e => setLocation(e.target.value)} />
            </Grid>
            <Grid item sm={4} className={styles.field}>            
              <TextField variant="outlined" fullWidth value={phone} id="phone" placeholder="Phone number" type="text"
                onChange={e => setPhone(e.target.value)} />
            </Grid>
            <Grid item align="center">
              <Button onClick={(e) => {e.preventDefault(); handleSubmit('draft');}}>Save</Button>
              <Button onClick={(e) => {e.preventDefault(); handleSubmit('published');}}>Publish</Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    );
  } else {
    return(<NotFound />);
  }
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
  Component as PostEdit,
  // Container as PostEdit,
  Component as PostEditComponent,
};
