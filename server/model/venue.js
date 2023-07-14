const { executeQuery } = require("./conn");

// Store venue distribution, on conflict update the
const upsertVenueDistribution = async (groupName) => {
  try {
    const query =
      "INSERT INTO venue_distribution (group_id, venue_id, scheduled_day, scheduled_time, set_by) " +
      "VALUES ($1, $2, $3, $4, $5) " +
      "RETURNING id";

    const values = [groupName];

    const [result] = await executeQuery(query, values);
    const insertedUserId = result.id;

    if (insertedUserId) {
      console.log("Group inserted with group ID:", insertedUserId);
      return insertedUserId;
    } else {
      throw new Error("Failed to insert group");
    }
  } catch (err) {
    console.error("Error storing group:", err);
    throw err;
  }
};

module.exports = { upsertVenueDistribution };
