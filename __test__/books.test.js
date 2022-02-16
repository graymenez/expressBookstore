const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

describe("book routes", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM books");
    await db.query("DROP TABLE IF EXISTS books");
    await db.query(
      "CREATE TABLE books (isbn TEXT PRIMARY KEY,amazon_url TEXT,author TEXT,language TEXT, pages INTEGER,publisher TEXT,title TEXT, year INTEGER)"
    );
    let testBook = await Book.create({
      isbn: "0691161518",
      amazon_url: "http://a.co/eobPtX2",
      author: "Corey Jimenez",
      language: "spanish",
      pages: 264,
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017,
    });
    console.log("#########################");
    console.log(testBook);
    console.log("#########################");
  });
  test("create book", async function () {
    let response = await request(app)
      .post("/books")
      .send({
        book: {
          isbn: "06911615189",
          amazon_url: "http://a.co/eobPtX2",
          author: "test",
          language: "test",
          pages: 264,
          publisher: "test",
          title: "test",
          year: 2017,
        },
      });
    expect(response.body).toEqual({
      book: {
        isbn: "06911615189",
        amazon_url: "http://a.co/eobPtX2",
        author: "test",
        language: "test",
        pages: 264,
        publisher: "test",
        title: "test",
        year: 2017,
      },
    });
    expect(response.statusCode).toBe(201);
  });
  test("update a book", async function () {
    let response = await request(app)
      .put("/books/0691161518")
      .send({
        book: {
          amazon_url: "http://a.co/eobPtX2",
          author: "Corey Graysky Jimenez",
          language: "spanish",
          pages: 264,
          publisher: "Princeton University Press",
          title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
          year: 2017,
        },
      });
    expect(response.body).toEqual({
      book: {
        isbn: "0691161518",
        amazon_url: "http://a.co/eobPtX2",
        author: "Corey Graysky Jimenez",
        language: "spanish",
        pages: 264,
        publisher: "Princeton University Press",
        title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        year: 2017,
      },
    });
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async function () {
  await db.end();
});
