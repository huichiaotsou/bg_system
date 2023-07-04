const Checkin = require("../model/checkin");

const saveUserCheckin = async (req, res, next) => {
  try {
    const checkinDetails = {
      userID: req.body.userID,
      venueID: req.body.venueID,
      checkinDate: req.body.checkinDate,
    };

    await Checkin.saveCheckin(checkinDetails);
    res.sendStatus(200);
  } catch (err) {
    if (err.code == 23505) {
      res.status(409).send("record exists");
    }
  }
};

const getUserCheckin = async (req, res, next) => {
  try {
    const checkinRequest = {
      type: req.body.type,
      userID: req.body.id,
    };

    await Checkin.getUserCheckin(checkinRequest);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  saveUserCheckin,
  getUserCheckin,
};
