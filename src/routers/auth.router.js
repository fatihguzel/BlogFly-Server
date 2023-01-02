const express = require("express");
const AuthController = require("../controllers/Auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const authRouter = express.Router();

authRouter.route("/register").post(AuthController.register);
authRouter.route("/login").post(AuthController.login);
authRouter.route("/logout").get(AuthController.logout);
authRouter.route("/profile").all(authMiddleware).get(AuthController.getProfile);
authRouter.route("/resetPassword").put(AuthController.resetPassword);

module.exports.authRouter = authRouter;
