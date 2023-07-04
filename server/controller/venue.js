const Venue = require("../model/venue");

const saveCheckinVenue = async (req, res, next) => {
  try {
    const checkinDetails = {
      userID: req.body.userID,
      checkinTime: req.body.checkinTime,
      venueID: req.body.venueID,
    };

    console.log("checkin Details: ", checkinDetails);

    await Venue.saveCheckinVenue(checkinDetails);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  saveCheckinVenue,
};
