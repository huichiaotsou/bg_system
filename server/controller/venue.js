const Group = require("../model/group");
const updateVenueDistribution = async (req, res, next) => {
  const { groupName, scheduled_day, scheduled_time, venueID, setterUserID } =
    req.body;
  // Store the group first
  const groupID = await Group.createGroup(groupName);
};

module.exports = {
  updateVenueDistribution,
};
