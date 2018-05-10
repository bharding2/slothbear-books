const mongoose = require('mongoose');
const bookSchema = require('./book.js').schema;

var librarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  bookcases: [
    {
      name: String,
      shelves: [
        {
          name: String,
          books: [bookSchema]
        }
      ]
    }
  ],
  owner: String,
  location: String,
});

module.exports = mongoose.model('Library', librarySchema);