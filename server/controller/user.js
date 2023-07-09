const User = require("../model/user");
const Group = require("../model/group");
const jwt = require("jsonwebtoken");

const getRegisteredUser = async (req, res, next) => {
  try {
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
      response.user.id = user.id;
      response.user.phone = user.phone;
      response.user.user_define_name = user.user_define_name;
      response.user.notes = user.notes;
      response.user.is_admin = user.is_admin;
      response.user.group_id = user.group_id;
    }

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

const getUserWithID = async (req, res, next) => {
  try {
    let userID = req.params.userID;
    let dbUser;
    if (userID === "undefined") {
      const token = req.headers.authorization.substring(7); // Remove "Bearer " prefix
      const userDetails = jwt.decode(token);
      [dbUser] = await User.getUserWithEmail(userDetails.email);
    } else {
      [dbUser] = await User.getUserWithID(userID);
    }
    dbUser.registered = true;
    res.send(dbUser);
  } catch (err) {
    next(err);
  }
};

const saveUserDetails = async (req, res, next) => {
  try {
    const groupID = req.body.groupID;
    const userDetails = {
      group_id: groupID,
      given_name_google: req.body.given_name_google,
      family_name_google: req.body.family_name_google,
      user_define_name: req.body.user_define_name,
      phone: req.body.phone,
      profile_picture_link: req.body.profile_picture_link,
      email: req.body.email,
      complete_google_jwt: req.body.complete_google_jwt,
      notes: "",
      is_admin: false,
    };

    const userID = await User.saveUser(userDetails);

    const userGroup = {
      userID,
      groupID,
    };

    await Group.saveGroupMember(userGroup);

    res.status(200).send({ status: "ok" });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRegisteredUser,
  getUserWithID,
  saveUserDetails,
  getAllUsers,
};
