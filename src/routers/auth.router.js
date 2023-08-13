const express = require("express");
const AuthController = require("../controllers/Auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const authRouter = express.Router();

authRouter.route("/register").post(AuthController.register);
authRouter.route("/login").post(AuthController.login);
authRouter.route("/confirm").post(AuthController.confirmUser);
authRouter.route("/logout").get(AuthController.logout);
authRouter.route("/profile").all(authMiddleware).get(AuthController.getProfile);
authRouter.route("/getUserById/:userId").get(AuthController.getUserById);
authRouter
  .route("/resetPassword")
  .all(authMiddleware)
  .put(AuthController.resetPassword);
authRouter
  .route("/removeAccount")
  .all(authMiddleware)
  .delete(AuthController.removeAccount);

module.exports.authRouter = authRouter;
