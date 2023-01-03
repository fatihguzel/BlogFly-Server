const express = require("express");
const CommentController = require("../controllers/Comment.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const commentRouter = express.Router();

commentRouter
  .route("/writeComment")
  .all(authMiddleware)
  .post(CommentController.writeComment);
commentRouter.route("/getComment").post(CommentController.getCommentByBlogId);
module.exports.commentRouter = commentRouter;
