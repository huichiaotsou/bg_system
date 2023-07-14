const { executeQuery } = require("./conn");

const updateAdmins = async (userIDs) => {
  try {
    const query = "UPDATE users SET is_admin = true WHERE id = ANY($1::int[])";
    const values = [userIDs];
    return await executeQuery(query, values);
  } catch (err) {
    console.error("Error while batch updating admins:", err);
  }
};

const clearAdmins = async () => {
  try {
    const query = "UPDATE users SET is_admin = false";
    const values = [];
    return await executeQuery(query, values);
  } catch (err) {
    console.error("Error while clearing admins:", err);
  }
};

module.exports = {
  // getAllAdmins,
  updateAdmins,
  clearAdmins,
};
