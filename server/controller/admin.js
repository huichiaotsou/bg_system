const Admin = require("../model/admin");

// const getAllAdmins = async (req, res, next) => {
//   const admins = await Admin.getAllAdmins();
//   console.log("admins:", admins);
//   res.send(admins);
// };

const updateAdmins = async (req, res, next) => {
  await Admin.clearAdmins();
  await Admin.updateAdmins(req.body.userIDs);
  res.status(200).send({ success: "ok" });
};

module.exports = {
  // getAllAdmins,
  updateAdmins,
};
