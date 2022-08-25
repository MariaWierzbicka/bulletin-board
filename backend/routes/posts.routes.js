const express = require('express');
const router = express.Router();
/* eslint-disable linebreak-style */


const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/users/:id/posts', async (req, res) => {
  try {
    const result = await Post.find({authorId: req.params.id});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  try{
    const { title, text, author, authorId, created, updated, status, price, location, phone, photo} = req.body;

    if(title && author && authorId && created && status && price &&
      ( title.length <= 10 && text.length <= 20 )) {
      
      const newPost = new Post({ title, author, authorId, created, updated, status, text, location, price, photo, phone });
      await newPost.save();
      res.json(newPost);
    }
  } catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
