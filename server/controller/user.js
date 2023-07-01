const User = require("../model/user");
const jwt = require("jsonwebtoken");

const getRegisteredUser = async (req, res, next) => {
  const payload = jwt.decode(req.body.credential);
  const [user] = await User.getUser(payload.email);
  const response = {
    user: {
      email: payload.email,
      user_define_name: user.user_define_name,
      given_name: payload.given_name,
      family_name: payload.family_name,
      picture: payload.picture,
      complete_google_jwt: req.body.credential,
      notes: user.notes,
      is_admin: user.is_admin,
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
  try {
    const userDetails = {
      given_name_google: req.body.givenNameGoogle,
      family_name_google: req.body.familyNameGoogle,
      user_define_name: req.body.userDefineName,
      phone: req.body.phone,
      profile_picture_link: req.body.profilePictureLink,
      email: req.body.email,
      complete_google_jwt: req.body.completeGoogleJWT,
      notes: "",
      is_admin: false,
    };

    const saveUser = await User.saveUser(userDetails);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRegisteredUser,
  saveUserDetails,
};
