const { executeQuery } = require("./conn");

// Store checkin details in the checkin table
const saveCheckin = async (checkinDetails) => {
  try {
    const { userID, venueID, checkinDate } = checkinDetails;

    const query =
      "INSERT INTO checkins ( user_id, venue_id, checkin_date ) " +
      "VALUES ($1, $2, $3) " +
      "RETURNING id";

    const values = [userID, venueID, checkinDate];
    const [result] = await executeQuery(query, values);
    const insertedUserId = result.id;

    if (insertedUserId) {
      console.log("Checkin details inserted with ID:", insertedUserId);
      return insertedUserId;
    } else {
      throw new Error("Failed to insert user details");
    }
  } catch (err) {
    console.error("Error storing user details:", err);
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

module.exports = {
  saveCheckin,
  getUserCheckin,
};
