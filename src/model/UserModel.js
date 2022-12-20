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
  blogs: [
    {
      title: String,
      text: String,
    },
  ],
});

module.exports.User = mongoose.model("User", UserSchema);
