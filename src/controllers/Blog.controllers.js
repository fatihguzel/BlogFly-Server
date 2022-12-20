const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");
const {
  writeBlogService,
  getBlogService,
} = require("../services/blog.services");

class BlogController {
  static writeBlog = expressAsyncHandler(async (req, res) => {
    const { email, title, text } = req.body;
    const response = await writeBlogService(email, title, text);

    res.json(response);
  });

  static getBlog = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const response = await getBlogService(user);

    res.json(response);
  });
}

module.exports = BlogController;
