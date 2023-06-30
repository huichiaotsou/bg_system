// const jwt = require("jsonwebtoken");
// const User = require("../model/user");

// const checkUserRegister = async (req, res, next) => {
//   const payload = jwt.decode(req.body.credential);

//   // Use payload.email to verify if user exists
//   const user = await User.getUser(payload.email);
//   console.log("user: ", user);

//   if (user.length === 1) {
//     // TODO: next()
//   } else {
//     // TODO: Send user to register page with neccessary user details(for later store to users table)
//   }
// };

// module.exports = {
//   checkUserRegister,
// };
