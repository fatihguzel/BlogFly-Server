const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please prove a password"],
    select: false,
  },
  isLogined: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  confirmCode: {
    type: String,
  },
});

module.exports.User = mongoose.model("User", UserSchema);
