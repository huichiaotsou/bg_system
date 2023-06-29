const jwt = require("jsonwebtoken");
const DB = require("../model/db_methods");

const checkUserRegister = async (req, res, next) => {
  const payload = jwt.decode(req.body.credential);
  console.log(payload.email);

  // TODO: use payload.email to verify if user exists
  const user = await DB.User.getUser(payload.email);
  if (user.email) {
    // TODO: check what's the syntax for next()
  } else {
    // TODO: Send user to register page with neccessary user details(for later store to users table)
  }
};

module.exports = {
  checkUserRegister,
};
