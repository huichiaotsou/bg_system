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

const getGroupCheckin = async (checkinRequest) => {
  try {
    let query = `SELECT c.validation_status, c.checkin_date, u.user_define_name AS user_name, v.venue_name, c.feedback 
      FROM checkins c 
      JOIN users u ON c.user_id = u.id 
      JOIN venues v ON c.venue_id = v.id 
      WHERE c.checkin_date >= CURRENT_DATE - INTERVAL '1 month' * $1 
        AND c.checkin_date <= CURRENT_DATE 
        AND c.group_id = $2 
        ORDER BY c.checkin_date DESC`;
    const values = [checkinRequest.months, checkinRequest.groupID];

    return await executeQuery(query, values);
  } catch (err) {
    console.error("Error while getting group checkin with group id:", err);
  }
};

const getCheckinByDay = async (date) => {
  try {
    const query =
      "SELECT c.id AS checkin_id, c.validation_status, bg.id as group_id, bg.group_leader, v.id AS venue_id, v.venue_name, c.feedback " +
      "FROM checkins c " +
      "JOIN venues v ON c.venue_id = v.id " +
      "JOIN belong_groups bg ON c.group_id = bg.id " +
      "WHERE c.checkin_date = $1 " +
      "ORDER BY c.checkin_date";

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

const updateCheckinFeedback = async (update) => {
  try {
    const query = "UPDATE checkins SET feedback = $1 WHERE id = $2";

    const values = [update.feedback, update.checkinID];
    return await executeQuery(query, values);
  } catch (err) {
    console.error("Error while updating checkin feedback:", err);
  }
};

module.exports = {
  saveCheckin,
  getGroupCheckin,
  getCheckinByDay,
  updateValidationStatus,
  updateCheckinVenue,
  updateCheckinFeedback,
};
