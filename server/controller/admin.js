const Admin = require("../model/admin");

const updateAdmins = async (req, res, next) => {
  try {
    await Admin.clearAdmins();
    await Admin.updateAdmins(req.body.userIDs);
    res.status(200).send({ success: "ok" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  // getAllAdmins,
  updateAdmins,
};
