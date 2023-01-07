const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");
const { User } = require("../model/UserModel");

const adminMiddleware = expressAsyncHandler(async (req, res, next) => {
  const userEmail = req.session.email;
  console.log(req.session.email);
  const isAdmin = await User.findOne({ userEmail });
  console.log(isAdmin);
  if (isAdmin.role !== "admin") {
    throw new CustomError(403, "Giriş Yetkiniz Bulunmamaktadır!");
  }

  next();
});

module.exports = adminMiddleware;
