const express = require("express");
const path = require("path");
require("dotenv");
const bodyParser = require("body-parser");

const { SERVER_PORT } = process.env;
const { postForm } = require("./server/controller/form");
const app = express();

// Set the public folder as the static directory
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes and handle requests
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register", "register.html"));
});

app.post("/form", postForm);

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
