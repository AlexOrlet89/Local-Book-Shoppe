-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    released INT NOT NULL
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    pob VARCHAR,
    dob INT NOT NULL
);

INSERT INTO books (
    title, released
)

VALUES 
    ('The Monster at the end of this book', 1971),
    ('Lovable furry old Grovers resting places', 1984),
    ('Spots First Walk', 1981),
    ('Wheres Spot', 1980)
;

INSERT INTO authors (
    name,
    pob,
    dob
)

VALUES 
('Eric Hill', 'Holloway, London', 1927),
('Jon Stone', 'New Haven, Connecticut', 1932);
