const { executeQuery } = require("./conn");

// Store checkin details in the checkin table
const saveCheckin = async (checkinDetails) => {
  try {
    const { userID, venueID, groupID, checkinDate } = checkinDetails;

    const query =
      "INSERT INTO checkins ( user_id, venue_id, group_id, checkin_date) " +
      "VALUES ($1, $2, $3, $4) " +
      "RETURNING id";

    const values = [userID, venueID, groupID, checkinDate];
    const [result] = await executeQuery(query, values);
    const insertedUserId = result.id;

    if (insertedUserId) {
      console.log("Checkin details inserted with ID:", insertedUserId);
      return insertedUserId;
    } else {
      throw new Error("Failed to insert user details");
    }
  } catch (err) {
    console.error("Error storing checkin:", err);
    throw err;
  }
};

const getUserCheckin = async (checkinRequest) => {
  try {
    const query = "SELECT * FROM checkins WHERE user_id = $1 ";

    if (checkinRequest.type == "today") {
      query += "AND checkin_date = current_date";
    }

    const values = [checkinRequest.userID];
    return await executeQuery(query, values);
  } catch (err) {
    console.error("Error while getting user checkin with user id:", err);
  }
};

const getCheckinByDay = async (date) => {
  try {
    const query =
      "SELECT c.id AS checkin_id, c.validation_status, bg.id as group_id, bg.group_leader, v.id AS venue_id, v.venue_name, c.feedback " +
      "FROM checkins c " +
      "JOIN venues v ON c.venue_id = v.id " +
      "JOIN belong_groups bg ON c.group_id = bg.id " +
      "WHERE c.checkin_date = $1 ";

    const values = [date];
    return await executeQuery(query, values);
  } catch (err) {
    console.error("Error while getting checkin by day:", err);
  }
};

const updateValidationStatus = async (update) => {
  try {
    const query = "UPDATE checkins SET validation_status = $1 WHERE id = $2";

    const values = [update.validationStatus, update.checkinID];
    return await executeQuery(query, values);
  } catch (err) {
    console.error("Error while updating checkin validation status:", err);
  }
};

const updateCheckinVenue = async (update) => {
  try {
    const query = "UPDATE checkins SET venue_id = $1 WHERE id = $2";

    const values = [update.venueID, update.checkinID];
    return await executeQuery(query, values);
  } catch (err) {
    console.error("Error while updating checkin validation status:", err);
  }
};

module.exports = {
  saveCheckin,
  getUserCheckin,
  getCheckinByDay,
  updateValidationStatus,
  updateCheckinVenue,
};
