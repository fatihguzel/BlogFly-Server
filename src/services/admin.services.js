const CustomError = require("../error/CustomError");
const { Blog } = require("../model/BlogModel");
const { User } = require("../model/UserModel");
const { Comment } = require("../model/CommentModel");

const getAllUsersService = async () => {
  const users = await User.find()
    .select("username + email")
    .select("isBlocked + role");

  return { success: true, data: users };
};

const getUserProfileService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new CustomError(400, "User not found");
  return { success: true, data: user };
};

const userBlockedService = async (id) => {
  const user = await User.findById(id).select("isBlocked + username + email");

  const userBlogs = await Blog.find({ user }).select("isBlocked");

  const userComments = await Comment.find({ user });

  if (!user) throw new CustomError(400, "User not found");
  if (user.isBlocked === true)
    throw new CustomError(
      400,
      `${user.username} isimli kullanıcı zaten bloklanmış`
    );
  user.isBlocked = true;
  if (userBlogs)
    userBlogs.map((blog) => {
      blog.isBlocked = true;
      blog.save();
    });

  if (userComments)
    userComments.map((comment) => {
      comment.isBlocked = true;
      comment.save();
    });

  await user.save();

  return { success: true, data: user };
};

const userUnBlockedService = async (id) => {
  const user = await User.findById(id).select("isBlocked + username + email");

  const userBlogs = await Blog.find({ user }).select("isBlocked");

  const userComments = await Comment.find({ user });

  if (!user) throw new CustomError(400, "User not found");
  if (user.isBlocked === false)
    throw new CustomError(
      400,
      `${user.username} isimli kullanıcının herhangi bir bloku bulunmamakta`
    );
  user.isBlocked = false;
  if (userBlogs)
    userBlogs.map((blog) => {
      blog.isBlocked = false;
      blog.save();
    });

  if (userComments)
    userComments.map((comment) => {
      comment.isBlocked = false;
      comment.save();
    });

  await user.save();

  return { success: true, data: user };
};

const userDeleteService = async (id) => {
  const user = await User.findById(id);
  if (!user)
    throw new CustomError(400, "Silmek istediğiniz kullanıcı bulunamadı");

  const userBlog = await Blog.find({ user });
  const userComment = await Comment.find({ user });

  await user.remove();

  if (userBlog) await userBlog.map((blog) => blog.remove());

  // if (userComment)
  //   await userComment.map((comment) => {
  //     comment.remove();
  //   });

  return { success: true, message: "Hesap başarılı bir şekilde silindi" };
};

module.exports = {
  getAllUsersService,
  getUserProfileService,
  userBlockedService,
  userUnBlockedService,
  userDeleteService,
};
