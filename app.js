require("dotenv");
const { config } = require("./config/config");
const Paths = require("./app_paths");

// ----------------------------------------
//               Init App
// ----------------------------------------
const express = require("express");
const app = express();
app.listen(config.port, () => console.log(`Running on port ${config.port}`));

// ----------------------------------------
//         Controller / Middleware
// ----------------------------------------
const {
  getUserWithID,
  getRegisteredUser,
  saveUserDetails,
  getAllUsers,
} = require("./server/controller/user");
const { updateAdmins } = require("./server/controller/admin");
const {
  saveUserCheckin,
  getSixMonthGroupCheckin,
  getCheckinByDay,
  updateValidationStatus,
  updateCheckinVenue,
  updateCheckinFeedback,
} = require("./server/controller/checkin");
const { updateVenueDistribution } = require("./server/controller/venue");
const {
  getExistingGroups,
  saveNewGroup,
  deleteGroup,
} = require("./server/controller/groups");
const { verifyIsUser, verifyIsAdmin } = require("./server/middleware/user");

// ----------------------------------------
//              Body Parse
// ----------------------------------------
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------
//            Static Directories
// ----------------------------------------
app.use(Paths.public); // PUBLIC

app.use(Paths.login); // USER - login
app.use(Paths.register); // USER - user registeration

app.use(Paths.admin); // ADMIN
app.use(Paths.adminManageAdmin); // ADMIN - manage admins
app.use(Paths.adminManageGroups); // ADMIN - manage groups
app.use(Paths.adminManageCheckins); // ADMIN - manage groups
app.use(Paths.adminGroupCheckinRecords); // ADMIN - get all check records by group
app.use(Paths.adminVenueDistribution); // ADMIN - venue distribution

app.use(Paths.dashboard); // DASHBOARD
app.use(Paths.dashboardCheckin); // DASHBOARD - checkin
app.use(Paths.dashboardCheckinRecords); // DASHBOARD - checkin records

// ----------------------------------------
//                  Routes
// ----------------------------------------
// User
app.post("/login", getRegisteredUser); // Login
app.post("/user", saveUserDetails); // Create new user
app.get("/user/:userID", verifyIsUser, getUserWithID); // Get user with ID
app.get("/user", verifyIsUser, getAllUsers); // Get all users
app.patch("/user/:userID", verifyIsUser, verifyIsAdmin); // TODO: update user

// Admin
app.post("/admin", verifyIsUser, verifyIsAdmin, updateAdmins); // Update a list of users as admin
app.patch(
  "/checkin/validation",
  verifyIsUser,
  verifyIsAdmin,
  updateValidationStatus
); // update checkin validation status
app.patch(
  "/checkin/feedback",
  verifyIsUser,
  verifyIsAdmin,
  updateCheckinFeedback
); // update checkin feedback
app.patch("/checkin/venue", verifyIsUser, verifyIsAdmin, updateCheckinVenue); // update checkin venue

// Checkin
app.post("/checkin", verifyIsUser, saveUserCheckin); // User checkin venue usage
app.get("/checkin/group/:groupID", verifyIsUser, getSixMonthGroupCheckin); // Get checkin records by user ID
app.get("/checkin/date/:date", verifyIsUser, getCheckinByDay); // Get checkin records by user ID

// Venue
app.post("/venue", verifyIsUser, verifyIsAdmin, updateVenueDistribution); // Update venue distribution

// Groups
app.get("/groups", getExistingGroups); // Get all groups
app.post("/groups", verifyIsUser, verifyIsAdmin, saveNewGroup); // Create a new group
app.delete("/groups/:groupID", verifyIsUser, verifyIsAdmin, deleteGroup); // Delete a existing group

// Error handling
const { errorHandler } = require("./server/middleware/error");
app.use(errorHandler);
