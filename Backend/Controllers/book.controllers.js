const booksTable = require("../Models/book.models");
const authorsTable = require("../Models/author.models");
const { sql, eq } = require("drizzle-orm");
const db = require("../db");

// GET /books
const getAllBooks = async (req, res) => {
  try {
    const search = req.query.search;

    if (search) {
      const books = await db
        .select()
        .from(booksTable)
        .where(
          sql`to_tsvector('english', ${booksTable.title}) @@ plainto_tsquery('english', ${search})`
        );

      return res.json(books);
    }

    const books = await db.select().from(booksTable);

    return res.json(books);
  } catch (error) {
    console.error("❌ getAllBooks Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch books.",
      error: error.message,
    });
  }
};

// GET /books/:id
const findbyid = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db
      .select()
      .from(booksTable)
      .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
      .where(eq(booksTable.id, id))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const book = {
      ...result[0].book,
      author: result[0].authors,   // ✅ FIXED
    };

    return res.json({
      message: "Book found successfully!",
      book,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// POST /books
const addBooks = async (req, res) => {
  try {
    const { title, description, authorId } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required!",
      });
    }

    const result = await db
      .insert(booksTable)
      .values({
        title,
        description,
        authorId,
      })
      .returning();

    return res.status(201).json({
      message: "Book added successfully!",
      book: result[0],
    });
  } catch (error) {
    console.error("❌ addBooks Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add book.",
      error: error.message,
      cause: error.cause,
    });
  }
};

// DELETE /books/:id
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    await db.delete(booksTable).where(eq(booksTable.id, id));

    return res.json({
      message: "Book deleted successfully!",
    });
  } catch (error) {
    console.error("❌ deleteBook Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete book.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  findbyid,
  addBooks,
  deleteBook,
};