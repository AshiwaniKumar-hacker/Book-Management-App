const express = require("express");
const router = express.Router();

const {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  getBooksByAuthor,
} = require("../Controllers/author.controllers");

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.post("/", addAuthor);
router.get("/:id/books", getBooksByAuthor);

module.exports = router;