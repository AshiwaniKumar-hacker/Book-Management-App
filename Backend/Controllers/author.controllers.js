const authorsTable = require("../Models/author.models");
const booksTable = require("../Models/book.models");
const db = require("../db");
const { eq } = require("drizzle-orm");

// GET /authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await db.select().from(authorsTable);

    return res.json({
      message: "Authors fetched successfully!",
      authors,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// GET /authors/:id
const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;

    const author = await db
      .select()
      .from(authorsTable)
      .where(eq(authorsTable.id, id))
      .limit(1);

    if (author.length === 0) {
      return res.status(404).json({
        message: "Author not found!",
      });
    }

    return res.json({
      message: "Author fetched successfully!",
      author: author[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// POST /authors
const addAuthor = async (req, res) => {
   console.log("BODY:", req.body);
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const result = await db
      .insert(authorsTable)
      .values({
        firstName,
        lastName,
        email,
      })
      .returning();

    return res.status(201).json({
      message: "Author added successfully!",
      author: result[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// GET /authors/:id/books
const getBooksByAuthor = async (req, res) => {
  try {
    const id = req.params.id;

    const author = await db
      .select()
      .from(authorsTable)
      .where(eq(authorsTable.id, id))
      .limit(1);

    if (author.length === 0) {
      return res.status(404).json({
        message: "Author not found!",
      });
    }

    const books = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.authorId, id));

    return res.json({
      message: "Books fetched successfully!",
      author: author[0],
      books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  getBooksByAuthor,
};