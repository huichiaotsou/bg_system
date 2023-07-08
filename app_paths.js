const path = require("path");
const express = require("express");

const login = express.static(path.join(__dirname, "public", "login"));
const register = express.static(path.join(__dirname, "public", "register"));
const public = express.static(path.join(__dirname, "public"));
const admin = express.static(path.join(__dirname, "public", "admin"));
const adminManageAdmin = express.static(
  path.join(__dirname, "public", "admin", "manage_admin")
);
const adminManageGroups = express.static(
  path.join(__dirname, "public", "admin", "manage_groups")
);
const adminVenueDistribution = express.static(
  path.join(__dirname, "public", "admin", "venue_distribution")
);
const dashboard = express.static(path.join(__dirname, "public", "dashboard"));
const dashboardCheckin = express.static(
  path.join(__dirname, "public", "dashboard", "checkin")
);
const dashboardCheckinRecords = express.static(
  path.join(__dirname, "public", "dashboard", "checkin-records")
);

module.exports = {
  login,
  register,
  public,
  admin,
  adminManageAdmin,
  adminManageGroups,
  adminVenueDistribution,
  dashboard,
  dashboardCheckin,
  dashboardCheckinRecords,
};
