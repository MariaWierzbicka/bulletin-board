/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  admin: {type: Boolean, required: true},
  isLogged: {type: Boolean, required: true},
});

module.exports = mongoose.model('User', userSchema);
