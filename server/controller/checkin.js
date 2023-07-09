const Checkin = require("../model/checkin");

const saveUserCheckin = async (req, res, next) => {
  try {
    const checkinDetails = {
      userID: req.body.userID,
      venueID: req.body.venueID,
      groupID: req.body.groupID,
      checkinDate: req.body.checkinDate,
    };

    await Checkin.saveCheckin(checkinDetails);
    res.status(200).send({ status: "ok" });
  } catch (err) {
    if (err.detail.includes("already exists.")) {
      res.status(409).send("record exists");
    }
  }
};

const getSixMonthGroupCheckin = async (req, res, next) => {
  try {
    const request = {
      groupID: req.params.groupID,
      months: 6,
    };

    const checkins = await Checkin.getGroupCheckin(request);
    res.status(200).send(checkins);
  } catch (err) {
    next(err);
  }
};

const getCheckinByDay = async (req, res, next) => {
  try {
    const selectedDate = req.params.date;
    const checkins = await Checkin.getCheckinByDay(selectedDate);
    res.send(checkins);
  } catch (err) {
    next(err);
  }
};

const updateValidationStatus = async (req, res, next) => {
  try {
    await Checkin.updateValidationStatus(req.body.update);
    res.status(200).send({ status: "ok" });
  } catch (err) {
    next(err);
  }
};

const updateCheckinVenue = async (req, res, next) => {
  try {
    await Checkin.updateCheckinVenue(req.body.update);
    res.status(200).send({ status: "ok" });
  } catch (err) {
    next(err);
  }
};

const updateCheckinFeedback = async (req, res, next) => {
  try {
    await Checkin.updateCheckinFeedback(req.body.update);
    res.status(200).send({ status: "ok" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  saveUserCheckin,
  getSixMonthGroupCheckin,
  getCheckinByDay,
  updateValidationStatus,
  updateCheckinVenue,
  updateCheckinFeedback,
};
