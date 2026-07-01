require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bookRouter = require("./routes/book.routes");
const authorRouter = require("./routes/author.routes");

const { loggerMiddleware } = require("./middlewares/logger.middlewares");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

// Routes
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

module.exports = app;