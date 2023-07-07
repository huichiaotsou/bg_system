const Group = require("../model/group");
const getExistingGroups = async (req, res, next) => {
  try {
    const groups = await Group.getExistingGroups();
    res.status(200).send(groups);
  } catch (err) {
    next(err);
  }
};

const saveNewGroup = async (req, res, next) => {
  try {
    const groupLeader = req.body.groupLeaderName;
    const groupID = await Group.createGroup(groupLeader);
    const group = {
      id: groupID,
      group_leader: groupLeader,
    };

    res.status(200).send(group);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getExistingGroups,
  saveNewGroup,
};
