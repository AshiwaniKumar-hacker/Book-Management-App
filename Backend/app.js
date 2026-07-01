require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bookRouter = require("./routes/book.routes");
const authorRouter = require("./routes/author.routes");
const { loggerMiddleware } = require("./middlewares/logger.middlewares");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin (Postman, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

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