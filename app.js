const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv");
const bodyParser = require("body-parser");

const { SERVER_PORT } = process.env;
// const { checkUserRegister } = require("./server/middleware/user");
const {
  getRegisteredUser,
  saveUserDetails,
} = require("./server/controller/user");
const { log } = require("console");
const app = express();

// Set the public folder as the static directory
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes and handle requests
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", getRegisteredUser);

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.post("/register", saveUserDetails);

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
