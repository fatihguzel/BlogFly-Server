const { User } = require("../model/UserModel");
const CustomError = require("../error/CustomError");
const { Blog } = require("../model/BlogModel");
const { ObjectId } = require("mongodb");

const writeBlogService = async (username, title, text) => {
  const blogger = await User.findOne({ username }).select("-email");
  // Email sistemde mevcut değilse
  if (!blogger) throw new CustomError(400, "User not found");
  console.log(blogger.username);
  if (title === "" || text === "")
    throw new CustomError(400, "Please check your inputs");

  const userName = blogger.username;
  const blogInformation = {
    user: blogger,
    title: title,
    text: text,
    username: userName,
  };

  const blog = await new Blog({
    ...blogInformation,
  });

  blog.save();

  return { success: true, data: blog };
};

const getUserBlogService = async (email) => {
  const userInformation = await User.findOne({ email });

  if (!userInformation) throw new CustomError(400, "User is not found");

  const getUserBlogs = await Blog.find({ user: userInformation });

  return { success: true, data: getUserBlogs };
};

const getAllBlogs = async () => {
  const allBlogs = await Blog.find();

  if (!allBlogs) throw new CustomError(400, "Blog listesi boş");

  return { success: true, data: allBlogs };
};

const getSingleBlog = async (id) => {
  const singleBlog = await Blog.findById(id);

  if (!singleBlog) throw new CustomError(400, "Aranılan blog bulunamadı");
  console.log(singleBlog);

  return { success: true, data: singleBlog };
};
module.exports = {
  writeBlogService,
  getUserBlogService,
  getAllBlogs,
  getSingleBlog,
};
