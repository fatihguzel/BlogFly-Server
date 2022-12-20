const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");
const { User } = require("../model/UserModel");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  if (!req.session.email) {
    throw new CustomError(401, "YOUR_NOT_LOGINNED");
  }
  const user = await User.findOne({ email: req.session.email });
  req.user = user;
  next();
});

module.exports = authMiddleware;
