const setup = require('../data/setup');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const Book = require('../lib/models/Book');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of books with nested authors', async () => {
    const results = await request(app).get('/books');
    expect(results.body.length).toEqual(4);
  });

  it.skip('should return a book with the author information', async () => {
    const results = await request(app).get('/books/1');
    expect(results.body.title).toEqual('The Monster at the end of this book');
    expect(results.body.author[0].name).toEqual('Eric Hill');
  });

  it('should insert a new book into our table', async () => {
    const book = new Book({ title: 'my book', released: 1999 });
    const results = await request(app).post('/books/:id').send(book);
    console.log('console looog', results.body);
    expect(results.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
