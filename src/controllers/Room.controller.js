const expressAsyncHandler = require("express-async-handler");
const {
  getAllRoomsService,
  getRoomsMessageService,
} = require("../services/room.services");

class RoomController {
  static getAllRooms = expressAsyncHandler(async (req, res) => {
    const rooms = await getAllRoomsService();

    res.json(rooms);
  });

  static getRoomsMessage = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const rooms = await getRoomsMessageService(id);

    res.json(rooms);
  });
}

module.exports = RoomController;
