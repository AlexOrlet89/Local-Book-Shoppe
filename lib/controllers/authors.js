const { Router } = require('express');
const Author = require('../models/Author');
const { post } = require('./books');

module.exports = Router()
  .post('/:id', async (req, res, next) => {
    try {
      const author = await Author.insert(req.body);
      res.json(author);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    res.json(authors);
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const author = await Author.getByID(id);
    res.json(author);
  });
