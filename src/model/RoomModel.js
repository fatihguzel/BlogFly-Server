const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    messages: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        message: {
          type: String,
        },
      },
    ],
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports.Room = mongoose.model("Room", RoomSchema);
