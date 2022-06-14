const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT title, released FROM books;');
    return rows.map((row) => new Book(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query(
      'SELECT title, released FROM books WHERE id=$1;',
      [id]
    );
    return new Book(rows[0]);
  }
}

module.exports = Book;
