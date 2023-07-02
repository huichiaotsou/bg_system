// const jwt = require("jsonwebtoken");
// const User = require("../model/user");

// const checkUserRegister = async (req, res, next) => {
//   const payload = jwt.decode(req.body.credential);

//   // Use payload.email to verify if user exists
//   const user = await User.getUser(payload.email);
//   console.log("user: ", user);

//   if (user.length === 1) {
//     next();
//   } else {
//     //  Send user to register page
//     res.redirect("/register");
//   }
// };

// module.exports = {
//   checkUserRegister,
// };
