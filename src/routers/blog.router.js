const express = require("express");
const BlogController = require("../controllers/Blog.controllers");
const authMiddleware = require("../middlewares/authMiddleware");
const blogRouter = express.Router();

blogRouter.route("/writeblog").post(BlogController.writeBlog);
blogRouter.route("/removeUserBlog/:id").delete(BlogController.removeUserBlog);
blogRouter.route("/getUserBlogs").post(BlogController.getUserBlog);
blogRouter.route("/getAllBlogs").get(BlogController.getAllBlogs);
blogRouter.route("/getSingleBlog").post(BlogController.getSingleBlog);
blogRouter.route("/like").all(authMiddleware).post(BlogController.likeBlog);
blogRouter.route("/undoLike").all(authMiddleware).post(BlogController.undoLike);

module.exports.blogRouter = blogRouter;
