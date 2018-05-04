if (!process.env.APP_SECRET) process.env.APP_SECRET = 'secret';

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5555;

const connection =  mongoose.createConnection(process.env.MONGODB_URI ||
  'mongodb://localhost/slothbear_books');

module.exports = app.listen(PORT, () => console.log(`server up on port ${PORT}`));
