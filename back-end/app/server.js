const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/db")
const router = require('./routes/Index');
const cors = require("cors");

dotenv.config();

// Create Express app
const app = express();

// Set up port
const PORT = process.env.PORT ;

// Parse JSON bodies
app.use(express.json());
app.use(cors());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

// Set up route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
