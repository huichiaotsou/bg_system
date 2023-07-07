const { executeQuery } = require("./conn");

// const getAllAdmins = async () => {
//   try {
//     const query = "SELECT * FROM users WHERE is_admin = true";
//     const values = [];
//     return await executeQuery(query, values);
//   } catch (err) {
//     console.error("Error while getting admins:", err);
//   }
// };

const updateAdmin = async (userID) => {
  try {
    const query = "UPDAET users SET is_admin = true WHERE id = $1";
    const values = [userID];
    return await executeQuery(query, values);
  } catch (err) {
    console.error("Error while updating admins:", err);
  }
};

module.exports = {
  // getAllAdmins,
  updateAdmin,
};
