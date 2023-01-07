const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userCommentData: {
      username: {
        type: String,
      },
      text: {
        type: String,
      },
    },
    user: {
      type: mongoose.Types.ObjectId,
    },
    blog: {
      type: mongoose.Types.ObjectId,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.Comment = mongoose.model("Comments", CommentSchema);
