const { executeQuery } = require("./conn");

const getUser = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    return await executeQuery(query, values);
  } catch (err) {
    console.error("Error while getting user:", err);
  }
};

module.exports = {
  getUser,
};
