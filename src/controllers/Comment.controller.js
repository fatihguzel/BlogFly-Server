const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");
const {
  writeCommentService,
  getCommentService,
} = require("../services/comment.services");

class CommentController {
  static writeComment = expressAsyncHandler(async (req, res) => {
    const { blogId, username, text } = req.body;

    const response = await writeCommentService(blogId, username, text);

    res.json(response);
  });

  static getCommentByBlogId = expressAsyncHandler(async (req, res) => {
    const { blogId } = req.body;

    const response = await getCommentService(blogId);

    res.json(response);
  });
}

module.exports = CommentController;
