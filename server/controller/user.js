const User = require("../model/user");
const jwt = require("jsonwebtoken");

const getRegisteredUser = async (req, res, next) => {
  const payload = jwt.decode(req.body.credential);
  const user = await User.getUser(payload.email);

  const response = {
    user: {
      email: payload.email,
      given_name: payload.given_name,
      family_name: payload.family_name,
      picture: payload.picture,
      complete_google_jwt: req.body.credential,
      g_csrf_token: req.body.g_csrf_token,
    },
  };

  if (user.length === 0) {
    // User not registered
    response.registered = false;
    res.status(200).send(response);
  } else {
    response.registered = true;
    res.status(200).send(response);
  }
};

const saveUserDetails = async (req, res, next) => {
  // TODO: save user details
};

module.exports = {
  getRegisteredUser,
  saveUserDetails,
};
