const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv");
const bodyParser = require("body-parser");

const { SERVER_PORT } = process.env;
// const { checkUserRegister } = require("./server/middleware/user");
const {
  getUserWithID,
  getRegisteredUser,
  saveUserDetails,
} = require("./server/controller/user");
const app = express();

// Set the public folder as the static directory
app.use(express.static(path.join(__dirname, "public", "checkin")));
app.use(express.static(path.join(__dirname, "public", "dashboard")));
app.use(express.static(path.join(__dirname, "public", "login")));
app.use(express.static(path.join(__dirname, "public", "register")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

// == Login ==
app.post("/login", getRegisteredUser);

// == User-related modifications: Get, Create, Update, Delete users ==
// Get user
app.get("/user/:userID", getUserWithID);
// Create user
app.post("/user", saveUserDetails);
// TODO: update user, delete user

// == Error handling ==
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  // Set an appropriate status code based on the error
  const statusCode = err.statusCode || 500;

  // Send an error response to the client
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};

// Register the error-handling middleware
app.use(errorHandler);
