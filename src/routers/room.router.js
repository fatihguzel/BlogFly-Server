const express = require("express");
const RoomController = require("../controllers/Room.controller");
const roomRouter = express.Router();

roomRouter.route("/get-all-room").get(RoomController.getAllRooms);
roomRouter.route("/get-room-message/:id").get(RoomController.getRoomsMessage);

module.exports.roomRouter = roomRouter;
