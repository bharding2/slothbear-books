const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();
const PORT = process.env.PORT || 5555;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/slothbear_books_DB');

const libraryRouter = require('./routes/library_router');
const bookRouter = require('./routes/book_router');

app.use('/api', libraryRouter);
app.use('/api', bookRouter);

module.exports = app.listen(PORT, () => console.log(`server up on port ${PORT}`));
