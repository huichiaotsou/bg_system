const Admin = require("../model/admin");

// const getAllAdmins = async (req, res, next) => {
//   const admins = await Admin.getAllAdmins();
//   console.log("admins:", admins);
//   res.send(admins);
// };

const updateAdmin = async (req, res, next) => {
  const result = await Admin.updateAdmin(req.body.userID);

  console.log("updateAdmin result:", result);
  res.status(200).send(result);
};

module.exports = {
  // getAllAdmins,
  updateAdmin,
};
