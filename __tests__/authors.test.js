const setup = require('../data/setup');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const Author = require('../lib/models/Author');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of authors with nested books', async () => {
    const results = await request(app).get('/authors');
    expect(results.body.length).toEqual(2);
  });

  it('should return an author with their books', async () => {
    const results = await request(app).get('/authors/1');
    expect(results.body.name).toEqual('Eric Hill');
    expect(results.body.books_written.length).toEqual(2);
  });

  it('should insert a new author into our table', async () => {
    const author = new Author({
      name: 'Alex Orlet',
      dob: 1989,
      pob: 'St.Louis, Missouri',
    });
    const results = await request(app).post('/authors/:id').send(author);
    console.log('console looog', results.body);
    expect(results.status).toEqual(200);
    expect(results.body.name).toEqual('Alex Orlet');
  });

  afterAll(() => {
    pool.end();
  });
});
