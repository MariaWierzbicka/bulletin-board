import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {getUser, loadUserRequest} from '../../../redux/usersRedux';
import { addPostRequest } from '../../../redux/postsRedux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { getPosts, loadPostsRequest} from '../../../redux/postsRedux';

import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { NotFound } from '../NotFound/NotFound';

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
  const user = useSelector(getUser);
  const history = useHistory();

  useEffect(() => {
    dispatch(loadPostsRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUserRequest());
  }, [dispatch]);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [price, setPrice] = useState('');

  
  const handleSubmit = newStatus => {  
    dispatch(addPostRequest( { 
      author: user.email,
      authorId: user.userId,
      created: new Date(),
      updated: new Date(),
      location,
      status: newStatus,
      title,
      text, 
      photo,
      price,
    }));
    history.replace('/');
  };


  if(user){  
    return (
      <Container className={clsx(className, styles.root)}>
        <Grid container direction="column" align="center">      
          <Typography variant="h2" gutterBottom >
            Add post
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
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
