require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bookRouter = require("./routes/book.routes");
const authorRouter = require("./routes/author.routes");
const { loggerMiddleware } = require("./middlewares/logger.middlewares");

const app = express();

// =========================
// Middlewares
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-management-app-vduf-lpymgjlwo.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(loggerMiddleware);

// =========================
// Routes
// =========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Book Management API is running 🚀",
  });
});

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

// =========================
// 404 Handler
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;