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

// Store user details in the users table
const saveUser = async (userDetails) => {
  try {
    const {
      given_name_google,
      family_name_google,
      user_define_name,
      phone,
      profile_picture_link,
      email,
      complete_google_jwt,
      notes,
      is_admin,
    } = userDetails;

    const query =
      "INSERT INTO users (given_name_google, family_name_google, user_define_name, phone, profile_picture_link, email, complete_google_jwt, notes, is_admin) " +
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) " +
      "RETURNING id";

    const values = [
      given_name_google,
      family_name_google,
      user_define_name,
      phone,
      profile_picture_link,
      email,
      complete_google_jwt,
      notes,
      is_admin,
    ];

    const [result] = await executeQuery(query, values);
    const insertedUserId = result.id;

    if (insertedUserId) {
      console.log("User details inserted with ID:", insertedUserId);
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
  getUser,
  saveUser,
};