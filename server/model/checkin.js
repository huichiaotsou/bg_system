const { executeQuery } = require("./conn");

// Store checkin details in the checkin table
const saveCheckin = async (checkinDetails) => {
  try {
    const { userID, venueID } = checkinDetails;

    const query =
      "INSERT INTO checkins ( user_id, venue_id ) " +
      "VALUES ($1, $2) " +
      "RETURNING id";

    const values = [userID, venueID];
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

module.exports = {
  saveCheckin,
};
