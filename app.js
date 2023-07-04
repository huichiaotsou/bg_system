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
const { saveUserCheckin } = require("./server/controller/checkin");

// Import middlewares
const { verifyUserIdentity } = require("./server/middleware/user");

// Init app
const app = express();
app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`));

// Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static directories
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "checkin")));
app.use(express.static(path.join(__dirname, "public", "dashboard")));
app.use(express.static(path.join(__dirname, "public", "login")));
app.use(express.static(path.join(__dirname, "public", "register")));

// User
app.post("/login", getRegisteredUser); // Login
app.get("/user/:userID", verifyUserIdentity, getUserWithID); // Get user with ID
app.post("/user", saveUserDetails); // Create new user
app.get("/user/:userID", verifyUserIdentity); // TODO: update user
app.get("/user/:userID", verifyUserIdentity); // TODO: delete user

// Checkin
app.post("/checkin", verifyUserIdentity, saveUserCheckin); // User checkin venue usage
app.get("/checkin/user/:userID"); // TODO: Get checkin records by user ID

// Error handling
const { errorHandler } = require("./server/middleware/error");
app.use(errorHandler);
