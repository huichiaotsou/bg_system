const jwt = require("jsonwebtoken");
const DB = require("../model/db_methods");

const checkUserRegister = async (req, res, next) => {
  const payload = jwt.decode(req.body.credential);

  // TODO: use payload.email to verify if user exists
  const user = await DB.User.getUser(payload.email);
  console.log("user: ", user);

  if (user.length === 1) {
    // TODO: next()
  } else {
    // TODO: Send user to register page with neccessary user details(for later store to users table)
  }
};

module.exports = {
  checkUserRegister,
};
