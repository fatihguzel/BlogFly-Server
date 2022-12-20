const express = require("express");
const BlogController = require("../controllers/Blog.controllers");
const authMiddleware = require("../middlewares/authMiddleware");
const blogRouter = express.Router();

blogRouter.route("/writeblog").post(BlogController.writeBlog);
blogRouter.route("/getBlogs").all(authMiddleware).get(BlogController.getBlog);

module.exports = blogRouter;
