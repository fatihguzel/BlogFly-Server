const { Room } = require("../model/RoomModel");

const getAllRoomsService = async () => {
  const rooms = await Room.find({}).select(
    "+users -messages -_id -__v -createdAt -updatedAt"
  );

  return { success: true, data: rooms };
};

const getRoomsMessageService = async (id) => {
  const room = await Room.findOne({ roomName: id }).select(
    "+messages -_id -__v -createdAt -updatedAt"
  );

  return { success: true, data: room };
};

module.exports = {
  getAllRoomsService,
  getRoomsMessageService,
};
