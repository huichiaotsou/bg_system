require("dotenv");
const express = require("express");
const path = require("path");
const { SERVER_PORT } = process.env;

// Import controllers
const {
  getUserWithID,
  getRegisteredUser,
  saveUserDetails,
  getAllUsers,
} = require("./server/controller/user");
const { updateAdmins } = require("./server/controller/admin");
const {
  saveUserCheckin,
  getUserCheckin,
} = require("./server/controller/checkin");
const { updateVenueDistribution } = require("./server/controller/venue");
const {
  getExistingGroups,
  saveNewGroup,
  deleteGroup,
} = require("./server/controller/groups");

// Import middlewares
const {
  verifyUserIdentity,
  verifyIsAdmin,
} = require("./server/middleware/user");

// Init app
const app = express();
app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`));

// Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static directories
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "admin")));
app.use(
  express.static(path.join(__dirname, "public", "admin", "manage_admin"))
);
app.use(
  express.static(path.join(__dirname, "public", "admin", "manage_groups"))
);
app.use(
  express.static(path.join(__dirname, "public", "admin", "venue_distribution"))
);
app.use(express.static(path.join(__dirname, "public", "checkin")));
app.use(express.static(path.join(__dirname, "public", "dashboard")));
app.use(express.static(path.join(__dirname, "public", "login")));
app.use(express.static(path.join(__dirname, "public", "register")));

// User
app.post("/login", getRegisteredUser); // Login
app.get("/user/:userID", verifyUserIdentity, getUserWithID); // Get user with ID
app.get("/user", verifyUserIdentity, getAllUsers); // Get all users
app.post("/user", saveUserDetails); // Create new user
app.get("/user/:userID", verifyUserIdentity); // TODO: update user
app.get("/user/:userID", verifyUserIdentity); // TODO: delete user

// Admin
// app.get("/admin", verifyUserIdentity, verifyIsAdmin, getAllAdmins); // Get user with ID
app.post("/admin", verifyIsAdmin, updateAdmins); // Get user with ID

// Checkin
app.post("/checkin", verifyUserIdentity, saveUserCheckin); // User checkin venue usage
app.get("/checkin/user/:userID", verifyUserIdentity, getUserCheckin); // Get checkin records by user ID

// Venue
app.post("/venue", verifyIsAdmin, updateVenueDistribution);

// Groups
app.get("/groups", verifyIsAdmin, getExistingGroups);
app.post("/groups", verifyIsAdmin, saveNewGroup);
app.delete("/groups/:groupID", verifyIsAdmin, deleteGroup);

// Error handling
const { errorHandler } = require("./server/middleware/error");
app.use(errorHandler);
