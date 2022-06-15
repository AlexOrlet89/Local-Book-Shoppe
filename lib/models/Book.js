const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;
  author;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.author = row.authored_by;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT title, released FROM books;');
    return rows.map((row) => new Book(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query(
      `SELECT title,
       released,
        COALESCE(json_agg((json_build_object('id', authors.id, 'name', authors.name))) FILTER (WHERE authors.id IS NOT NULL), '[]') as authored_by
         FROM books
         LEFT JOIN authors_books on books.id = authors_books.book_id
         LEFT JOIN authors on authors.id = authors_books.author_id
         WHERE books.id=$1
         group by books.id`,
      [id]
    );
    return new Book(rows[0]);
  }

  static async insert({ title, released, author }) {
    const { rows } = await pool.query(
      `INSERT INTO books (title, released, author)
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [title, released, author]
    );
    return new Book(rows[0]);
  }
}

module.exports = Book;
