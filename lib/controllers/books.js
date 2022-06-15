const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res, next) => {
    console.log(req.body);
    try {
      const book = await Book.insert(req.body);
      res.json(book);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const books = await Book.getByID(id);
    res.json(books);
  });
