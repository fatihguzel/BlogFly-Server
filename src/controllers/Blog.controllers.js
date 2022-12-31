const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");
const {
  writeBlogService,
  getAllBlogs,
  getUserBlogService,
  getSingleBlog,
} = require("../services/blog.services");

class BlogController {
  static writeBlog = expressAsyncHandler(async (req, res) => {
    const { username, title, text } = req.body;
    const response = await writeBlogService(username, title, text);

    res.json(response);
  });

  static getUserBlog = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const response = await getUserBlogService(email);

    res.json(response);
  });

  static getAllBlogs = expressAsyncHandler(async (req, res) => {
    const response = await getAllBlogs();

    res.json(response);
  });

  static getSingleBlog = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;

    const response = await getSingleBlog(id);

    res.json(response);
  });
}

module.exports = BlogController;
