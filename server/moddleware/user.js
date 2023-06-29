const jwt = require("jsonwebtoken");
const DB = require("../model/db_methods");

const checkUserExist = async (req, res, next) => {
  const payload = jwt.decode(req.body.credential);
  console.log(payload.email);

  // TODO: use payload.email to verify if user exists
  const user = await DB.User.getUser(payload.email);
  if (user.email) {
    // TODO: check what's the syntax for next()
  } else {
    // TODO: throw error
  }
};

module.exports = {
  checkUserExist,
};
