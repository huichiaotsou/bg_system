const Group = require("../model/group");
const updateVenueDistribution = async (req, res, next) => {
  try {
    const { groupName, scheduled_day, scheduled_time, venueID, setterUserID } =
      req.body;
    // Store the group first
    const groupID = await Group.createGroup(groupName);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateVenueDistribution,
};
