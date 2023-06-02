const CustomError = require("../error/CustomError");
const { User } = require("../model/UserModel");
const { sendContactMailer } = require("../utils/sendMailer");

const sendContactMailService = async (userName, userEmail, content) => {
  const user = await User.findOne({ userEmail });
  if (content === "" || userName === "" || userEmail === "")
    throw new CustomError(400, "Please check your input");
  if (!user) throw new CustomError(400, "User not found");

  sendContactMailer({ content, userName, userEmail });
  return { success: true, data: content };
};

module.exports = { sendContactMailService };
