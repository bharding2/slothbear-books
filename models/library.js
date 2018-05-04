const mongoose = require('mongoose');
const BookSchema = require('./book');

var librarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  bookcases: [
    {
      name: String,
      shelves: [
        {
          name: String,
          books: [BookSchema]
        }
      ]
    }
  ],
  owner: String,
  location: String,
});

module.exports = mongoose.model('Library', librarySchema);