const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports.Blog = mongoose.model("Blogs", BlogSchema);
