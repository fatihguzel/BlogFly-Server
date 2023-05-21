const expressAsyncHandler = require("express-async-handler");
const { joinRoomService } = require("../services/chat.services");
const path = require("path");

class ChatController {
  static joinRoom = expressAsyncHandler(async (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/chat.html"));
  });
}

module.exports = ChatController;
