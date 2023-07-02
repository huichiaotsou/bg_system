const User = require("../model/user");
const jwt = require("jsonwebtoken");

const getRegisteredUser = async (req, res, next) => {
  const payload = jwt.decode(req.body.credential);
  const response = {
    user: {
      email: payload.email,
      given_name: payload.given_name,
      family_name: payload.family_name,
      picture: payload.picture,
      complete_google_jwt: req.body.credential,
    },
  };

  const [user] = await User.getUserWithEmail(payload.email);
  if (!user) {
    // User is not registered
    response.user.registered = false;
  } else {
    // User is registered
    response.user.registered = true;
    response.user.user_define_name = user.user_define_name;
    response.user.notes = user.notes;
    response.user.is_admin = user.is_admin;
  }

  res.status(200).send(response);
};

const getUserWithID = async (req, res, next) => {
  const [user] = await User.getUserWithID(req.params.userID);
  res.send(user);
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

    await User.saveUser(userDetails);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRegisteredUser,
  getUserWithID,
  saveUserDetails,
};
