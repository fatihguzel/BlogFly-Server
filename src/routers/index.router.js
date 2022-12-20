const express = require("express");
const ErrorHandler = require("../error/ErrorHandler");
const { authRouter } = require("./auth.router");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);

indexRouter.use(ErrorHandler);
module.exports.indexRouter = indexRouter;
