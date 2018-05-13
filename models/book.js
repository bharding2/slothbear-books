const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  gr_id: String,
  author: {
    gr_id: String,
    name: String
  },
  // authors: [String],
  isbn: String,
  series: [String],
  genre: [String],
  rating: Number,
  pageCount: Number,
  publishDate: Date,
});

module.exports = mongoose.model('Book', bookSchema);