/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

router.get('/users', async (req, res) => {
  try {
    const result = await User.find({isLogged: true});

    if(!result) res.status(404).json({ user: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/logout', async (req, res) => {
  try {
    await User.updateOne({isLogged: true}, {$set: { isLogged: false}});
    res.status(200);
  }
  catch(err) {
    res.status(500).json(err);
  }

});

module.exports = router;
