const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const handleErr = require('./../lib/handle_err');

const Book = require('./../models/book');
let bookRouter = Router();

bookRouter.post('/book', bodyParser, (req, res) => {
  let newBook = new Book(req.body);

  newBook.save((err, data) => {
    if (err) return handleErr(err, res, 401, 'error saving book');
    res.status(200).json(data);
  });
});

bookRouter.put('/book/:id', bodyParser, (req, res) => {
  let bookData = req.body;
  delete bookData._id;

  Book.update({ _id: req.params.id}, bookData, (err, data) => {
    if (err) return handleErr(err, res, 401, 'error updating book');
    if (!data.ok) return handleErr(null, res, 401, 'error updating book');
    if (!data.nModified) return handleErr(null, res, 404, 'book not found');
    res.status(200).json({ msg: 'book updated' });
  });
});

bookRouter.delete('/book/:id', (req, res) => {
  Book.findOneAndRemove({ _id: req.params.id}, (err, doc) => {
    if (err) return handleErr(err, res, 401, 'error deleting book');
    if (!doc) return handleErr(null, res, 404, 'book not found');
    res.status(200).json({ msg: 'book deleted' });
  });
});

bookRouter.get('/book/all', (req, res) => {
  Book.find(null, (err, data) => {
    if (err) return handleErr(err, res, 403, 'error accessing books');
    res.status(200).json(data);
  });
});

bookRouter.get('/book/:id', (req, res) => {
  Book.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return handleErr(err, res, 403, 'error accessing book');
    if (!data) return handleErr(null, res, 404, 'book not found');
    res.status(200).json(data);
  });
});

module.exports = bookRouter;
