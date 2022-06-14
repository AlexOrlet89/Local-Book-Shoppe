const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books_written = row.books_written;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name, dob, pob FROM authors;');
    return rows.map((row) => new Author(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query(
      `SELECT authors.*, 
      COALESCE(json_agg(to_jsonb(books)) FILTER (WHERE books.id IS NOT NULL), '[]') as books_written FROM authors
      LEFT JOIN authors_books on authors.id = authors_books.author_id
      LEFT JOIN books on books.id = authors_books.book_id
       WHERE authors.id=$1
       group by authors.id`,
      [id]
    );
    console.log(rows);
    return new Author(rows[0]);
  }
}

module.exports = Author;
