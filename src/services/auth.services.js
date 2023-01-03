const { User } = require("../model/UserModel");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const CustomError = require("../error/CustomError");
const { emailValidator, passwordValidator } = require("../utils/validators");

const registerService = async (username, email, password) => {
  if (!emailValidator(email)) {
    throw new CustomError(400, "YOUR EMAIL FORMAT IS INCORRECT");
  }

  if (!passwordValidator(password)) {
    throw new CustomError(400, "YOUR PASWORD FORMAT IS INCORRECT");
  }
  const checkUser = await User.findOne({ username });
  if (checkUser) throw new CustomError(400, "Username is already exists");

  const user = await new User({
    username: username,
    email: email,
    password: hashPassword(password),
  });

  await user.save();

  return { success: true, data: user };
};

const loginService = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError(404, "Email is not registered to the system");
  }

  if (await comparePassword(password, user.password)) {
    return { success: true, data: user };
  } else {
    throw new CustomError(400, "Wrong Password");
  }
};

const getProfileService = async (user) => {
  return { success: true, data: user };
};

const resetPasswordService = async (
  email,
  oldPassword,
  newPassword,
  againPassword
) => {
  const user = await User.findOne({ email }).select("+password");
  if (!(await comparePassword(oldPassword, user.password)))
    throw new CustomError(400, "Girmiş olduğunuz şuanki şifreniz yanlış");

  if (newPassword !== againPassword)
    throw new CustomError(400, "Lütfen şifre ve şifre tekrarını doğru giriniz");

  if (!passwordValidator(newPassword))
    throw new CustomError(400, "Şifrenizi düzgün bir formatta giriniz");

  if (oldPassword === newPassword)
    throw new CustomError(
      400,
      "Değiştirmek istediğiniz şifreyle hesap şifresi aynı"
    );
  user.password = hashPassword(newPassword);

  user.save();
  return { success: true, data: user };
};

module.exports = {
  registerService,
  loginService,
  getProfileService,
  resetPasswordService,
};
