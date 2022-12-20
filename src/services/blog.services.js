const { User } = require("../model/UserModel");
const CustomError = require("../error/CustomError");

const writeBlogService = async (email, title, text) => {
  const blogger = await User.findOne({ email });

  // Email sistemde mevcut değilse
  if (!blogger) throw new CustomError(400, "User not found");

  if (title === "" || text === "")
    throw new CustomError(400, "Please check your inputs");
  const blogInformation = { title: title, text: text };
  blogger.blogs.push(blogInformation);
  blogger.save();

  return { success: true, data: blogger.blogs };
};

const getBlogService = async (user) => {
  return { success: true, data: user.blogs };
};

module.exports = {
  writeBlogService,
  getBlogService,
};
