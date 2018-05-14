const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const handleErr = require('./../lib/handle_err');

const Library = require('./../models/library');
let libraryRouter = Router();

libraryRouter.post('/library', bodyParser, (req, res) => {
  let newLibrary = new Library(req.body);

  newLibrary.save((err, data) => {
    if (err) return handleErr(err, res, 401, 'error saving library');
    res.status(200).json(data);
  });
});

libraryRouter.put('/library/:id', bodyParser, (req, res) => {
  let libraryData = req.body;
  delete libraryData._id;

  Library.update({ _id: req.params.id}, libraryData, (err, data) => {
    if (err) return handleErr(err, res, 401, 'error updating library');
    if (!data.ok) return handleErr(null, res, 401, 'error updating library');
    if (!data.nModified) return handleErr(null, res, 404, 'library not found');
    res.status(200).json({ msg: 'library updated by creator' });
  });
});

libraryRouter.delete('/library/:id', (req, res) => {
  Library.findOneAndRemove({ _id: req.params.id}, (err, doc) => {
    if (err) return handleErr(err, res, 401, 'error deleting library');
    if (!doc) return handleErr(null, res, 404, 'library not found');
    res.status(200).json({ msg: 'library deleted by creator' });
  });
});

libraryRouter.get('/library/all', (req, res) => {
  Library.find(null, (err, data) => {
    if (err) return handleErr(err, res, 403, 'error accessing librarys');
    res.status(200).json(data);
  });
});

libraryRouter.get('/library/:id', (req, res) => {
  Library.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return handleErr(err, res, 403, 'error accessing library');
    if (!data) return handleErr(null, res, 404, 'library not found');
    res.status(200).json(data);
  });
});

module.exports = libraryRouter;
