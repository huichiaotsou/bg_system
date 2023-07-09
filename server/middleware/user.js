// const CLIENT_ID =
//   "367177265116-v2ssukimr0dk8rn4avb4n7iimlmsergl.apps.googleusercontent.com";
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(CLIENT_ID);
const { login } = require("../../app_paths");
const User = require("../model/user");

const verifyIsUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.substring(7); // Remove "Bearer " prefix
    const jwt = require("jsonwebtoken");
    const user = jwt.decode(token);

    const dbUser = await User.getUserWithEmail(user.email);
    if (dbUser.length < 1) {
      res.status(403).send("unauthorized");
    }
    req.body.email = dbUser[0].email;
    req.body.userID = dbUser[0].id;
    next();

    // // Verify the token with Google API
    // await client.verifyIdToken({
    //   idToken: token,
    //   audience: CLIENT_ID,
    // });
  } catch (err) {
    console.log(err);
    res.status(403).send("unauthorized");
  }
};

const verifyIsAdmin = async (req, res, next) => {
  // const token = req.headers.authorization.substring(7); // Remove "Bearer " prefix
  // const jwt = require("jsonwebtoken");
  // const user = jwt.decode(token);
  // const dbUser = User.getUserWithID(user.id);
  // if (!dbUser.is_admin) {
  //   res.send(403);
  //   return;
  // }
  // req.body.setterUserID = user.id;
  next();
};

module.exports = {
  verifyIsUser,
  verifyIsAdmin,
};
