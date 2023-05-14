const mongoose = require("mongoose");

const RelationShipsSchema = new mongoose.Schema({
  friends: [],
  friendrequests: [],
  pendingRequest: [],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  blockedFriends: [],
});

module.exports.RelationShips = mongoose.model(
  "RelationShips",
  RelationShipsSchema
);
