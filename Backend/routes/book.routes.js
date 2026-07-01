const express = require("express");

const controller = require("../Controllers/book.controllers");

const router = express.Router();

router.get("/", controller.getAllBooks);

router.get("/:id", controller.findbyid);

router.post("/", controller.addBooks);

router.delete("/:id", controller.deleteBook);

module.exports = router;