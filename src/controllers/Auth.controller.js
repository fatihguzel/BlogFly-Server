const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");
const {
  registerService,
  loginService,
  getProfileService,
  resetPasswordService,
  removeAccountService,
  confirmUserService,
  getUserByIdService,
} = require("../services/auth.services");
const { User } = require("../model/UserModel");

class AuthController {
  static register = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const response = await registerService(username, email, password);

    req.session.regenerate(() => {
      req.session.email = response.data.email;
      res.json(response);
    });
  });

  static login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await loginService(email, password);

    req.session.regenerate(() => {
      req.session.email = response.data.email;
      res.json(response);
    });
  });

  static confirmUser = expressAsyncHandler(async (req, res) => {
    const { confirmCode } = req.body;

    const response = await confirmUserService(confirmCode);

    res.json(response);
  });

  static getProfile = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const response = await getProfileService(user);

    res.json(response);
  });

  static getUserById = expressAsyncHandler(async (req, res) => {
    const { userId } = req.params;
    const response = await getUserByIdService(userId);

    res.json(response);
  });

  static logout = expressAsyncHandler(async (req, res) => {
    console.log("req:::", req.session);
    const email = req.session.email;

    const user = await User.findOne({ email: email });

    user.isLogined = false;

    await user.save();

    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });

    res.json({
      success: true,
      message: "Çıkış Yapıldı!",
    });
  });

  static resetPassword = expressAsyncHandler(async (req, res) => {
    const { email, oldPassword, newPassword, againPassword } = req.body;
    const response = await resetPasswordService(
      email,
      oldPassword,
      newPassword,
      againPassword
    );
    res.json(response);
  });

  static removeAccount = expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const response = await removeAccountService(user);

    res.json(response);
  });
}

module.exports = AuthController;
