const { Comment } = require("../model/CommentModel");
const CustomError = require("../error/CustomError");
const { User } = require("../model/UserModel");
const { Blog } = require("../model/BlogModel");

const writeCommentService = async (blogId, username, text) => {
  const user = await User.findOne({ username });
  const blog = await Blog.findById(blogId);
  if (text === "" || username === "" || blogId === "")
    throw new CustomError(400, "Please check your input");
  if (!user) throw new CustomError(400, "User not found");
  if (!blog) throw new CustomError(400, "Blog not found");

  const comment = await new Comment({
    userCommentData: {
      username: username,
      text: text,
    },
    user: user,
    blog: blog,
  });

  blog.comments.push(comment);

  await comment.save();
  await blog.save();

  return { success: true, data: comment };
};

const getCommentService = async (blogId) => {
  const blog = await Blog.findById(blogId).select("comments");

  if (!blog) throw new CustomError(400, "Blog not found");
  return { success: true, data: blog };
};

module.exports = { writeCommentService, getCommentService };
