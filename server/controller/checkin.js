const Checkin = require("../model/checkin");

const saveUserCheckin = async (req, res, next) => {
  let result;
  try {
    const checkinDetails = {
      userID: req.body.userID,
      venueID: req.body.venueID,
      checkinDate: req.body.checkinDate,
    };

    result = await Checkin.saveCheckin(checkinDetails);

    res.sendStatus(200);
  } catch (err) {
    if (err.code == 23505) {
      res.status(409).send("record exists");
    }
  }
};

module.exports = {
  saveUserCheckin,
};
