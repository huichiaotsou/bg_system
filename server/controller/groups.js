const Group = require("../model/group");
const getExistingGroups = async (req, res, next) => {
  try {
    const groups = await Group.getExistingGroups();
    res.status(200).send(groups);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getExistingGroups,
};
