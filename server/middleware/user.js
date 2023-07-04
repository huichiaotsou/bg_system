const CLIENT_ID =
  "367177265116-v2ssukimr0dk8rn4avb4n7iimlmsergl.apps.googleusercontent.com";

const User = require("../model/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

const verifyUserIdentity = async (req, res, next) => {
  // const token = req.headers.authorization.substring(7); // Remove "Bearer " prefix
  // try {
  //   // Verify the token with Google API
  //   await client.verifyIdToken({
  //     idToken: token,
  //     audience: CLIENT_ID,
  //   });
  //   next();
  // } catch (err) {
  //   console.log(err);
  //   res.status(403).send("unauthorized");
  // }
  next();
};

module.exports = {
  verifyUserIdentity,
};
