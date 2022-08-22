import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {getUser} from '../../../redux/usersRedux';
import { addPost } from '../../../redux/postsRedux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';


// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { Button, Container, FormControl, Grid, Input, InputLabel, TextField, TextareaAutosize, Typography, FormControlLabel } from '@material-ui/core';

// import styles from './PostAdd.module.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
  },


}));

const Component = ({className, children}) => {
  const styles = useStyles();

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');
  const [created, setCreated] = useState('');
  const [updated, setUpdated] = useState('');
  const [email, setEmail] = useState('');

  const author = user.email;
  const authorId = user.authorId; 
  

  const handleSave = e => {
    e.preventDefault();
    setStatus('draft');
    setCreated(new Date());
    setUpdated(created);
    
    dispatch(addPost( { 
      author,
      authorId,
      created,
      updated,
      location,
      status,
      title,
      text, 
      photo,
      price,
    }));

  };
  return (
    <Container className={clsx(className, styles.root)}>
      <Typography variant="h4" gutterBottom>
        Add post
      </Typography>
      <Grid container direction="column" >      
        <form  noValidate autoComplete="off">
          <Grid item sm={10}>
            <TextField variant="outlined" id="standard-basic" label="Standard" />

            {/* <FormControl>
              <Input fullWidth value={title} id="title" placeholder="Title" type="text" minLength="10"
                onChange={e => setTitle(e.target.value)}/>
            </FormControl> */}
          </Grid>
          <Grid item sm={10}>

            <FormControl>
              <Input multiline outlined rows={4} value={title} id="title" placeholder="Title" type="text" minLength="10"
                onChange={e => setTitle(e.target.value)}/>
            </FormControl>
          </Grid>

          <Grid item sm={10}>

            <FormControl>
              <Input  value={title} id="title" placeholder="Title" type="text" minLength="10"
                onChange={e => setTitle(e.target.value)}/>
            </FormControl>
          </Grid>

          <Grid item sm={6}>

            <FormControl>
              <Input  value={title} id="title" placeholder="Title" type="text" minLength="10"
                onChange={e => setTitle(e.target.value)}/>
            </FormControl>
          </Grid>

          <Grid item sm={6}>

            <FormControl>
              <Input  value={title} id="title" placeholder="Title" type="text" minLength="10"
                onChange={e => setTitle(e.target.value)}/>
            </FormControl>
          </Grid>

        
        </form>
        <Button  onClick={handleSave}>Save</Button>
      </Grid>

    </Container>
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
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
