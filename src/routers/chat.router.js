const express = require("express");
const ChatController = require("../controllers/Chat.controller");
const chatRouter = express.Router();

chatRouter.route("/").get(ChatController.joinRoom);

module.exports.chatRouter = chatRouter;
