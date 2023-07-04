const Checkin = require("../model/checkin");

const saveUserCheckin = async (req, res, next) => {
  try {
    const checkinDetails = {
      userID: req.body.userID,
      venueID: req.body.venueID,
    };

    await Checkin.saveCheckin(checkinDetails);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  saveUserCheckin,
};
