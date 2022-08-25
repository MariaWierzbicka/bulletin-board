const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  photo: { type: String },
  price: { type: Number, required: true},
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
