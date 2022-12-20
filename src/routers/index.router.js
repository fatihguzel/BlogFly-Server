const express = require("express");
const ErrorHandler = require("../error/ErrorHandler");
const { authRouter } = require("./auth.router");
const blogRouter = require("./blog.router");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/blog", blogRouter);
indexRouter.use(ErrorHandler);

module.exports.indexRouter = indexRouter;
