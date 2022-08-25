/* eslint-disable linebreak-style */
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user.model');

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), 
  async (req, res) => {

    const user = await User.findOne({userId: req.user.id});
    if (!user) {
      const newUser = new User({userId: req.user.id, email: req.user.emails[0].value, admin: false, isLogged: true});
      await newUser.save();
    } else{
      await User.updateOne({userId: req.user.id},{ $set: {isLogged: true}});
    }    

    res.redirect('http://localhost:3000');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err)  return next(err);
  });
  res.redirect('/');

});

module.exports = router;