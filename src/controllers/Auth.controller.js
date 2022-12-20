const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");
const {
  registerService,
  loginService,
  getProfileService,
} = require("../services/auth.services");

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

  static getProfile = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const response = await getProfileService(user);

    res.json(response);
  });

  static logout = expressAsyncHandler(async (req, res) => {
    req.session.regenerate((err) => {
      if (err) throw new CustomError(400, err.message);

      req.session.email = null;

      req.session.save((err) => {
        if (err) throw new CustomError(400, err.message);
        res.json({ success: true });
      });
    });
  });
}

module.exports = AuthController;
