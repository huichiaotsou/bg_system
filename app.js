require("dotenv");
const express = require("express");
const path = require("path");
const { SERVER_PORT } = process.env;

// Import controllers
const {
  getUserWithID,
  getRegisteredUser,
  saveUserDetails,
} = require("./server/controller/user");
const { errorHandler } = require("./server/middleware/error");

const app = express();
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static directories
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "checkin")));
app.use(express.static(path.join(__dirname, "public", "dashboard")));
app.use(express.static(path.join(__dirname, "public", "login")));
app.use(express.static(path.join(__dirname, "public", "register")));

app.post("/login", getRegisteredUser);

// Get, Create, Update, Delete user
app.get("/user/:userID", getUserWithID);
app.post("/user", saveUserDetails);
// TODO:
app.get("/user/:userID");
app.get("/user/:userID");

// Error handling
app.use(errorHandler);
