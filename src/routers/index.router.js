const express = require("express");
const ErrorHandler = require("../error/ErrorHandler");
const { adminRouter } = require("./admin.router");
const { authRouter } = require("./auth.router");
const { blogRouter } = require("./blog.router");
const { commentRouter } = require("./comment.router");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/blog", blogRouter);
indexRouter.use("/comment", commentRouter);
indexRouter.use("/admin", adminRouter);
indexRouter.use(ErrorHandler);

module.exports.indexRouter = indexRouter;
