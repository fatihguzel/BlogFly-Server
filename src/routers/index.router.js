const express = require("express");
const ErrorHandler = require("../error/ErrorHandler");
const { adminRouter } = require("./admin.router");
const { authRouter } = require("./auth.router");
const { blogRouter } = require("./blog.router");
const { commentRouter } = require("./comment.router");
const { relationShipsRouter } = require("./relationships.router");
const { contactRouter } = require("./contact.router");
const { chatRouter } = require("./chat.router");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/blog", blogRouter);
indexRouter.use("/comment", commentRouter);
indexRouter.use("/admin", adminRouter);
indexRouter.use("/relationships", relationShipsRouter);
indexRouter.use("/contact", contactRouter);
indexRouter.use("/chat", chatRouter);
indexRouter.use(ErrorHandler);

module.exports.indexRouter = indexRouter;
