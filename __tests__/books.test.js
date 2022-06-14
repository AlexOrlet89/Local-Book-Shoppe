const setup = require('../data/setup');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const request = require('supertest');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books with nested authors', async () => {
    const results = await request(app).get('/books');
    expect(results.body.length).toEqual(4);
  });

  afterAll(() => {
    pool.end();
  });
});
