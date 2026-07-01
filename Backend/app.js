require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bookRouter = require("./routes/book.routes");
const authorRouter = require("./routes/author.routes");
const { loggerMiddleware } = require("./middlewares/logger.middlewares");

const app = express();

// Allow all origins (for now)
app.use(cors());

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Book Management API is Running 🚀",
  });
});

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;