const setup = require('../data/setup');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const request = require('supertest');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of authors with nested books', async () => {
    const results = await request(app).get('/authors');
    expect(results.body.length).toEqual(2);
  });

  afterAll(() => {
    pool.end();
  });
});
