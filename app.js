const express = require("express");
const path = require("path");
require("dotenv");

const { SERVER_PORT } = process.env;
const app = express();

// Set the public folder as the static directory
app.use(express.static(path.join(__dirname, "public")));

// Define routes and handle requests
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
