const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5555;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/slothbear_books_DB');

const libraryRouter = require('./routes/library_router');

app.use('/api', libraryRouter);

module.exports = app.listen(PORT, () => console.log(`server up on port ${PORT}`));
