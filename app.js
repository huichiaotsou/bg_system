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
const { verifyIsUser, verifyIsAdmin } = require("./server/middleware/user");

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
app.post("/user", saveUserDetails); // Create new user
app.get("/user/:userID", verifyIsUser, getUserWithID); // Get user with ID
app.get("/user", verifyIsUser, verifyIsAdmin, getAllUsers); // Get all users
app.patch("/user/:userID", verifyIsUser, verifyIsAdmin); // TODO: update user

// Admin
app.post("/admin", verifyIsUser, verifyIsAdmin, updateAdmins); // Update a list of users as admin

// Checkin
app.post("/checkin", verifyIsUser, saveUserCheckin); // User checkin venue usage
app.get("/checkin/user/:userID", verifyIsUser, getUserCheckin); // Get checkin records by user ID

// Venue
app.post("/venue", verifyIsUser, verifyIsAdmin, updateVenueDistribution); // Update venue distribution

// Groups
app.get("/groups", verifyIsUser, verifyIsAdmin, getExistingGroups); // Get all groups
app.post("/groups", verifyIsUser, verifyIsAdmin, saveNewGroup); // Create a new group
app.delete("/groups/:groupID", verifyIsUser, verifyIsAdmin, deleteGroup); // Delete a existing group

// Error handling
const { errorHandler } = require("./server/middleware/error");
app.use(errorHandler);
