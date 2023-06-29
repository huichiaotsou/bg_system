const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv");
const bodyParser = require("body-parser");

const { SERVER_PORT } = process.env;
const { postUserData } = require("./server/controller/form");
const { saveUserDetails } = require("./server/controller/login");
const app = express();

// Set the public folder as the static directory
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes and handle requests
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", (req, res) => {
  const payload = jwt.decode(req.body.credential);
  console.log(payload.email);
  console.log(payload.given_name);
  console.log(payload.family_name);
  console.log(payload.picture);
  // Verify if email has been registered in our system
});

// TODO: Need verifyUser middleware
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.post("/post_user_data", postUserData);

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
